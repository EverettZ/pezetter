import { Injectable } from '@angular/core';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResumeService } from '../resume/resume.service';
import { ResumeResolverData } from 'src/app/utils/models/resume-resolver-data.model';


@Injectable()
export class ResumeResolverService implements Resolve<ResumeResolverData> {

  constructor(private _resume: ResumeService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResumeResolverData> {

    const category = route.paramMap.get('category');

    return this._resume.getResume()
      .pipe(
        map(resume => {

          if (!resume) {

            this.router.navigate(['**']);
            return null;

          }

          if (category) {
            return { category: resume[category], personal: resume.personal, links: this._resume.links };
          }

          return { personal: resume.personal, links: this._resume.links };

        })
      );
  }
}
