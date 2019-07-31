import { QuestionBase } from './question-base';

export interface QuestionCategory {
  name: string;
  questions?: QuestionCategory[];
  question?: QuestionBase<any>;
}
