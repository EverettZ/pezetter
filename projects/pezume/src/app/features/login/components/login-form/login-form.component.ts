import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'pez-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Input() parentForm: FormGroup;

  get username() {
    return this.parentForm.get('username');
  }
  get password() {
    return this.parentForm.get('password');
  }
  
  constructor() { }

  ngOnInit() {
  }

}
