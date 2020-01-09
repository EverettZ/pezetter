import { Component, OnInit, AfterViewInit, HostBinding, Input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { fromEvent } from 'rxjs';
import { throttleTime, map, pairwise, distinctUntilChanged, share, filter } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ResumeService } from '../../services/resume/resume.service';
import { Router } from '@angular/router';

enum Direction {
  Up = 'Up',
  Down = 'Down',
}

enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden'
}

@Component({
  selector: 'pez-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  animations: [
    trigger('toggle', [
      state(
        VisibilityState.Hidden,
          style({ opacity: 0, transform: 'translateY(-100%)' })
      ),
      state(
        VisibilityState.Visible,
          style({ opacity: 1, transform: 'translateY(0)' })
      ),
      transition('* => *', animate('300ms ease-in'))
    ])
  ]
})
export class MainNavComponent implements OnInit, AfterViewInit {
  
  @HostBinding('@toggle')
  get toggle(): VisibilityState {
    return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
  }

  @Input() hideLogin: boolean = false;

  isVisible = true;

  constructor(public authService: AuthService, public resumeService: ResumeService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share()
    );

    const scrollUp$ = scroll$.pipe(
      filter(direction => direction === Direction.Up)
    );

    const scrollDown$ = scroll$.pipe(
      filter(direction => direction === Direction.Down)
    );
    
    scrollUp$.subscribe(() => (this.isVisible = true));
    scrollDown$.subscribe(() => (this.isVisible = false));
  }

}
