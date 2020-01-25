import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { RESUME_MOCK } from './mock';
import Resume from '../../models/resume.model';
import { resumeToForms } from '../../utilities/resume-helpers';
import { AngularFirestore } from '@angular/fire/firestore';
import { EMPTY_RESUME } from './empty-resume';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  resumes: Resume[];
  selected: Resume;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }

  getResume(id: string) {
    return of(RESUME_MOCK);
  }

  getResumes() {
    return of([RESUME_MOCK]);
  }

  editResume(resume: Resume) {
    return resumeToForms(resume);
  }

  intializeNewResume() {
    const resume = {
      userId: this.afAuth.auth.currentUser.uid,
      created: new Date(),
      ...EMPTY_RESUME
    }
    this.afs.collection('resumes').add(resume)
      .then((docRef) => {
        console.log(docRef.id);
      })
  }

}
