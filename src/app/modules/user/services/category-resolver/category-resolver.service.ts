import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ResumeService } from 'src/app/services/resume/resume.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResumeCategory } from 'src/app/utils/models/resume-model';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolverService implements Resolve<IResumeCategory>  {

  constructor(private resume: ResumeService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IResumeCategory> {

    return this.resume.getResume()
      .pipe(
        map(resume => {

          if (!resume) {

            this.router.navigate(['**']);
            return null;

          }

          return resume[route.paramMap.get('category')];

        })
      );


  }

}
