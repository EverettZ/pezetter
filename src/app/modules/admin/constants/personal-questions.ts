import { QuestionBase } from './../utils/question-base';
import { TextboxQuestion } from '../utils/question-textbox';
import { TextareaQuestion } from '../utils/question-textarea';

export const PERSONAL_QUESTIONS: QuestionBase<any>[] = [
  new TextboxQuestion({
    key: 'avatar',
    label: 'Avatar URL',
    required: true,
    order: 0
  }),
  new TextboxQuestion({
    key: 'dob',
    label: 'Date of birth',
    type: 'date',
    required: true,
    order: 20
  }),
  new TextboxQuestion({
    key: 'email',
    label: 'Email',
    required: true,
    order: 30
  }),
  new TextboxQuestion({
    key: 'phone',
    label: 'Phone',
    type: 'tel',
    required: true,
    order: 40
  }),
  new TextboxQuestion({
    key: 'position',
    label: 'Job Title',
    required: true,
    order: 50
  }),
  new TextareaQuestion({
    key: 'description',
    label: 'About me',
    required: true,
    order: 60
  })
];
