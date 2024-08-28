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
      <div className="rounded-[10px] bg-[#202221] px-[15px] py-[8px] text-xs font-semibold text-white md:px-[21px] md:py-[12px]">
        New Screen
      </div>
    </button>
  );
}
