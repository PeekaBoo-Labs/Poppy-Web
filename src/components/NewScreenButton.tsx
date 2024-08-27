import { GROUP_AI, useAIContext } from "@/lib/ai/ai-context";
import { CHAT_GROUP, useChatContext } from "@/lib/ai/chat-context";
import { clearPersistentGroup } from "@/lib/saves";
import { useRouter } from "next/navigation";

export default function NewScreenButton() {
  const { resetQuestions } = useAIContext();
  const router = useRouter();

  return (
    <button
      onClick={() => {
        clearPersistentGroup(GROUP_AI);
        resetQuestions();
        clearPersistentGroup(CHAT_GROUP);
        router.push("/");
      }}
    >
      <div className="rounded-[10px] bg-[#202221] px-[21px] py-[12px] text-xs font-semibold text-white">
        New Screen
      </div>
    </button>
  );
}
