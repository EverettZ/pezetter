import { Injectable } from '@angular/core';
import { Login } from '../../models/login.model';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currUser: string;

  constructor() { }

  login(val: Login) {
    return of("0").pipe(
      delay(1000),
      tap((resp) => {
        if(resp) {
          this.currUser = resp;
        } else {
          this.currUser = null;
        }
      })
    )
  }

  logout() {
    this.currUser = null;
  }
}
