import { TextboxQuestion } from './../../utils/question-textbox';
import { QuestionBase } from './../../utils/question-base';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ResumeService } from 'src/app/services/resume/resume.service';
import { tap, take } from 'rxjs/operators';
import { TextareaQuestion } from '../../utils/question-textarea';
import { QuestionControlService } from '../../services/question-control/question-control.service';
import { PERSONAL_QUESTIONS } from '../../constants/personal-questions';
import { IResumeCategory, IResumeCategoryItem } from 'src/app/utils/models/resume-model';
import { QuestionCategory } from '../../utils/question-category';

@Component({
  selector: 'pez-resume-builder',
  templateUrl: './resume-builder.component.html',
  styleUrls: ['./resume-builder.component.scss']
})
export class ResumeBuilderComponent implements OnInit {

  personalQuestions: QuestionBase<any>[] = PERSONAL_QUESTIONS;

  categories: (QuestionCategory | QuestionCategory[])[] = [];

  constructor(public auth: AuthService, private resume: ResumeService, private fb: FormBuilder, public qcs: QuestionControlService) { }

  ngOnInit() {
    // TODO: add tracking for resume categories and there nested groups (maybe just map the questions out, save that value, then create the nested formgroups/formarrays)

    this.resume.resume$.pipe(
      take(1),
      tap((res) => {


        Object.keys(res)
          .forEach(key => {

            const category: IResumeCategory = res[key];

            if (key !== 'personal') {

              this.qcs.setCategoryQuestions(category);

            } else {

              this.qcs.setPersonalQuestions(res.personal);

            }

            // return {
            //   ...{ key },
            //   categoryGroup: category.items.map((item, itemIndex) => {

            //     const itemDataQs = item.data.map((itemData, itemDataIndex) => {
            //       const dataQ = new TextareaQuestion({
            //         key: `${itemDataIndex}`,
            //         label: `Data field #${itemDataIndex + 1}`,
            //         order: itemDataIndex,
            //         value: itemData.value,
            //         modifier: itemData.type
            //       });
            //       return dataQ;
            //     });

            //     const itemDataQsGroup = this.qcs.toFormArray(itemDataQs);

            //     const start = new TextboxQuestion({
            //       key: `start${itemIndex}`,
            //       type: 'date',
            //       label: 'Start date',
            //       value: item.start
            //     });

            //     const end = new TextboxQuestion({
            //       key: `end${itemIndex}`,
            //       type: 'date',
            //       label: 'End date',
            //       value: item.end
            //     });

            //     const subTitle = new TextboxQuestion({
            //       key: `subTitle${itemIndex}`,
            //       label: 'Subtitle',
            //       value: item.subTitle,
            //     });

            //     const title = new TextboxQuestion({
            //       key: `title${itemIndex}`,
            //       label: 'Title',
            //       value: item.title,
            //     });


            //     return this.fb.group({
            //       title: this.qcs.toFormControl(title),
            //       subTitle: this.qcs.toFormControl(subTitle),
            //       start: this.qcs.toFormControl(start),
            //       end: this.qcs.toFormControl(end),
            //       data: itemDataQsGroup
            //     });

            //   })
            // };

          });

        this.categories = this.qcs.getAllQuestionCategories();


        // const result = { personal: this.qcs.toFormGroup(this.personalQuestions) };

        // categoryGroups.forEach(group => {
        //   result[group.key] = new FormArray(group.categoryGroup);
        // });

        // this.group = new FormGroup(result);

        // console.log(this.group.value);

      })
    ).subscribe();

  }

  submitChanges() {

    // console.log('SUBMIT', this.group.value);
    // if (this.group.valid) {
    // const education = {
    //   name: 'education',
    //   items: [
    //     ...this.group.get('education').value.forEach((edu: IResumeCategoryItem) => {
    //       edu.data =
    //     })
    //   ]
    // }
    // const result = {
    //   ...this.group.get('personal').value,
    //   items: [
    //     {
    //       name: 'education',
    //       ...this.group.get('education').value
    //     },
    //     {
    //       name: 'experience',
    //       ...this.group.get('experience').value
    //     },
    //     {
    //       name: 'portfolio',
    //       ...this.group.get('portfolio').value
    //     },
    //     {
    //       name: 'skills',
    //       ...this.group.get('skills').value
    //     },
    //     {
    //       name: 'social',
    //       ...this.group.get('social').value
    //     }
    //   ]
    // };
    // console.log(result);
    // this.resume.updateResume(this.auth.userId);
    // return {
    //   ...this.qcs.group.value.
    // }
    // }
  }

}
