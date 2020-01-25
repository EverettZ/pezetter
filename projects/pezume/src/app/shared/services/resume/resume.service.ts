import { Injectable } from '@angular/core';
import { of, from } from 'rxjs';
import { RESUME_MOCK } from './mock';
import Resume from '../../models/resume.model';
import { resumeToForms } from '../../utilities/resume-helpers';
import { AngularFirestore, QuerySnapshot, DocumentData } from '@angular/fire/firestore';
import { EMPTY_RESUME } from './empty-resume';
import { AngularFireAuth } from '@angular/fire/auth';
import { tap } from 'rxjs/operators';

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
    return from(this.afs.collection('resumes')
      .doc(id).ref
      .get()
      .then((doc) => {
        return doc.data() as Resume;
      })
    )
  }

  getResumes(page = 0, pageSize = 10) {
    // return of([RESUME_MOCK]);
    return from(this.afs.collection('resumes').ref
      .orderBy('created')
      .startAfter(page)
      .limit(pageSize)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => {
          const data = doc.data() as Resume;
          const result: Resume = {
            ...data,
            subtitle: "asdasdasdasd",
            about: "asdkajhkjhasd",
            id: doc.id
          }
          return result;
        })
      }))
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
    return this.afs.collection('resumes').add(resume)
  }

}
