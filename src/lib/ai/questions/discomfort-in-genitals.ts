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

// Question that isn't scored just used to skip a category of questions
export class Question_DiscomfortItchingOrBleedingInGenitalArea
  implements Question
{
  label = "Do you have discomfort, itching, or bleeding in your genital area?";
  inputType: InputType = InputType.SelectOne;
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
            new Question_BloodPeeing(),
            new Question_ItchingOrBleedingInGenitalsOrAnus(),
            new Question_BleedingBetweenPeriods(),
            new Question_BleedingAfterSex(),
            new Question_PainInPenis(),
            new Question_SwellingInPenis(),
          ],
        },
      ];
    }

    return [];
  };
}

class Question_BloodPeeing implements Question {
  label = "Do you ever see blood in your pee?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 },
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = RISK_SET(STI.GenitalWarts, 2);
  tags = [Tag.Symptom];
  effects = () => [];
}

class Question_ItchingOrBleedingInGenitalsOrAnus implements Question {
  label = "Do you experience itching or bleeding in your genitals or anus?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 },
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = RISK_SET(STI.GenitalWarts, 3);
  tags = [Tag.Symptom];
  effects = () => [];
}

class Question_BleedingBetweenPeriods implements Question {
  label = "Do you experience bleeding between periods?";
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

class Question_BleedingAfterSex implements Question {
  label = "Do you experience bleeding after sex?";
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

class Question_PainInPenis implements Question {
  label = "Do you experience pain in your penis?";
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
  tags = [Tag.Symptom, Tag.Male];
  effects = () => [];
}

class Question_SwellingInPenis implements Question {
  label = "Do you have any swelling in your penis?";
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
  tags = [Tag.Symptom, Tag.Male];
  effects = () => [];
}
