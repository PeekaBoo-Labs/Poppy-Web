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
  readonly riskFactors: Map<STI, number>;
  readonly tags: Tag[];

  effects: (input: QuestionInput) => Array<Effect>;
}

const RISK_ALL_STI = (): Map<STI, number> => {
  let riskFactors = new Map<STI, number>();
  for (const sti of Object.values(STI)) {
    riskFactors.set(sti, 1);
  }
  return riskFactors;
};

const RISK_SET = (sti: STI, risk: number): Map<STI, number> => {
  let riskFactors = new Map<STI, number>();
  for (const sti of Object.values(STI)) {
    riskFactors.set(sti, 1);
  }
  riskFactors.set(sti, risk);
  return riskFactors;
};

const RISK_MINUS = (sti: STI): Map<STI, number> => {
  return RISK_SET(sti, 0);
};

const RISK_NONE = (): Map<STI, number> => {
  return new Map();
};

export class Question_SexualActivity implements Question {
  label = "How many sexual partners have you had in the last 6 months?";
  // label = "this is a test question for development purposes"
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "NONE", label: "0", value: 0 },
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
        questions: [new Question_UnsafeSexRate()],
      },
    ];
  };
}

class Question_UnsafeSexRate implements Question {
  label = "How often do you use protection during sex?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Never", value: 1.1 },
    { id: "2", label: "Rarely", value: 1.01 },
    { id: "4", label: "Most of the time", value: 1 },
    { id: "ALWAYS", label: "Always", value: 0.4 },
  ];
  weight = 1;
  weightType = WeightType.Exponential;
  riskFactors = RISK_ALL_STI();
  tags = [Tag.Behavioral];

  effects = (input: QuestionInput): Effect[] => {
    let addedQuestions: Question[] = [
      new Question_SharingUnwashedToys(),
      new Question_InfectedSemenInEye(),
      new Question_OralSex(),
      new Question_ReproductiveOrgan(),
    ];

    if (input.id === "ALWAYS") {
      let front: Question[] = [new Question_UnprotectedContact()];
      addedQuestions = front.concat(addedQuestions);
    }

    return [
      {
        type: EffectType.AddQuestion,
        questions: addedQuestions,
      },
    ];
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
  riskFactors = RISK_MINUS(STI.Gonorrhoea);
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

class Question_SexFrequency implements Question {
  label = "Sex Frequency";
  inputType = InputType.SelectOne;
  inputOptions = [{ id: "1", label: "Never", value: 0 }, { id: "2", label: "Rarely", value: 0.5 }, { id: "3", label: "Regularly", value: 1 }, { id: "4", label: "Frequently", value: 1.5 }, { id: "5", label: "Very frequently", value: 2 }];
  weight = 1;
  weightType = WeightType.Multiplicative;
  riskFactors = new Map<STI, number>([[STI.Chlamydia, 1], [STI.Gonorrhoea, 1], [STI.GenitalWarts, 1], [STI.Syphilis, 1]]);
  tags = [Tag.Behavioral];

  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

class Question_UnprotectedSex implements Question {
  label = "Unprotected Sex";
  inputType = InputType.SelectOne;
  inputOptions = [{ id: "1", label: "Yes", value: 1 }, { id: "2", label: "No", value: 0 }];
  weight = 1;
  weightType = WeightType.Multiplicative;
  riskFactors = new Map<STI, number>([[STI.Chlamydia, 1], [STI.Gonorrhoea, 1], [STI.GenitalWarts, 1], [STI.Syphilis, 1]]);
  tags = [Tag.Behavioral];

  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

class Question_SharingUnwashedSexToys implements Question {
  label = "Sharing Unwashed Sex Toys";
  inputType = InputType.SelectOne;
  inputOptions = [{ id: "1", label: "Yes", value: 1 }, { id: "2", label: "No", value: 0 }];
  weight = 1;
  weightType = WeightType.Multiplicative;
  riskFactors = new Map<STI, number>([[STI.Chlamydia, 1], [STI.Gonorrhoea, 1], [STI.GenitalWarts, 1], [STI.Syphilis, 1]]);
  tags = [Tag.Behavioral];

  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

class Question_InfectedSemeninEye implements Question {
  label = "Infected Semen in Eye";
  inputType = InputType.SelectOne;
  inputOptions = [{ id: "1", label: "Yes", value: 1 }, { id: "2", label: "No", value: 0 }];
  weight = 1;
  weightType = WeightType.Multiplicative;
  riskFactors = new Map<STI, number>([[STI.Chlamydia, 1], [STI.Gonorrhoea, 1], [STI.GenitalWarts, 0], [STI.Syphilis, 1]]);
  tags = [Tag.Behavioral];

  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

// men questions 
class Question_PainWhenPeeing implements Question {
  label = "Do you experience pain when peeing?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 }
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 2],
    [STI.Gonorrhoea, 2],
    [STI.GenitalWarts, 2],
    [STI.Syphilis, 0]
  ]);
  tags = [Tag.Symptom];
  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

class Question_UnusualDischargeFromPenis implements Question {
  label = "Do you have any unusual discharge from your penis?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 }
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 2],
    [STI.Gonorrhoea, 2],
    [STI.GenitalWarts, 0],
    [STI.Syphilis, 0]
  ]);
  tags = [Tag.Symptom, Tag.Male];
  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

class Question_UnusualDischargeFromBottom implements Question {
  label = "Do you have any unusual discharge from your bottom?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 }
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 2],
    [STI.Gonorrhoea, 0],
    [STI.GenitalWarts, 0],
    [STI.Syphilis, 0]
  ]);
  tags = [Tag.Symptom];
  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

