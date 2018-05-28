import { ICardModel, IResumeCategory, IResumeItem } from './../shared/models/card-model';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../services/resume/resume.service';
import { Subject, BehaviorSubject, forkJoin } from 'rxjs';
import { tap, mergeMap, merge, map } from 'rxjs/operators';

@Component({
  selector: 'pez-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  title = 'resume';

  categories$: BehaviorSubject<IResumeCategory[]> = new BehaviorSubject<IResumeCategory[]>([]);
  categories: string[] = [];

  constructor(private _resume: ResumeService, private router: Router, private params: ActivatedRoute) { }

  ngOnInit() {
    this.params.queryParamMap
      .pipe(
        map((p) => {

          this.categories = p.getAll('category') || [];

          let resumeItemsReqs: IResumeItem[] = [];

          if (this.categories.length >= 1) {

            resumeItemsReqs = this._resume.resumeCategoryRefs
              .filter(item => (this.categories.indexOf(item.name) >= 0));

          }
          debugger;
          return resumeItemsReqs;

        }),
        merge((vals) => {
          debugger;
          const requests = vals
            .map(val => this._resume.getCategory(val.href));

          forkJoin(requests);

        })
      )
      .subscribe();

    // this.getData();
  }

  getData() {
    // this._resume.personals$
    //   .pipe(
    //     tap(personals => {
    //       this.personals$.next(personals);
    //     })
    //   ).subscribe();
  }

}
