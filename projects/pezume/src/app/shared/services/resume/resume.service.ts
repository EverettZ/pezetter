import { Injectable } from '@angular/core';
import { from, Observable, of, BehaviorSubject } from 'rxjs';
import Resume, { ResumePreview, GenType } from '../../models/resume.model';
import { resumeToForms } from '../../utilities/resume-helpers';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { EMPTY_RESUME } from './empty-resume';
import { AngularFireAuth } from '@angular/fire/auth';
import { Collections } from '../../constants/collections';
import { ResumePage } from '../../models/resume.model';
import { AuthProcessService } from 'ngx-auth-firebaseui';
import { map, tap, take, share } from 'rxjs/operators';
import { QueryConfig } from '../../models/resume-query.model';

export const defaultQuery: QueryConfig = {
    path: Collections.RESUMES,
    field: 'about',
    limit: 10,
    reverse: false,
    start: 0,
    size: 0
}

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private _done = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(false);
  private _resumePreviews: BehaviorSubject<any[]> = new BehaviorSubject([])

  query: QueryConfig;

  selected$: Observable<ResumePreview>;
  selectedPages$: Observable<ResumePage[]>;
  resumePreviews$: Observable<any[]>;
  done$: Observable<boolean> = this._done.asObservable();
  loading$: Observable<boolean> = this._loading.asObservable();

  resumeCollection: AngularFirestoreCollection<ResumePreview>;
  selectedResumeDoc: AngularFirestoreDocument<ResumePreview>;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private auth: AuthProcessService
  ) {
    this.resumeCollection = this.afs.collection<ResumePreview>(Collections.RESUMES);
  }

  setResume(id: string) {

    this.selectedResumeDoc = this.resumeCollection
      .doc<ResumePreview>(id);

    this.selected$ = this.selectedResumeDoc
      .valueChanges()
      .pipe(
        share(),
        // take(1)
      )
  }

  setResumePages() {
    this.selectedPages$ = this.selectedResumeDoc.collection<ResumePage>(Collections.PAGES)
      .valueChanges()
      .pipe(
        share(),
        // take(1)
      );
  }

  initResumePreviews() {
    
    this.query = defaultQuery;

    const first = this.afs.collection<ResumePreview>(this.query.path, ref => {
      ref.get().then((val) => {
        this.query.size = val.size
      });
      return ref
        .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
        // .startAfter(this.query.start)
        .limit(this.query.limit)
    });

    this.mapAndUpdate(first);

    this.resumePreviews$ = this._resumePreviews.asObservable().pipe(
      // take(1),
      tap((vals) => {
        console.log(vals);
      })
    );

  }


  next() {

    const cursor = this.getLastCursor();

    const next = this.afs.collection<ResumePreview>(this.query.path, ref => {

      return ref
        .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
        .startAfter(cursor)
        .limit(this.query.limit);

    });

    this.mapAndUpdate(next);
  }

  previous() {

    const cursor = this.getFirstCursor();

    const prev = this.afs.collection<ResumePreview>(this.query.path, ref => {

      return ref
        .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
        .endBefore(cursor)
        .limitToLast(this.query.limit)

    });

    this.mapAndUpdate(prev);
    
  }

  search(searchTerm: string) {

    this.query.start = 0;

    const first = this.afs.collection<ResumePreview>(this.query.path, ref => {
      ref.get().then((val) => {
        this.query.size = val.size
      });
      return ref
        // .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
        // .startAfter(this.query.start)
        .limit(this.query.limit)
        .where(this.query.field, '==', searchTerm)
    });

    this.mapAndUpdate(first);
  }

  paginate(start: number, limit: number) {
    console.log(limit);
    const oldStart = this.query.start;
    const oldLimit = this.query.limit;
    this.query.limit = limit;
    this.query.start = start;

    if (start === oldStart || oldLimit != limit) {
      this.query.start = 0;
      this.initResumePreviews();
    } else if (start < oldStart) {
      this.previous()
    } else {
      this.next()
    }
  }

  private getLastCursor() {
    const current = this._resumePreviews.value;
    if (current.length) {
      return current[current.length - 1].doc;
    }
    return null;
  }
  private getFirstCursor() {
    const current = this._resumePreviews.value;
    if (current.length) {
      return current[0].doc;
    }
    return null;
  }

  private mapAndUpdate(col: AngularFirestoreCollection<ResumePreview>) {

    if (this._done.value || this._loading.value) { return };

    this._loading.next(true);

    return col.snapshotChanges()
      .pipe(
        take(1),
        tap((arr) => {
          console.log('SNAP CHANGE')
          const values = arr.map(snap => {
            const data = snap.payload.doc.data();
            const doc = snap.payload.doc;
            return {
              ...data,
              doc
            };
          });

          this._resumePreviews.next(values);
          this._loading.next(false);

          if (!values.length) {
            this._done.next(true);
          }

        }),
      ).subscribe();
  }

  getResumes(page = 0, limit = 10) {
    return from(this.afs.collection('resumes').ref
      .orderBy('created')
      .startAfter(page)
      .limit(limit)
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