class Question_GreenOrYellowDischarge implements Question {
  label = "Do you have green or yellow discharge?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 }
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 0],
    [STI.Gonorrhoea, 2],
    [STI.GenitalWarts, 0],
    [STI.Syphilis, 0]
  ]);
  tags = [Tag.Symptom];
  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

class Question_PainInPenis implements Question {
  label = "Do you experience pain in your penis?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 }
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 2],
    [STI.Gonorrhoea, 0],
    [STI.GenitalWarts, 0],
    [STI.Syphilis, 0]
  ]);
  tags = [Tag.Symptom, Tag.Male];
  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

class Question_SwellingInPenis implements Question {
  label = "Do you have any swelling in your penis?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 }
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 2],
    [STI.Gonorrhoea, 0],
    [STI.GenitalWarts, 0],
    [STI.Syphilis, 0]
  ]);
  tags = [Tag.Symptom, Tag.Male];
  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

class Question_BloodPeeing implements Question {
  label = "Do you ever see blood in your pee?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 }
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 0],
    [STI.Gonorrhoea, 0],
    [STI.GenitalWarts, 2],
    [STI.Syphilis, 0]
  ]);
  tags = [Tag.Symptom];
  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

class Question_ItchingOrBleedingInGenitalsOrAnus implements Question {
  label = "Do you experience itching or bleeding in your genitals or anus?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 }
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 0],
    [STI.Gonorrhoea, 0],
    [STI.GenitalWarts, 3],
    [STI.Syphilis, 0]
  ]);
  tags = [Tag.Symptom];
  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

class Question_PainlessSoresInGenitalArea implements Question {
  label = "Do you have painless sores in your genital area?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 }
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 0],
    [STI.Gonorrhoea, 0],
    [STI.GenitalWarts, 0],
    [STI.Syphilis, 3]
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
    { id: "2", label: "No", value: 0 }
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 0],
    [STI.Gonorrhoea, 0],
    [STI.GenitalWarts, 0],
    [STI.Syphilis, 3]
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
    { id: "2", label: "No", value: 0 }
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 0],
    [STI.Gonorrhoea, 0],
    [STI.GenitalWarts, 0],
    [STI.Syphilis, 3]
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
    { id: "2", label: "No", value: 0 }
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 0],
    [STI.Gonorrhoea, 0],
    [STI.GenitalWarts, 3],
    [STI.Syphilis, 0]
  ]);
  tags = [Tag.Symptom];
  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

