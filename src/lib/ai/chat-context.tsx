import { Message, useChat } from "ai/react";
import {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
} from "react";
import { getPersistentData, saveData } from "../saves";

type ChatContextType = {
  messages: Message[];
  input: string;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  handleSubmit: FormEventHandler;
  setInput: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
};

const ChatContext = createContext<ChatContextType | null>(null);

const CHAT_GROUP = "AI_CHAT" as const;

export default function ChatContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    isLoading,
    setMessages,
  } = useChat({
    api: "/api/v2/chat",
  });

  useEffect(() => {
    const cachedMessages = getPersistentData(CHAT_GROUP, "default");
    setMessages(cachedMessages);

    console.log("[*] Loading cached state for messages:", cachedMessages);
  }, [setMessages]);

  useEffect(() => {
    if (messages.length > 0) {
      saveData(CHAT_GROUP, "default", messages);
      console.log("[*] Caching messages:", messages);
    }
  }, [messages]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        input,
        handleInputChange,
        handleSubmit,
        setInput,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatContextProvider");
  }

  return context;
}
