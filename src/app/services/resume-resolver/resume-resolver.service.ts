import { Injectable } from '@angular/core';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ResumeService } from '../resume/resume.service';
import { IResume, ResumeCategoryTypes, IResumeCategory, IResumePersonal } from '../../utils/models/resume-model';


@Injectable()
export class ResumeResolverService implements Resolve<IResumeCategory | IResumePersonal> {

  constructor(private _resume: ResumeService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IResumeCategory | IResumePersonal> {

    const category = route.paramMap.get('category');

    return this._resume.getResume()
      .pipe(
        map(resume => {

          let currCategory = null;

          switch (category) {
            case ResumeCategoryTypes.education:
              currCategory = { category: this._resume.education, personal: this._resume.personal, links: this._resume.links };
              break;
            case ResumeCategoryTypes.experience:
              currCategory = {
                category: this._resume.experiences,
                personal: this._resume.personal, links: this._resume.links
              };
              break;
            case ResumeCategoryTypes.portfolio:
              currCategory = { category: this._resume.portfolio, personal: this._resume.personal, links: this._resume.links };
              break;
            case ResumeCategoryTypes.skills:
              currCategory = { category: this._resume.skills, personal: this._resume.personal, links: this._resume.links };
              break;
            case ResumeCategoryTypes.social:
              currCategory = { category: this._resume.social, personal: this._resume.personal, links: this._resume.links };
              break;
          }

          if (!resume) {

            this.router.navigate(['**']);
            return null;

          }

          if (currCategory == null) {

            currCategory = { personal: this._resume.personal, links: this._resume.links };

          }

          return currCategory;

        })
      );
  }
}
