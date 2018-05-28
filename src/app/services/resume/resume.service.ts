import { ICardModel, IResume, IResumeCategory, IResumeItem } from './../../shared/models/card-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RESUME_BUCKET } from '../../shared/models/urls';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  url = RESUME_BUCKET;

  baseResume$: Observable<IResume>;
  resume$: Observable<IResumeCategory[]>;

  resumeCategoryRefs: IResumeItem[] = [];

  // experiences$: Observable<Experience[]>;
  // educations$: Observable<Education[]>;
  // skills$: Observable<Skill[]>;
  // socials$: Observable<Social[]>;
  // personals$: Observable<Personal[]>;
  // charities$: Observable<Charity[]>;

  constructor(private http: HttpClient) {

    this.baseResume$ = this.http
      .get<IResume>(this.url)
      .pipe(
        tap((resume: IResume) => {

          this.resumeCategoryRefs = resume.items;

        })
      );



    // this.educations$ = this.http
    //   .get(`${this.url}/resume_education.json`)
    //   .pipe(
    //     map((model: ResumeREST) => {
    //       return model.items as Education[];
    //     }),
    //     catchError(err => [])
    //   );

    // this.skills$ = this.http
    //   .get(`${this.url}/resume_skills.json`)
    //   .pipe(
    //     map((model: ResumeREST) => {
    //       return model.items as Skill[];
    //     }),
    //     catchError(err => [])
    //   );

    // this.socials$ = this.http
    //   .get(`${this.url}/resume_social.json`)
    //   .pipe(
    //     map((model: ResumeREST) => {
    //       return model.items as Social[];
    //     }),
    //     catchError(err => [])
    //   );

    // this.personals$ = this.http
    //   .get(`${this.url}/resume_personal.json`)
    //   .pipe(
    //     map((model: ResumeREST) => {
    //       return model.items as Personal[];
    //     }),
    //     catchError(err => [])
    //   );

    // this.charities$ = this.http
    //   .get(`${this.url}/resume_charity.json`)
    //   .pipe(
    //     map((model: ResumeREST) => {
    //       return model.items as Charity[];
    //     }),
    //     catchError(err => [])
    //   );

  }


  getCategory(href: string) {

    return this.http
      .get<IResumeCategory>(href);
      
  }



}
