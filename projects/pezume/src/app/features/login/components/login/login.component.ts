import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../../shared/services/view/view.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth/auth.service';

@Component({
  selector: 'pez-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isActive = true;
  loginForm: FormGroup;
  loading = false;

  constructor(public viewService: ViewService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    })
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if(this.loginForm.valid) {
      this.loading = true;
      this.authService.login(this.loginForm.value).subscribe((resp) => {
        this.loading = false;
        this.router.navigate(["/"]);
      });
    }
  }

}
