import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../../shared/services/view/view.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { AuthProvider, Theme, AuthProcessService } from 'ngx-auth-firebaseui';

@Component({
  selector: 'pez-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  themes = Theme;
  providers = AuthProvider;
  
  constructor(public viewService: ViewService, private authService: AuthService, private auth: AuthProcessService, private router: Router) { }

  ngOnInit() {
  }

  loggedIn(event) {
    console.log(event);
    // this.authService.setUser({ 
    //   uid: event.uid,
    //   displayName: event.displayName 
    // });
    console.log(this.auth.user)
    this.router.navigate(['/browse'])
  }

  printError(event) {
    console.error(event);
  }

}