class Question_NonItchyRashAllOverBody implements Question {
  label = "Do you have a non-itchy rash all over your body, especially on hands and feet?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 }
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 0],
    [STI.Gonorrhoea, 0],
    [STI.GenitalWarts, 0],
    [STI.Syphilis, 3]
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
    { id: "2", label: "No", value: 0 }
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 0],
    [STI.Gonorrhoea, 0],
    [STI.GenitalWarts, 0],
    [STI.Syphilis, 3]
  ]);
  tags = [Tag.Symptom];
  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

class Question_FluSymptoms implements Question {
  label = "Do you have symptoms of the flu?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 }
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 0],
    [STI.Gonorrhoea, 0],
    [STI.GenitalWarts, 0],
    [STI.Syphilis, 3]
  ]);
  tags = [Tag.Symptom];
  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

class Question_SwollenGlands implements Question {
  label = "Do you have swollen glands?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 }
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 0],
    [STI.Gonorrhoea, 0],
    [STI.GenitalWarts, 0],
    [STI.Syphilis, 3]
  ]);
  tags = [Tag.Symptom];
  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

class Question_PatchyHairLoss implements Question {
  label = "Do you experience patchy hair loss on your head, beard, or eyebrows?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 }
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 0],
    [STI.Gonorrhoea, 0],
    [STI.GenitalWarts, 0],
    [STI.Syphilis, 3]
  ]);
  tags = [Tag.Symptom];
  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

class Question_UnusualDischargeFromVagina implements Question {
  label = "Do you experience unusual discharge from your vagina?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 }
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 2],
    [STI.Gonorrhoea, 2],
    [STI.GenitalWarts, 0],
    [STI.Syphilis, 0]
  ]);
  tags = [Tag.Symptom, Tag.Female];
  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

class Question_PainInTummy implements Question {
  label = "Do you experience pain in your tummy?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 }
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 2],
    [STI.Gonorrhoea, 0],
    [STI.GenitalWarts, 0],
    [STI.Syphilis, 0]
  ]);
  tags = [Tag.Symptom, Tag.Female];
  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

class Question_BleedingAfterSex implements Question {
  label = "Do you experience bleeding after sex?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 }
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 2],
    [STI.Gonorrhoea, 2],
    [STI.GenitalWarts, 0],
    [STI.Syphilis, 0]
  ]);
  tags = [Tag.Symptom, Tag.Female];
  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}

class Question_BleedingBetweenPeriods implements Question {
  label = "Do you experience bleeding between periods?";
  inputType = InputType.SelectOne;
  inputOptions = [
    { id: "1", label: "Yes", value: 1 },
    { id: "2", label: "No", value: 0 }
  ];
  weight = 1;
  weightType = WeightType.Additive;
  riskFactors = new Map<STI, number>([
    [STI.Chlamydia, 2],
    [STI.Gonorrhoea, 2],
    [STI.GenitalWarts, 0],
    [STI.Syphilis, 0]
  ]);
  tags = [Tag.Symptom, Tag.Female];
  effects = (input: QuestionInput): Effect[] => {
    return [];
  };
}


// // Question that isn't scored just used to skip a category of questions
// class Question_AnyBumpsOrSores implements Question {
//   label = "Do you have any visible bumps or sores in your genital area, face, or mouth?"
//   inputType: InputType = InputType.SelectOne
//   inputOptions = [
//     { id: "YES", label: "Yes", value: 1 },
//     { id: "NO", label: "No", value: 1 },
//   ]
//   weight = 0
//   weightType = WeightType.Additive
//   riskFactors = RISK_NONE()
//   tags = [Tag.Symptom]

//   effects = (input: QuestionInput): Effect[] => {
//     if (input.id === "YES") {
//       return [{
//         type: EffectType.AddQuestion,
//         questions: [
//           new Question_PainlessGenitalSores(),
//           new Question_
//           new
//         ],
//       }]
//     }
//   }
// }

// class Question_
