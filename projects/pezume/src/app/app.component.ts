import { Component, OnInit } from '@angular/core';
import { ViewService } from './shared/services/view/view.service';
import { slideInAnimation } from './shared/animations/route';
import { RouterOutlet, Router, NavigationEnd, RouterEvent, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, mapTo, tap, startWith } from 'rxjs/operators';

@Component({
  selector: 'pez-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent implements OnInit {

  title = 'pezume';
  isLoginPage$: Observable<boolean>;

  constructor(public viewService: ViewService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.viewService.setBreakpointObservers();
    this.isLoginPage$ = this.router.events.pipe(
      startWith(false),
      filter((ev: RouterEvent) => ev instanceof NavigationEnd),
      map(() => this.route.firstChild && this.route.firstChild.snapshot.data['hideLogin'])
    )
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
