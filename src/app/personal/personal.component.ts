import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../services/resume/resume.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Personal } from '../shared/models/personal';

@Component({
  selector: 'pez-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  title = 'personal';
  personals$: BehaviorSubject<Personal[]> = new BehaviorSubject<Personal[]>([]);

  constructor(private _resume: ResumeService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._resume.personals$
      .pipe(
        tap(personals => {
          this.personals$.next(personals);
        })
      ).subscribe();
  }

}
