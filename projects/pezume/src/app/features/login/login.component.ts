import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../shared/services/view/view.service';

@Component({
  selector: 'pez-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isActive = true;

  constructor(public viewService: ViewService) { }

  ngOnInit() {

  }

}
