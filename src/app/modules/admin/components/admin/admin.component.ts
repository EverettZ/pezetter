import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  loginForm: FormGroup;
  updateForm: FormGroup;

  constructor(public auth: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      pw: new FormControl('')
    });
    this.updateForm = new FormGroup({
      email: new FormControl(''),
      pw: new FormControl('')
    });
   }

  ngOnInit() {
  }

}
