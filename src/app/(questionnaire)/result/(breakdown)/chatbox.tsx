import { useChat } from "ai/react";
import { useRef } from "react";

type ChatInputType = "prompt" | "action";

type ChatPresets = {
  behavior: ChatInputType;
  value: string;
};

type ChatBoxProps = {
  presets: ChatPresets[];
};

export default function ChatBox(props: ChatBoxProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    isLoading,
  } = useChat({
    api: "/api/v2/chat",
  });

  return (
    <div className="flex w-full flex-col gap-2">
      {messages.map((m) => (
        <div key={m.id}>
          {m.role}: {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <div className="mb-2 w-full">
          {props.presets.map((p, i) => (
            <button
              className="rounded-full bg-zinc-200"
              key={i}
              onClick={() => {
                if (inputRef && inputRef.current) {
                  setInput(p.value);
                  // inputRef.current.value = p.value;
                }
              }}
            >
              {p.value}
            </button>
          ))}
        </div>

        <input
          className="border"
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
