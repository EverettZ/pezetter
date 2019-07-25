import { ResumeCategoryTypes, IResumeCategory } from './../../utils/models/resume-model';
import { BASE_GIST } from '../../utils/models/urls';
import { IResume, IResumePersonal } from '../../utils/models/resume-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  personal: IResumePersonal;

  experiences: IResumeCategory;
  portfolio: IResumeCategory;
  education: IResumeCategory;
  skills: IResumeCategory;
  social: IResumeCategory;

  allCategories: IResumeCategory[];

  links: string[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  getResume() {

    return this.http
      .get(BASE_GIST)
      .pipe(
        tap((resume: IResume) => {

          this.personal = {
            name: resume.name,
            avatar: resume.avatar,
            dob: resume.dob,
            email: resume.email,
            phone: resume.phone,
            description: resume.description,
            position: resume.position
          };

          this.experiences = resume.items.find(el => el.name === ResumeCategoryTypes.experience);
          this.portfolio = resume.items.find(el => el.name === ResumeCategoryTypes.portfolio);
          this.education = resume.items.find(el => el.name === ResumeCategoryTypes.education);
          this.skills = resume.items.find(el => el.name === ResumeCategoryTypes.skills);
          this.social = resume.items.find(el => el.name === ResumeCategoryTypes.social);

          this.allCategories = [
            this.experiences,
            this.portfolio,
            this.education,
            this.skills,
            this.social
          ];

          this.links = [];

          this.allCategories
            .forEach(element => {
              if (element.items.length) {
                this.links.push(element.name);
              }
            });

        })
      );

  }


}
