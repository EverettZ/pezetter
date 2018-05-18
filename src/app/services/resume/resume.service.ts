import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Education } from '../../shared/models/education';
import { Experience } from '../../shared/models/experience';
import { Skill } from '../../shared/models/skill';
import { Social } from '../../shared/models/social';
import { Personal } from '../../shared/models/personal';
import { Charity } from '../../shared/models/charity';
import { RESUME_BUCKET } from '../../shared/models/urls';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  url = RESUME_BUCKET;

  experiences$: Observable<Experience[]>;
  educations$: Observable<Education[]>;
  skills$: Observable<Skill[]>;
  socials$: Observable<Social[]>;
  personals$: Observable<Personal[]>;
  charities$: Observable<Charity[]>;

  constructor(private http: HttpClient) {

    this.experiences$ = this.http
      .get(`${this.url}/resume_experience.json`)
      .pipe(
        map((model: ResumeREST) => {
          return model.items as Experience[];
        }),
        catchError(err => [])
      );

    this.educations$ = this.http
      .get(`${this.url}/resume_education.json`)
      .pipe(
        map((model: ResumeREST) => {
          return model.items as Education[];
        }),
        catchError(err => [])
      );

    this.skills$ = this.http
      .get(`${this.url}/resume_skills.json`)
      .pipe(
        map((model: ResumeREST) => {
          return model.items as Skill[];
        }),
        catchError(err => [])
      );

    this.socials$ = this.http
      .get(`${this.url}/resume_social.json`)
      .pipe(
        map((model: ResumeREST) => {
          return model.items as Social[];
        }),
        catchError(err => [])
      );

    this.personals$ = this.http
      .get(`${this.url}/resume_personal.json`)
      .pipe(
        map((model: ResumeREST) => {
          return model.items as Personal[];
        }),
        catchError(err => [])
      );

    this.charities$ = this.http
      .get(`${this.url}/resume_charity.json`)
      .pipe(
        map((model: ResumeREST) => {
          return model.items as Charity[];
        }),
        catchError(err => [])
      );

  }




}

class ResumeREST {
  path: string;
  length: number;
  items: any;
}
