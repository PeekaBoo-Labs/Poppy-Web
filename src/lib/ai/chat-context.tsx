import { Message, useChat } from "ai/react";
import secure from "@/lib/entropy"
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
import { clearPersistentGroup, getPersistentData, saveData } from "../saves";
import { ChatRequestOptions } from "ai";
import { UserContext } from "./ai-context";

type ChatContextType = {
  messages: Message[];
  input: string;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  handleSubmit: FormEventHandler;
  setInput: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  resetChat: () => void;
  append: (
    message: Message,
  ) => Promise<string | null | undefined>;
};

const ChatContext = createContext<ChatContextType | null>(null);

export const CHAT_GROUP = "AI_CHAT" as const;

const removeId = (messages: Message[]) => {
  return messages.map(m => { return { role: m.role, content: m.content } })
}

export default function ChatContextProvider({
  children,
  getUserContext,
}: {
  children: ReactNode;
  getUserContext: () => UserContext;
}) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    isLoading,
    setMessages,
    append,
  } = useChat({
    api: "/api/v2/chat",
    body: {
      context: getUserContext(),
    },
  });

  useEffect(() => {
    const cachedMessages = getPersistentData(CHAT_GROUP, "default");
    setMessages(cachedMessages);

    // console.log("[*] Loading cached state for messages:", cachedMessages);
  }, [setMessages]);

  useEffect(() => {
    if (messages.length > 0) {
      saveData(CHAT_GROUP, "default", messages);
      // console.log("[*] Caching messages:", messages);
    }
  }, [messages]);

  const resetChat = () => {
    clearPersistentGroup(CHAT_GROUP);
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        input,
        handleInputChange,
        handleSubmit: (e: { preventDefault: () => void }) => {
          return handleSubmit(e, {
            headers: {
              "Entropy": `${btoa(secure(JSON.stringify({
                messages: [...removeId(messages), { role: "user", content: input }],
                context: getUserContext()
              })))}`
            },
          })
        },
        setInput,
        isLoading,
        append: (message: Message) => {
          return append(message, {
            headers: {
              "Entropy": `${btoa(secure(JSON.stringify({
                messages: [...removeId(messages), ...removeId([message])],
                context: getUserContext()
              })))}`
            },
          })
        },
        resetChat,
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
