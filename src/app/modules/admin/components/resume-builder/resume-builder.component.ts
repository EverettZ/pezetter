import { TextboxQuestion } from './../../utils/question-textbox';
import { QuestionBase } from './../../utils/question-base';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ResumeService } from 'src/app/services/resume/resume.service';
import { map, tap } from 'rxjs/operators';
import { TextareaQuestion } from '../../utils/question-textarea';
import { QuestionControlService } from '../../services/question-control/question-control.service';
import { PERSONAL_QUESTIONS } from '../../constants/personal-questions';
import { IResumeCategory } from 'src/app/utils/models/resume-model';
import { ResumeCategoryQuestions } from '../../models/resume-category-questions.model';

@Component({
  selector: 'pez-resume-builder',
  templateUrl: './resume-builder.component.html',
  styleUrls: ['./resume-builder.component.scss']
})
export class ResumeBuilderComponent implements OnInit {

  group: FormGroup;
  personalGroup: FormGroup;
  personalQuestions: QuestionBase<any>[] = PERSONAL_QUESTIONS;
  resumeCategories: ResumeCategoryQuestions[] = [];

  constructor(public auth: AuthService, private resume: ResumeService, private fb: FormBuilder, private qcs: QuestionControlService) { }

  ngOnInit() {
    this.resume.resume$.pipe(
      tap((res) => {

        const categoryGroups: {
          key: string;
          categoryGroup: FormGroup[];
        }[] = Object
          .keys(res)
          .filter(key => key !== 'personal')
          .map(key => {

            const category: IResumeCategory = res[key];

            return {
              key: key,
              categoryGroup: category.items.map((item, itemIndex) => {

                const itemDataQs = item.data.map((itemData, itemDataIndex) => {
                  return new TextareaQuestion({
                    key: `${itemDataIndex}`,
                    label: `Data field #${itemDataIndex + 1}`,
                    order: itemDataIndex,
                    value: itemData.value
                  });
                });

                const itemDataQsGroup = this.qcs.toFormArray(itemDataQs);

                const start = new TextboxQuestion({
                  key: `start${itemIndex}`,
                  type: 'date',
                  label: 'Start date',
                  value: item.start
                });

                const end = new TextboxQuestion({
                  key: `end${itemIndex}`,
                  type: 'date',
                  label: 'End date',
                  value: item.end
                });

                const subTitle = new TextboxQuestion({
                  key: `subTitle${itemIndex}`,
                  label: 'Subtitle',
                  value: item.subTitle,
                });

                const title = new TextboxQuestion({
                  key: `title${itemIndex}`,
                  label: 'Title',
                  value: item.title,
                });

                return this.fb.group({
                  title: this.qcs.toFormControl(title),
                  subTitle: this.qcs.toFormControl(subTitle),
                  start: this.qcs.toFormControl(start),
                  end: this.qcs.toFormControl(end),
                  data: itemDataQsGroup
                });

              })
            };

          });

        console.log(res);

        this.personalQuestions.forEach(q => {
          q.value = res.personal[q.key];
        });

        this.personalGroup = this.qcs.toFormGroup(this.personalQuestions);

        const result = { personalGroup: this.personalGroup };

        categoryGroups.forEach(group => {
          result[group.key] = new FormArray(group.categoryGroup);
        });

        this.group = new FormGroup(result);

        console.log(this.group.value);

      })
    ).subscribe();

  }

}
