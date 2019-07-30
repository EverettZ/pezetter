import { TextboxQuestion } from './../../utils/question-textbox';
import { QuestionBase } from './../../utils/question-base';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ResumeService } from 'src/app/services/resume/resume.service';
import { tap } from 'rxjs/operators';
import { TextareaQuestion } from '../../utils/question-textarea';
import { QuestionControlService } from '../../services/question-control/question-control.service';
import { PERSONAL_QUESTIONS } from '../../constants/personal-questions';
import { IResumeCategory } from 'src/app/utils/models/resume-model';

@Component({
  selector: 'pez-resume-builder',
  templateUrl: './resume-builder.component.html',
  styleUrls: ['./resume-builder.component.scss']
})
export class ResumeBuilderComponent implements OnInit {

  group: FormGroup;
  personalQuestions: QuestionBase<any>[] = PERSONAL_QUESTIONS;


  constructor(public auth: AuthService, private resume: ResumeService, private fb: FormBuilder, private qcs: QuestionControlService) { }

  ngOnInit() {
    // TODO: add tracking for resume categories and there nested groups (maybe just map the questions out, save that value, then create the nested formgroups/formarrays)

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
                  const dataQ = new TextareaQuestion({
                    key: `${itemDataIndex}`,
                    label: `Data field #${itemDataIndex + 1}`,
                    order: itemDataIndex,
                    value: itemData.value
                  });
                  return dataQ;
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

        const result = { personal: this.qcs.toFormGroup(this.personalQuestions) };

        categoryGroups.forEach(group => {
          result[group.key] = new FormArray(group.categoryGroup);
        });

        this.group = new FormGroup(result);

        console.log(this.group.value);

      })
    ).subscribe();

  }

}
