import { Question, InputType, WeightType, RISK_NONE, Tag, QuestionInput, Effect, EffectType, STI, RISK_SET } from "../question"

// Question that isn't scored just used to skip a category of questions
export class Question_AnyBumpsOrSores implements Question {
  label = "Do you have any visible bumps or sores in your genital area, face, or mouth?"
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
          new Question_PainlessSoresInGenitalArea(),
          new Question_WhiteOrGreyWartyGrowths(),
          new Question_SoresInMouthOrHands(),
          new Question_SoresInBottom(),
          new Question_WhitePatchesInMouth(),
          new Question_NonItchyRashAllOverBody(),
          new Question_SmallRoughLumpsNearGenitals()
        ],
      }]
    }

    return []
  }
}

class Question_PainlessSoresInGenitalArea implements Question {
  label = "Do you have painless sores in your genital area?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 },
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 0],
    [STI.Gonorrhoea, 0],
    [STI.GenitalWarts, 0],
    [STI.Syphilis, 3],
  ]);
  tags = [Tag.Symptom];
  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

class Question_SoresInMouthOrHands implements Question {
  label = "Do you have sores in your mouth or on your hands?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 },
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 0],
    [STI.Gonorrhoea, 0],
    [STI.GenitalWarts, 0],
    [STI.Syphilis, 3],
  ]);
  tags = [Tag.Symptom];
  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

class Question_SoresInBottom implements Question {
  label = "Do you have sores in your bottom area?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 },
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 0],
    [STI.Gonorrhoea, 0],
    [STI.GenitalWarts, 0],
    [STI.Syphilis, 3],
  ]);
  tags = [Tag.Symptom];
  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

class Question_WhiteOrGreyWartyGrowths implements Question {
  label = "Do you have any white or grey warty growths?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 },
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 0],
    [STI.Gonorrhoea, 0],
    [STI.GenitalWarts, 3],
    [STI.Syphilis, 0],
  ]);
  tags = [Tag.Symptom];
  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

class Question_NonItchyRashAllOverBody implements Question {
  label =
    "Do you have a non-itchy rash all over your body, especially on hands and feet?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 },
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 0],
    [STI.Gonorrhoea, 0],
    [STI.GenitalWarts, 0],
    [STI.Syphilis, 3],
  ]);
  tags = [Tag.Symptom];
  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

class Question_WhitePatchesInMouth implements Question {
  label = "Do you have white patches in your mouth?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 },
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 0],
    [STI.Gonorrhoea, 0],
    [STI.GenitalWarts, 0],
    [STI.Syphilis, 3],
  ]);
  tags = [Tag.Symptom];
  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

class Question_SmallRoughLumpsNearGenitals implements Question {
  label = "Do you have small rough lumps near your genitals?"
  inputType = InputType.SelectOne
  inputOptions = [
    { id: "YES", label: "Yes", value: 1 },
    { id: "NO", label: "No", value: 0 },
  ]
  weight = 1
  weightType = WeightType.Additive
  riskFactors = RISK_SET(STI.GenitalWarts, 3)
  tags = [Tag.Symptom]

  effects = () => [];
}