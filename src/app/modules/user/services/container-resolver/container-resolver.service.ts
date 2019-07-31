import { Injectable } from '@angular/core';
import { ResumeService } from 'src/app/services/resume/resume.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ResumeResolverData } from 'src/app/utils/models/resume-resolver-data.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContainerResolverService implements Resolve<ResumeResolverData> {

  constructor(private resume: ResumeService, private router: Router)  { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResumeResolverData> {

    return this.resume.getResume()
      .pipe(
        map(resume => {

          if (!resume) {

            this.router.navigate(['**']);
            return null;

          }

          if (route.firstChild && route.firstChild.paramMap.get('category')) {

            return { category: resume[route.firstChild.paramMap.get('category')], personal: resume.personal};

          }

          return { personal: resume.personal };

        })
      );


  }

}
