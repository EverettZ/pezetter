import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../utils/models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap, tap, map, shareReplay } from 'rxjs/operators';
import { auth } from 'firebase';
import { IResume } from '../utils/models/resume-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  userRef: AngularFirestoreDocument<User>;
  resumeRef: AngularFirestoreDocument<any>;
  userId: string;
  constructor(private router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore) {

  }

  getUser() {
    if (!this.user$) {

      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {

          if (user) {

            this.userId = user.uid;

            return this.afs.doc<User>(`users/${user.uid}`).valueChanges().pipe(
              map(u => {
                return {
                  ...u,
                  resume: u.resume.path
                }
              })
            );

          }

          return of(null);
        }),
        tap((user) => {
          if (!user) {
            this.router.navigate(['admin', 'login']);
          }
        })
      );

    }

    return this.user$;
  }

  async signIn(signInData) {
    // const provider = new auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithEmailAndPassword(signInData.email, signInData.pw);
    // return this.updateUserData(credential.user);
  }



}
