import { Component, OnInit } from '@angular/core';
import { ViewService } from './shared/services/view/view.service';

@Component({
  selector: 'pez-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'pezume';

  constructor(public viewService: ViewService) {}

  ngOnInit() {
    this.viewService.setBreakpointObservers();
  }
}
