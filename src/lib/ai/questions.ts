export enum STI {
  Chlamydia = "Chlamydia",
  Gonorrhoea = "Gonorrhoea",
  GenitalWarts = "GenitalWarts",
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
}

export enum EndReason {
  NoSex = "NoSex",
  Normal = "Normal",
}

export type Effect = {
  type: EffectType,
  payload?: Tag[],
  reason?: EndReason,
  questions?: Question[],
}

enum InputType {
  FreeText,
  SelectOne,
  MultiChoice,
}

export type QuestionInput = {
  id: string,
  label: string,
  value: number,
}

enum WeightType {
  Additive = "Additive",
  Multiplicative = "Multiplicative",
  Exponential = "Exponential",
}

export type ScoreCalculation = {
  sum: number,
  mul: number,
  exp: number,
}

export const calculateScore = (scoreCalc: ScoreCalculation): number => {
  return (scoreCalc.sum * scoreCalc.mul) ** scoreCalc.exp
}

export type AIOutput = {
  risks: Map<STI, number>
  behavior: number,
  symptomatic: number,
}



export interface Question {
  readonly label: string,
  readonly inputType: InputType,
  readonly inputOptions: QuestionInput[],

  readonly selected?: string,

  readonly weight: number,
  readonly weightType: WeightType,
  readonly riskFactors: Map<STI, number>,
  readonly tags: Tag[],

  effects: (input: QuestionInput) => Effect[],
}

const RISK_ALL_STI = (): Map<STI, number> => {
  let riskFactors = new Map<STI, number>()
  for (const sti of Object.values(STI)) {
    riskFactors.set(sti, 1)
  }
  return riskFactors
}

export class Question_SexualActivity implements Question {
  label = "How many sexual partners have you had in the last 6 months?"
  inputType = InputType.SelectOne
  inputOptions = [
    { id: "NONE", label: "0", value: 0 },
    { id: "2", label: "1-2", value: 1.5 },
    { id: "3", label: "3-6", value: 4.5 },
    { id: "4", label: "7-15", value: 11 },
    { id: "5", label: "16+", value: 15 },
  ]
  weight = 1
  weightType = WeightType.Multiplicative
  riskFactors = RISK_ALL_STI()
  tags = [Tag.Behavioral]

  effects = (input: QuestionInput) => {
    if (input.id === "NONE")
      return [{ type: EffectType.End, payload: [], reason: EndReason.NoSex }]

    return [{
      type: EffectType.AddQuestion,
      question: [
        new Question_UnsafeSexRate(),
      ],
    }]
  }
}

class Question_UnsafeSexRate implements Question {
  label = "How often do you use protection during sex?"
  inputType = InputType.SelectOne
  inputOptions = [
    { id: "1", label: "Never", value: 1.2 },
    { id: "2", label: "Rarely", value: 1.15 },
    { id: "4", label: "Most of the time", value: 1 },
    { id: "ALWAYS", label: "Always", value: 0.7 },
  ]
  weight = 1
  weightType = WeightType.Exponential
  riskFactors = RISK_ALL_STI()
  tags = [Tag.Behavioral]

  effects = (input: QuestionInput) => {
    let addedQuestions: Question[] = [
      new Question_SharingUnwashedToys(),
      new Question_InfectedSemenInEye(),
      new Question_OralSex(),
      new Question_ReproductiveOrgan(),
    ]

    if (input.id === "ALWAYS") {
      let front: Question[] = [new Question_UnprotectedContact()]
      addedQuestions = front.concat(addedQuestions)
    }

    return [{
      type: EffectType.AddQuestion,
      question: addedQuestions,
    }]
  }
}

class Question_UnprotectedContact implements Question {
  label = "Have you had any sort of contact with someone else's genitals without protection?"
  inputType = InputType.SelectOne
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 },
  ]
  weight = 1
  weightType = WeightType.Additive
  riskFactors = new Map([
    [STI.Chlamydia, 1],
    [STI.Gonorrhoea, 1],
    [STI.Syphilis, 1]
  ])
  tags = [Tag.Behavioral]

  effects = () => []
}

class Question_SharingUnwashedToys implements Question {
  label = "Have you used shared, unwashed toys?"
  inputType = InputType.SelectOne
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 },
  ]
  weight = 1
  weightType = WeightType.Additive
  riskFactors = RISK_ALL_STI()
  tags = [Tag.Behavioral]

  effects = () => []
}

class Question_InfectedSemenInEye implements Question {
  label = "Have you had semen in your eye?"
  inputType = InputType.SelectOne
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 },
  ]
  weight = 1
  weightType = WeightType.Additive
  riskFactors = new Map([
    [STI.Chlamydia, 1],
    [STI.Gonorrhoea, 1],
    [STI.Syphilis, 1],
  ])
  tags = [Tag.Behavioral]

  effects = () => []
}

class Question_OralSex implements Question {
  label = "Have you had oral sex?"
  inputType = InputType.SelectOne
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 },
  ]
  weight = 1
  weightType = WeightType.Additive
  riskFactors = new Map([
    [STI.GenitalWarts, 1],
    [STI.Syphilis, 1],
  ])
  tags = [Tag.Behavioral]

  effects = () => []
}

class Question_ReproductiveOrgan implements Question {
  label = "What reproductive organs do you have?"
  inputType = InputType.MultiChoice
  inputOptions = [
    { id: "MALE", label: "Male reproductive organs", value: 1 },
    { id: "FEMALE", label: "Female reproductive organs", value: 1 },
    { id: "NONE", label: "Other", value: 1 },
  ]
  weight = 0
  weightType = WeightType.Additive
  riskFactors = new Map()
  tags = [Tag.Behavioral]

  effects = (input: QuestionInput) => {
    if (input.id === "MALE") {
      return [{
        type: EffectType.PruneTags,
        payload: [Tag.Female]
      }]
    } else if (input.id === "FEMALE") {
      return [{
        type: EffectType.PruneTags,
        payload: [Tag.Female]
      }]
    } else {
      return []
    }
  }
}