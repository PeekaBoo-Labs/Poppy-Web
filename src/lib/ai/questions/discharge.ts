import {
  Question,
  InputType,
  WeightType,
  RISK_NONE,
  Tag,
  QuestionInput,
  Effect,
  EffectType,
  STI,
  RISK_SET,
} from "../question";

export class Question_UnusualDischarge implements Question {
  label = "Do you have any unusual discharge?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "YES", label: "Yes", value: 1 },
    { id: "NO", label: "No", value: 0 },
  ];
  weight = 0;
  weightType = WeightType.Additive;
  riskFactors = RISK_NONE();
  tags = [Tag.Symptom];

  effects = (input: QuestionInput): Effect[] => {
    if (input.id === "YES") {
      return [
        {
          type: EffectType.InsertQuestion,
          questions: [
            new Question_UnusualDischargeFromPenis(),
            new Question_UnusualDischargeFromBottom(),
            new Question_GreenOrYellowDischarge(),
            new Question_UnusualDischargeFromVagina(),
          ],
        },
      ];
    }

    return [];
  };
}

class Question_UnusualDischargeFromPenis implements Question {
  label = "Do you have any unusual discharge from your penis?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 },
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = {
    [STI.Chlamydia]: 2,
    [STI.Gonorrhoea]: 2,
    [STI.GenitalWarts]: 0,
    [STI.Syphilis]: 0,
  };
  tags = [Tag.Symptom, Tag.Male];
  effects = () => [];
}

class Question_UnusualDischargeFromBottom implements Question {
  label = "Do you have any unusual discharge from your bottom?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 },
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = {
    [STI.Chlamydia]: 2,
    [STI.Gonorrhoea]: 0,
    [STI.GenitalWarts]: 0,
    [STI.Syphilis]: 0,
  };
  tags = [Tag.Symptom];
  effects = () => [];
}

class Question_GreenOrYellowDischarge implements Question {
  label = "Do you have unusual white, green, or yellow discharge?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 },
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = {
    [STI.Chlamydia]: 3,
    [STI.Gonorrhoea]: 3,
    [STI.GenitalWarts]: 0,
    [STI.Syphilis]: 0,
  };
  tags = [Tag.Symptom];
  effects = () => [];
}

class Question_UnusualDischargeFromVagina implements Question {
  label = "Do you experience unusual discharge from your vagina?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 },
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = {
    [STI.Chlamydia]: 2,
    [STI.Gonorrhoea]: 2,
    [STI.GenitalWarts]: 0,
    [STI.Syphilis]: 0,
  };
  tags = [Tag.Symptom, Tag.Female];
  effects = () => [];
}
