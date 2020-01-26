import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import Resume, { ResumePreview, GenType } from '../../models/resume.model';
import { resumeToForms } from '../../utilities/resume-helpers';
import { AngularFirestore } from '@angular/fire/firestore';
import { EMPTY_RESUME } from './empty-resume';
import { AngularFireAuth } from '@angular/fire/auth';
import { Collections } from '../../constants/collections';
import { ResumePage } from '../../models/resume.model';
import { collections } from 'ngx-auth-firebaseui/module/services/firestore-sync.service';
import { AuthProcessService } from 'ngx-auth-firebaseui';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  selected: ResumePreview;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private auth: AuthProcessService
  ) { }

  getResume(id: string) {
    return this.afs.collection(Collections.RESUMES)
      .doc(id).valueChanges().pipe(
        map((doc) => {
          console.log("RESUME CHANGE", doc);
          return doc as ResumePreview
        })
      )

  }

  getResumePages(resumeId: string): Observable<ResumePage[]> {
    return from(this.afs.collection(`${Collections.RESUMES}/${resumeId}/${Collections.PAGES}`).ref
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => {
          const data = doc.data() as ResumePage;
          return data;
        });
      })
    )
  }

  getResumePreviews(page = 0, pageSize = 10) {

    const resumes = this.afs.collection(Collections.RESUMES).ref
      .orderBy('created')
      .startAfter(page)
      .limit(pageSize)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => {
          const data = doc.data() as ResumePreview;
          return {
            ...data,
            id: doc.id
          };
        })
      });

    return from(resumes)
  }

  getResumes(page = 0, pageSize = 10) {
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
    const initDoc = this.afs.collection(Collections.RESUMES).ref.doc();
    const resume: ResumePreview = {
      userId: this.auth.user.uid,
      title: this.auth.user.displayName,
      subtitle: "Professional Title",
      created: Date.now(),
      photoURL: this.auth.user.photoURL,
      about: "Short description of yourself",
      id: initDoc.id
    }
    initDoc.set(resume);
    this.addResumePage(initDoc)
    return of(resume)
  }

  addResumePage(resumeDoc: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>) {
    const initPage = resumeDoc.collection(`${Collections.PAGES}`).doc();
    const page: ResumePage = {
      cards: [],
      id: initPage.id,
      title: "education",
      subtitle: "",
      order: 0
    }
    initPage.set(page)
  }

  updateResumePhoto(photoURL: string, resumeId: string) {
    return from(this.afs.collection(Collections.RESUMES)
      .doc(resumeId)
      .update({ photoURL: photoURL })
    );
  }


}
