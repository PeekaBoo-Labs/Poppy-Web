import { STI } from "@/lib/ai/question";

export const IMAGE: Record<STI | "tree", string> = {
  [STI.Syphilis]: "/emojis/hibiscus.png",
  [STI.Gonorrhoea]: "/emojis/blossom.png",
  [STI.Chlamydia]: "/emojis/cherry.png",
  [STI.GenitalWarts]: "/emojis/lotus.png",

  tree: "/emojis/tree.png",
} as const;

export const DESC: Record<STI, string> = {
  [STI.Chlamydia]:
    "Often has no symptoms but can cause serious health problems, even without symptoms.",
  [STI.Gonorrhoea]:
    "Bacterial infection affecting genitals, rectum, or throat. Can be asymptomatic.",
  [STI.Syphilis]:
    "Progresses in stages. Causes sores and rashes. Serious if untreated.",
  [STI.GenitalWarts]: "Caused by HPV. Appears as small bumps in genital area.",
} as const;
