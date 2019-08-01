import { Component, OnInit } from '@angular/core';
import { IResumeCategory, IResumePersonal } from 'src/app/utils/models/resume-model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { map, share, filter, tap, switchMap, } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { ResumeService } from 'src/app/services/resume/resume.service';

@Component({
  selector: 'pez-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  personal$: Observable<IResumePersonal>;
  category$: Observable<IResumeCategory>;

  constructor(private route: ActivatedRoute, private router: Router, public resume: ResumeService) {

    const resume$ = this.resume.getResume();

    this.personal$ = resume$.pipe(
      map(r => {
        return r.personal;
      })
    );

    this.category$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      switchMap(() => {

        if (this.route.firstChild && this.route.firstChild.snapshot.params && this.route.firstChild.snapshot.params.category) {

          const category = this.route.firstChild.snapshot.params.category;
          return resume$.pipe(
            map((r => r[category]))
          );

        }

        return of(null);

      })
    );

  }

  ngOnInit() {


  }

}
