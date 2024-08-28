import {
  Effect,
  EffectType,
  EndReason,
  InputType,
  Question,
  QuestionInput,
  RISK_ALL_STI,
  RISK_MINUS,
  RISK_NONE,
  RISK_SET,
  STI,
  Tag,
  WeightType,
} from "../question";
import { Question_AnyBumpsOrSores } from "./bumps-or-sores";
import { Question_UnusualDischarge } from "./discharge";
import { Question_DiscomfortItchingOrBleedingInGenitalArea } from "./discomfort-in-genitals";
import { otherQuestions } from "./other";
import { Question_DiscomfortOrUnusualPatternsDuringPeeing } from "./peeing";

export class Question_SexualActivity implements Question {
  label =
    "How many people have you been sexually intimate with, including any non-penetrative genital contact or kissing?";
  //label = "this is a test question for development purposes";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "NONE", label: "I've never had a sexual partner", value: 0 },
    { id: "2", label: "1-2", value: 0.75 },
    { id: "3", label: "3-6", value: 1.5 },
    { id: "4", label: "7-15", value: 2.25 },
    { id: "5", label: "16+", value: 3 },
  ];
  weight = 1;
  weightType = WeightType.Multiplicative;
  riskFactors = RISK_ALL_STI();
  tags = [Tag.Behavioral];

  effects = (input: QuestionInput): Effect[] => {
    if (input.id === "NONE")
      return [{ type: EffectType.End, payload: [], reason: EndReason.NoSex }];

    return [
      {
        type: EffectType.AddQuestion,
        questions: [
          new Question_UnsafeSexRate(),
          new Question_SharingUnwashedToys(),
          new Question_InfectedSemenInEye(),
          new Question_OralSex(),
          new Question_ReproductiveOrgan(),
          new Question_AnyBumpsOrSores(),
          new Question_DiscomfortItchingOrBleedingInGenitalArea(),
          new Question_UnusualDischarge(),
          new Question_DiscomfortOrUnusualPatternsDuringPeeing(),
          ...otherQuestions(),
        ],
      },
    ];
  };
}

class Question_UnsafeSexRate implements Question {
  label = "How often do you use protection during sex?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "ALWAYS", label: "Always", value: 0.4 },
    { id: "4", label: "Most of the time", value: 1 },
    { id: "2", label: "Rarely", value: 1.01 },
    { id: "1", label: "Never", value: 1.1 },
  ];
  weight = 1;
  weightType = WeightType.Exponential;
  riskFactors = RISK_ALL_STI();
  tags = [Tag.Behavioral];

  effects = (input: QuestionInput): Effect[] => {
    if (input.id !== "ALWAYS") {
      return [
        {
          type: EffectType.InsertQuestion,
          questions: [new Question_UnprotectedContact()],
        },
      ];
    }
    return [];
  };
}

class Question_UnprotectedContact implements Question {
  label =
    "Have you had any sort of contact with someone else's genitals without protection?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 },
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = RISK_ALL_STI();
  tags = [Tag.Behavioral];

  effects = () => [];
}

class Question_SharingUnwashedToys implements Question {
  label = "Have you used shared, unwashed toys?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 },
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = RISK_ALL_STI();
  tags = [Tag.Behavioral];

  effects = () => [];
}

class Question_InfectedSemenInEye implements Question {
  label = "Have you had semen in your eye?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 },
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = RISK_MINUS(STI.GenitalWarts);
  tags = [Tag.Behavioral];

  effects = () => [];
}

class Question_OralSex implements Question {
  label = "Have you had oral sex?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 },
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = RISK_SET(STI.GenitalWarts, 0.2);
  tags = [Tag.Behavioral];

  effects = () => [];
}

class Question_ReproductiveOrgan implements Question {
  label = "What reproductive organs do you have?";
  inputType = InputType.MultiChoice;
  inputOptions = [
    { id: "MALE", label: "Male reproductive organs", value: 1 },
    { id: "FEMALE", label: "Female reproductive organs", value: 1 },
    { id: "NONE", label: "Other", value: 1 },
  ];
  weight = 0;
  weightType = WeightType.Additive;
  riskFactors = RISK_NONE();
  tags = [Tag.Behavioral];

  effects = (input: QuestionInput): Effect[] => {
    if (input.id === "MALE") {
      return [
        {
          type: EffectType.PruneTags,
          payload: [Tag.Female],
        },
      ];
    } else if (input.id === "FEMALE") {
      return [
        {
          type: EffectType.PruneTags,
          payload: [Tag.Male],
        },
      ];
    } else {
      return [];
    }
  };
}
