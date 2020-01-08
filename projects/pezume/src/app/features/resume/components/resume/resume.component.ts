import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../../../../shared/services/resume/resume.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import Resume from 'projects/pezume/src/app/shared/models/resume.model';
import { mergeMap, map } from 'rxjs/operators';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { InputTypes } from '../../../../shared/models/input-types';

@Component({
  selector: 'pez-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  inputTypes = InputTypes;
  $resume: Observable<Resume>;
  $canEdit: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    public resumeService: ResumeService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.$resume = this.resumeService.getResume(`${id}`);
    this.$canEdit = this.$resume.pipe(
      map((resume) => this.authService.currUser && resume.id === this.authService.currUser)
    );
  }

}
