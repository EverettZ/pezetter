import { QuestionBase } from './../../utils/question-base';
import { Component, OnInit, Input, ViewChild, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';

@Component({
  selector: 'pez-resume-builder-question',
  templateUrl: './resume-builder-question.component.html',
  styleUrls: ['./resume-builder-question.component.scss']
})
export class ResumeBuilderQuestionComponent implements OnInit {

  @Input() question: QuestionBase<any>;
  @Input() group: FormGroup;

  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
  }


  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(
      take(1)
    ).subscribe(() => this.autosize.resizeToFitContent(true));
  }

}
