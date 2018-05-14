import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../services/resume/resume.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { Experience } from '../shared/models/experience';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'pez-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  title = 'experience';
  experiences$: BehaviorSubject<Experience[]> = new BehaviorSubject<Experience[]>([]);

  constructor(private _resume: ResumeService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._resume.experiences$
      .pipe(
        tap(experiences => {
          this.experiences$.next(experiences);
        })
      ).subscribe();
  }

}
