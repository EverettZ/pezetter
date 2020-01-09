import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../../../../shared/services/resume/resume.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import Resume, { ResumeCard, ResumeBase } from 'projects/pezume/src/app/shared/models/resume.model';
import { mergeMap, map, tap, share } from 'rxjs/operators';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { InputTypes } from '../../../../shared/models/input-types';
import { KeyValue } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'pez-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  inputTypes = InputTypes;
  $resume: Observable<Resume>;
  $canEdit: Observable<boolean>;
  resumeForm: FormGroup;
  editting = false;
  constructor(
    private route: ActivatedRoute,
    public resumeService: ResumeService,
    private authService: AuthService
  ) {
   }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.$resume = this.resumeService.getResume(`${id}`).pipe(
      share(),
      tap((resume) => {
        this.resumeService.selected = resume;
        this.resumeForm = this.resumeService.editResume(resume)
      })
    );
    this.$canEdit = this.$resume.pipe(
      // map((resume) => this.authService.currUser && resume.id === this.authService.currUser)
      map((resume) => true),
    );
  }
  
  editResume(resume: Resume){
    // this.resumeForm = this.resumeService.editResume(resume)
    this.editting = !this.editting;
  }

  valueAscOrder = (a: KeyValue<number, ResumeBase>, b: KeyValue<number, ResumeBase>): number => {
    return a.value.order - b.value.order;
  }
}
