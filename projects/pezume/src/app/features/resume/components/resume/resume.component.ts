import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../../../../shared/services/resume/resume.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, share, take } from 'rxjs/operators';
import { InputTypes } from '../../../../shared/models/input-types';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ResumePage, ResumePreview, ResumeBase } from '../../../../shared/models/resume.model';
import { AuthProcessService } from 'ngx-auth-firebaseui';

@Component({
  selector: 'pez-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  inputTypes = InputTypes;
  resume$: Observable<ResumePreview>;
  pages$: Observable<ResumePage[]>;
  canEdit$: Observable<boolean>;
  resumeForm: FormGroup;
  editting = false;
  resumeId: string;

  constructor(
    private route: ActivatedRoute,
    public resumeService: ResumeService,
    private auth: AuthProcessService
  ) {

    this.resumeId = this.route.snapshot.paramMap.get("id");
  
    this.resume$ = this.resumeService.getResume(`${this.resumeId}`).pipe(
      // take(1),
      // share(),
      tap((resume) => {
        this.resumeService.selected = resume;
        // this.resumeForm = this.resumeService.editResume(resume)
      })
    );
  
    this.pages$ = this.resumeService.getResumePages(this.resumeId).pipe(
      share()
    );
  
  
    this.canEdit$ = this.resume$.pipe(
      share(),
      map((resume) => this.auth.user && this.auth.user.uid === resume.userId),
      take(1)
    );
  }

  ngOnInit() {


  }

  updateResumePhoto(photoURL: string) {
    this.resumeService.updateResumePhoto(photoURL, this.resumeId);
  }

  editResume(resume: ResumePreview) {
    // this.resumeForm = this.resumeService.editResume(resume)
    this.editting = !this.editting;
  }

  valueAscOrder = (a: KeyValue<number, ResumeBase>, b: KeyValue<number, ResumeBase>): number => {
    return a.value.order - b.value.order;
  }
}
