import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuestionBase } from '../../utils/question-base';
import { IResumeCategory, IResumePersonal, IResume } from 'src/app/utils/models/resume-model';
import { ResumeGrouping } from 'src/app/utils/models/resume-group.model';
import { PERSONAL_QUESTIONS } from '../../constants/personal-questions';
import { TextareaQuestion } from '../../utils/question-textarea';
import { TextboxQuestion } from '../../utils/question-textbox';
import { QuestionCategory } from '../../utils/question-category';


@Injectable()
export class QuestionControlService {

  personal: QuestionCategory;
  education: QuestionCategory;
  experience: QuestionCategory;
  portfolio: QuestionCategory;
  skills: QuestionCategory;
  social: QuestionCategory;
  group: FormGroup;

  constructor() { }

  traverseResume(x, level) {
    if (this.isArray(x)) {
      this.traverseArray(x, level);
    } else if ((typeof x === 'object') && (x !== null)) {
      this.traverseObject(x, level);
    } else {
      level = { ...level, x };
      // console.log('EVERETT', level + x);
    }
    return level;
  }

  isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
  }

  traverseArray(arr, level) {
    console.log(level + "<array>");
    arr.forEach((x) => {
      this.traverseResume(x, level + "  ");
    });
  }

  traverseObject(obj, level) {
    console.log(level + "<object>");
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        console.log(level + "  " + key + ":");
        this.traverseResume(obj[key], level + "    ");
      }
    }
  }

  getAllQuestionCategories() {

    this.createFormGroup();

    return [
      this.personal,
      // this.experience,
      // this.education,
      // this.portfolio,
      // this.skills,
      // this.social
    ];
  }

  createFormGroup() {

    const personalGroup = this.flattenQuestions(this.personal.questions);
    console.log('personalGroupFlat', personalGroup);
    this.group = new FormGroup({
      personal: new FormGroup(personalGroup),
      // experience: new FormGroup(this.parseCategory(this.experience[0]))
    });



  }

  private parseCategory(category: QuestionCategory) {

    // if (category.question) {
    //   result[category.question.key] = this.toFormControl(category.question);
    // } else if (category.questions) {
    //   let temp = { ...result, [category.name]: new FormGroup(this.flattenQuestions(category.questions)) };

    //   result[category.name] = this.parseCategory(category.questions);
    // }
  }

  private flattenQuestions(categoryQuestions: QuestionCategory[]) {
    const result = {};
    categoryQuestions.forEach(q => {
      const val = q.question;
      result[val.key] = this.toFormControl(val);
    });
    return result;
  }

  setPersonalQuestions(personal: IResumePersonal) {
    this.personal = {
      name: 'personal',
      questions: PERSONAL_QUESTIONS.map(q => {
        q.value = personal[q.key];
        return { name: q.key, question: q };
      })
    };
    console.log('personal', this.personal);
  }

  setCategoryQuestions(category: IResumeCategory) {

    this[category.name] = { name: category.name, questions: [] };
    let qs: QuestionCategory[] = [];

    category.items.forEach((item, itemIndex) => {
      qs = [];
      qs.push({
        name: 'title',
        question: new TextboxQuestion({
          key: `title${itemIndex}`,
          label: 'Title',
          value: item.title,
        })
      });

      qs.push({
        name: 'subTitle',
        question: new TextboxQuestion({
          key: `subTitle${itemIndex}`,
          label: 'Subtitle',
          value: item.subTitle,
        })
      });

      qs.push({
        name: 'start',
        question: new TextboxQuestion({
          key: `start${itemIndex}`,
          type: 'date',
          label: 'Start date',
          value: item.start
        })
      });

      qs.push({
        name: 'end',
        question: new TextboxQuestion({
          key: `end${itemIndex}`,
          type: 'date',
          label: 'End date',
          value: item.end
        })
      });

      const data: QuestionCategory = {
        name: 'data',
        questions: item.data.map((itemData, itemDataIndex) => {
          const dataQ: QuestionCategory = {
            name: `${itemDataIndex}`,
            question: new TextareaQuestion({
              key: `${itemDataIndex}`,
              label: `Data field #${itemDataIndex + 1}`,
              order: itemDataIndex,
              value: itemData.value,
              modifier: itemData.type
            })
          };
          return dataQ;
        })
      };

      qs.push(data);

      this[category.name].questions.push({ name: `${category.name}${itemIndex}`, questions: qs });

    });

    console.log(category.name, this[category.name]);
  }

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

  toResumeModel(formGroupValue: any) {

  }

  toFormGroupModel(grouping: ResumeGrouping) {

  }
}
