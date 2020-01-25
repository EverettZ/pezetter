import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProcessService } from 'ngx-auth-firebaseui';

@Component({
  selector: 'pez-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private router: Router, private auth: AuthProcessService) { }

  ngOnInit() {
  }

  onSignOut() {
    console.log(this.auth.config);
    this.router.navigate([`${this.auth.config.authGuardFallbackURL}`]);
    
  }

}
