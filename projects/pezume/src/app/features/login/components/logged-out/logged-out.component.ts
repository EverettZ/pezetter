import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { AuthProcessService } from 'ngx-auth-firebaseui';

@Component({
  selector: 'pez-logged-out',
  templateUrl: './logged-out.component.html',
  styleUrls: ['./logged-out.component.scss']
})
export class LoggedOutComponent implements OnInit {

  constructor(private authService: AuthService, private auth: AuthProcessService) { }

  ngOnInit() {
    this.auth.signOut();
  }

}
