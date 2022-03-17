export interface SubQuestion {
  id?: string;
  question_text: string;
  options: string[];
  correct_answer?: string;

  answer?: string;
}
export interface Question {
  id?: string;
  passage?: string;
  options?: string[];
  correct_answer?: string;
  question_type?: QuestionType;
  editing?: boolean;
  sub_questions: SubQuestion[];

  categories?: string[];
  level_score?: string;
}

export interface QuestionAssignment {
  id?: string;
  question?: string;
  order?: number;
  question_details: Question;
}

export function emptyQuestionAssignment(): QuestionAssignment {
  return {
    question_details: emptyQuestion()
  };
}

export function emptyQuestion(): Question {
  return {
    sub_questions: [{
      question_text: '',
      options: ['', '', '', ''],
      correct_answer: null
    }]
  };
}

export enum QuestionType {
  MCQ = 'QUESTION_MCQ',
  Cloze = 'QUESTION_CLOZE',
}
