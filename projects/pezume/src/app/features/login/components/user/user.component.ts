import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'pez-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private router: Router, private auth: AngularFireAuth) { }

  ngOnInit() {
  }

  onSignOut() {
    // console.log(this.auth.authState);
    this.router.navigate([`login`]);
    
  }

}
