import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuestionBase } from '../../utils/question-base';


@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionBase<any>[]) {
    const group: any = {};

    questions.forEach(question => {
      group[question.key] = this.toFormControl(question);
    });
    return new FormGroup(group);
  }

  toFormArray(questions: QuestionBase<any>[]) {
    const formArray: FormArray = new FormArray([]);

    questions.forEach(question => {
      const c = this.toFormControl(question);
      formArray.push(c);
    });
    return formArray;
  }

  toFormControl(question: QuestionBase<any>) {
    return question.required ? new FormControl(question.value || '', Validators.required)
      : new FormControl(question.value || '');
  }
}
