import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ResumeService {

  experiences$: Observable<Experience[]>;
  educations$: Observable<Education[]>;
  skills$: Observable<Skill[]>;
  socials$: Observable<Social[]>;
  personals$: Observable<Personal[]>;
  charities$: Observable<Charity[]>;
  
  constructor() { }




}
