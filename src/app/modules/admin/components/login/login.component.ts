import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pez-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      pw: new FormControl('', [Validators.required])
    });
  }


  ngOnInit() {

  }

  signIn() {
    if (this.loginForm.valid) {
      this.auth.signIn(this.loginForm.value).then((val) => {
        this.router.navigate(['../', 'resume-builder'], { relativeTo: this.route });
      }).catch(err => {
        // handle sign in error
      });
    }
  }


  getErrorMessage() {
    return this.loginForm.controls.email.hasError('required') ? 'You must enter a value' :
        this.loginForm.controls.email.hasError('email') ? 'Not a valid email' :
            '';
  }

}
