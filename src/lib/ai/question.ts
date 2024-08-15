export enum STI {
  Chlamydia = "Chlamydia",
  Gonorrhoea = "Gonorrhoea",
  GenitalWarts = "Genital Warts",
  Syphilis = "Syphilis",
}

export enum Tag {
  Male = "Male",
  Female = "Female",
  Behavioral = "Behavioral",
  Symptom = "Symptom",
}

export enum EffectType {
  PruneTags = "PruneTags",
  End = "End",
  AddQuestion = "AddQuestion",
  InsertQuestion = "InsertQuestion",
}

export enum EndReason {
  NoSex = "NoSex",
  Normal = "Normal",
}

export type Effect = {
  type: EffectType;
  payload?: Tag[];
  reason?: EndReason;
  questions?: Question[];
};

export enum InputType {
  FreeText,
  SelectOne,
  MultiChoice,
}

export type QuestionInput = {
  id: string;
  label: string;
  value: number;
};

export enum WeightType {
  Additive = "Additive",
  Multiplicative = "Multiplicative",
  Exponential = "Exponential",
}

export type ScoreCalculation = {
  sum: number;
  mul: number;
  exp: number;
};

export const getDefaultScore = (): ScoreCalculation => {
  return { sum: 0, mul: 1, exp: 1 };
};

export const calculateScore = (scoreCalc: ScoreCalculation): number => {
  return (scoreCalc.sum * scoreCalc.mul) ** scoreCalc.exp;
};

export type AIOutput = {
  risks: Map<STI, number>;
  behavior: number;
  symptomatic: number;
};

export interface Question {
  readonly label: string;
  readonly inputType: InputType;
  readonly inputOptions: QuestionInput[];

  selected?: string;

  readonly weight: number;
  readonly weightType: WeightType;
  readonly riskFactors: Record<STI, number>;
  readonly tags: Tag[];

  effects: (input: QuestionInput) => Array<Effect>;
}

export function getAnswerLabel(question: Question): string | null {
  if (!question.selected) {
    return null;
  }
  const answer = question.inputOptions.find(
    (option) => option.id === question.selected,
  );
  return answer ? answer.label : null;
}

export const RISK_ALL_STI = (): Record<STI, number> => {
  const riskFactors: Partial<Record<STI, number>> = {};
  for (const sti of Object.values(STI)) {
    riskFactors[sti] = 1;
  }
  return riskFactors as Record<STI, number>;
};

export const RISK_SET = (sti: STI, risk: number): Record<STI, number> => {
  const riskFactors = RISK_NONE();
  riskFactors[sti] = risk;
  return riskFactors;
};

export const RISK_MINUS = (sti: STI): Record<STI, number> => {
  return RISK_SET(sti, 0);
};

export const RISK_NONE = (): Record<STI, number> => {
  const riskFactors: Partial<Record<STI, number>> = {};
  for (const sti of Object.values(STI)) {
    riskFactors[sti] = 0;
  }
  return riskFactors as Record<STI, number>;
};
