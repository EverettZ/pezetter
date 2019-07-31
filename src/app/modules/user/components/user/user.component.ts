import { Component, OnInit } from '@angular/core';
import { IResumeCategory, IResumePersonal } from 'src/app/utils/models/resume-model';
import { ActivatedRoute } from '@angular/router';
import { map, share, filter, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'pez-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  categoryPersonalData$: Observable<IResumeCategory>;
  personal$: Observable<IResumePersonal>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    const data$ = this.route.data.pipe(
      tap(okay => {
        console.log('user component data', okay)
      }),
      map(data => data.ContainerResolverService),
      filter(data => !!data)
    );

    this.personal$ = data$.pipe(
      map(data => {
        return data.personal;
      })
    );

    this.categoryPersonalData$ = data$.pipe(
      filter(data => !!data.personal && !!data.category)
    );


  }

}
