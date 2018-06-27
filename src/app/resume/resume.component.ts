import { IResumeCategory } from './../shared/models/card-model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pez-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  @Input('title') title = '';

  // categories$: BehaviorSubject<IResumeCategory[]> = new BehaviorSubject<IResumeCategory[]>([]);
  @Input('category') category: IResumeCategory;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // // this.route.outlet
    //   .pipe(
    //     map((p) => {

    //       this.categories = p.getAll('category') || [];

    //       let resumeItemsReqs: IResumeItem[] = [];

    //       if (this.categories.length >= 1) {

    //         // resumeItemsReqs = this._resume.resumeCategoryRefs
    //         //   .filter(item => (this.categories.indexOf(item.name) >= 0));

    //       }

    //       return resumeItemsReqs;

    //     }),
    //     merge((vals: IResumeItem[]) => {

    //       // const requests = vals
    //       //   .map(val => this._resume.getCategory(val.href));

    //       // return forkJoin(requests);

    //     })
    //   );

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
