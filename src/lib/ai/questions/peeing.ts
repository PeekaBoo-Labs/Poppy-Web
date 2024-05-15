import { Question, InputType, WeightType, RISK_NONE, Tag, QuestionInput, Effect, EffectType, STI, RISK_SET } from "../question"

// Question that isn't scored just used to skip a category of questions
export class Question_DiscomfortOrUnusualPatternsDuringPeeing implements Question {
  label = "Do you have discomfort or unusual patterns when peeing?"
  inputType: InputType = InputType.SelectOne
  inputOptions = [
    { id: "YES", label: "Yes", value: 1 },
    { id: "NO", label: "No", value: 1 },
  ]
  weight = 0
  weightType = WeightType.Additive
  riskFactors = RISK_NONE()
  tags = [Tag.Symptom]

  effects = (input: QuestionInput): Effect[] => {
    if (input.id === "YES") {
      return [{
        type: EffectType.InsertQuestion,
        questions: [
          new Question_PainWhenPeeing(),
          new Question_DifficultPeeingBadAngleForPeeing(),
        ],
      }]
    }

    return []
  }
}

class Question_PainWhenPeeing implements Question {
  label = "Do you experience pain when peeing?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 },
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 2],
    [STI.Gonorrhoea, 2],
    [STI.GenitalWarts, 2],
    [STI.Syphilis, 0],
  ]);
  tags = [Tag.Symptom];
  effects = () => [];
}

class Question_DifficultPeeingBadAngleForPeeing implements Question {
  label = "Do you have difficulty peeing or a bad angle for peeing?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 },
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 2],
  ]);
  tags = [Tag.Symptom];
  effects = () => [];
}