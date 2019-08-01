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

    this.resume.resumeBase$.pipe(
      take(1),
      tap((res) => {

        console.log(this.qcs.traverseResume(res, ''));

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
