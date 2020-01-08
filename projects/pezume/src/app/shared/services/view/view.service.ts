import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  
  $handsetPortrait: Observable<boolean>; 

  constructor(public breakpointObserver: BreakpointObserver) {

  }

  public setBreakpointObservers() {
    
    this.$handsetPortrait = this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait])
      .pipe(
        map((state: BreakpointState) => state.matches)
      );
      
  }
}
