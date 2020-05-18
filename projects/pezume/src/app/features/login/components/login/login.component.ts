import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../../shared/services/view/view.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'pez-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public viewService: ViewService,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.googleSignin();
  }

  loggedIn(event) {
    console.log(event);
    // this.authService.setUser({ 
    //   uid: event.uid,
    //   displayName: event.displayName 
    // });
    console.log(this.afAuth.user)
    // this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    this.router.navigate(['/browse'])
  }

  printError(event) {
    console.error(event);
  }

}
