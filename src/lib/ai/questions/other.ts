import { InputType, Question, STI, Tag, WeightType } from "../question";

export const otherQuestions = () => [
  new Question_FluSymptoms(),
  new Question_SwollenGlands(),
  new Question_PatchyHairLoss(),
  new Question_PainInTummy(),
];

class Question_FluSymptoms implements Question {
  label = "Do you have symptoms of the flu?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 },
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = {
    [STI.Chlamydia]: 0,
    [STI.Gonorrhoea]: 0,
    [STI.GenitalWarts]: 0,
    [STI.Syphilis]: 3,
  };
  tags = [Tag.Symptom];
  effects = () => [];
}

class Question_SwollenGlands implements Question {
  label = "Do you have swollen glands or lymph nodes?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 },
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = {
    [STI.Chlamydia]: 0,
    [STI.Gonorrhoea]: 0,
    [STI.GenitalWarts]: 0,
    [STI.Syphilis]: 3,
  };
  tags = [Tag.Symptom];
  effects = () => [];
}

class Question_PatchyHairLoss implements Question {
  label =
    "Do you experience patchy hair loss on your head, beard, or eyebrows?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 },
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = {
    [STI.Chlamydia]: 0,
    [STI.Gonorrhoea]: 0,
    [STI.GenitalWarts]: 0,
    [STI.Syphilis]: 3,
  };
  tags = [Tag.Symptom];
  effects = () => [];
}

class Question_PainInTummy implements Question {
  label = "Do you experience pain in your tummy?";
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
  tags = [Tag.Symptom, Tag.Female];
  effects = () => [];
}
