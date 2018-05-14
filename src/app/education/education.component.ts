import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../services/resume/resume.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Education } from '../shared/models/education';

@Component({
  selector: 'pez-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  title = 'education';
  educations$: BehaviorSubject<Education[]> = new BehaviorSubject<Education[]>([]);

  constructor(private _resume: ResumeService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._resume.educations$
      .pipe(
        tap(educations => {
          this.educations$.next(educations);
        })
      ).subscribe();
  }
}
