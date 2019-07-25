import { User } from './../../utils/models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ResumeCategoryTypes } from './../../utils/models/resume-model';
import { IResume } from '../../utils/models/resume-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, take, shareReplay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResumeGrouping } from 'src/app/utils/models/resume-group.model';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  user$: Observable<User>;
  resume$: Observable<ResumeGrouping>;

  links: string[] = [
    ResumeCategoryTypes.experience, ResumeCategoryTypes.portfolio,
    ResumeCategoryTypes.education, ResumeCategoryTypes.skills,
    ResumeCategoryTypes.social
  ];

  constructor(private afs: AngularFirestore) {


    this.user$ = this.afs.doc<User>(`users/${environment.userCollectionId}`).valueChanges().pipe(
      tap((val) => {
        console.log('HERE', val);
      }, err => {
        console.log('ERROR', err);
      }),
      take(1),
      shareReplay()
    );

    this.resume$ = this.user$.pipe(
      switchMap(user => {
        return this.afs.doc<IResume>(`users/${environment.userCollectionId}/${user.resume.path}`).valueChanges().pipe(
          take(1)
        );
      }),
      map((resume) => {

        return {
          personal: {
            name: resume.name,
            avatar: resume.avatar,
            dob: resume.dob,
            email: resume.email,
            phone: resume.phone,
            description: resume.description,
            position: resume.position
          },
          experience: resume.items.find(el => el.name === ResumeCategoryTypes.experience),
          portfolio: resume.items.find(el => el.name === ResumeCategoryTypes.portfolio),
          education: resume.items.find(el => el.name === ResumeCategoryTypes.education),
          skills: resume.items.find(el => el.name === ResumeCategoryTypes.skills),
          social: resume.items.find(el => el.name === ResumeCategoryTypes.social)
        };

      }),
      shareReplay()
    );
  }

  getResume(): Observable<ResumeGrouping> {
    return this.resume$;

  }


}
