import { Injectable } from '@angular/core';
import { from, Observable, of, BehaviorSubject } from 'rxjs';
import Resume, { ResumePreview, GenType } from '../../models/resume.model';
import { resumeToForms } from '../../utilities/resume-helpers';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { EMPTY_RESUME } from './empty-resume';
import { AngularFireAuth } from '@angular/fire/auth';
import { Collections } from '../../constants/collections';
import { ResumePage } from '../../models/resume.model';
import { map, tap, take, share, catchError } from 'rxjs/operators';
import { QueryConfig } from '../../models/resume-query.model';
import { SearchTerm } from '../../models/search-term.model';
import { Visiblity } from '../../constants/visibility';
import { defaultQuery } from '../../constants/default-resumes-query';


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
    private afAuth: AngularFireAuth
  ) {
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
    this.resumeCollection = this.afs.collection<ResumePreview>(this.query.path);

    this.resumePreviews$ = this._resumePreviews.asObservable().pipe(
      share(),
      tap((vals) => {
        console.log('resumePreviews UPDATE', vals);
      })
    );

  }


  search(value: SearchTerm, start: number, limit: number) {

    const prevStart = this.query.start;
    const prevSearch = this.query.search;

    let getSize = this._resumePreviews.value.length === 0 || prevSearch !== value.search;

    this.query.field = value.filterBy;
    this.query.reverse = value.sortDescending;
    this.query.search = value.search;
    this.query.start = start;
    this.query.limit = limit;

    const result = this.afs.collection<ResumePreview>(this.query.path, ref => {

      let baseResumeRef = ref
        .where('visibility', '==', Visiblity.PUBLIC)

      if (value.search.length) {

        this.query.size = 0;
        baseResumeRef = baseResumeRef
          // .where(this.query.field, '==', this.query.search)
          // .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
          .limit(50);

        return baseResumeRef;

      }

      baseResumeRef = baseResumeRef
        .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc');

      if (start < prevStart) {

        // PREV PAGE
        const cursor = this.getFirstCursor();
        baseResumeRef = baseResumeRef
          .endBefore(cursor)
          .limitToLast(this.query.limit);

      } else if (start > prevStart) {

        //  NEXT PAGE
        const cursor = this.getLastCursor();
        baseResumeRef = baseResumeRef
          .startAfter(cursor)
          .limit(this.query.limit);

      } else {

        // No page change
        baseResumeRef = baseResumeRef
          .limit(this.query.limit);

      }

      if (getSize) {

        ref.where('visibility', '==', Visiblity.PUBLIC)
          .get()
          .then((val) => {
            this.query.size = val.size;
          });

      }

      return baseResumeRef;

    });


    this.mapAndUpdate(result);

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
          let values = arr.map(snap => {
            const data = snap.payload.doc.data();
            const doc = snap.payload.doc;
            return {
              ...data,
              doc
            };
          });

          if (this.query.search.length) {
            values = values.filter((snap) => {
              const searchVal = snap[this.query.field].toLowerCase();
              return searchVal.includes(this.query.search.toLowerCase());
            }).sort((a, b) => {
              if (a[this.query.field] > b[this.query.field]) {
                return this.query.reverse ? 1 : -1;
              }
              if (b[this.query.field] > b[this.query.field]) {
                return this.query.reverse ? -1 : 1;
              }
              return 0;
            })
          }

          this._resumePreviews.next(values);
          this._loading.next(false);

          if (!values.length) {
            // this._done.next(true);
          }

          return values;

        }),
        catchError((err) => {
          console.error("CAUGHT ERROR", err);
          this._loading.next(false);
          return of([])
        })
      ).subscribe();
  }

  editResume(resume: Resume) {
    return resumeToForms(resume);
  }

  intializeNewResume() {
    const initDoc = this.afs.collection(Collections.RESUMES).ref.doc();
    return this.afAuth.user.pipe(
      map((user) => {
        const resume: ResumePreview = {
          userId: user.uid,
          title: user.displayName,
          subtitle: "Professional Title",
          created: Date.now(),
          photoURL: user.photoURL,
          about: "Short description of yourself",
          id: initDoc.id,
          visibility: Visiblity.PUBLIC
        }

        initDoc.set(resume);
        this.addResumePage(initDoc)
        return resume;
      })
    );
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
