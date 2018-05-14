import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../services/resume/resume.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { Experience } from '../shared/models/experience';
import { tap } from 'rxjs/operators';
import { Charity } from '../shared/models/charity';

@Component({
  selector: 'pez-charity',
  templateUrl: './charity.component.html',
  styleUrls: ['./charity.component.scss']
})
export class CharityComponent implements OnInit {

  title = 'charity';
  charities$: BehaviorSubject<Charity[]> = new BehaviorSubject<Charity[]>([]);

  constructor(private _resume: ResumeService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._resume.charities$
      .pipe(
        tap(charities => {
          this.charities$.next(charities);
        })
      ).subscribe();
  }

}
