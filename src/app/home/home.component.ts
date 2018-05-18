import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationEnd } from '@angular/router';
import { tap } from 'rxjs/operators';
import { MenuOverlayRef } from '../services/menu-overlay/menu-overlay-ref';
import { MenuOverlayService } from '../services/menu-overlay/menu-overlay.service';

@Component({
  selector: 'pez-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private menuDialog: MenuOverlayService, private router: Router) {}

  ngOnInit() {
  }
  
  openMenu() {

    const dialogRef: MenuOverlayRef = this.menuDialog.open();

    this.router.events
    .subscribe((event: Event) => {

      if (event instanceof NavigationEnd) {

        dialogRef.close();

      }
      
    });


  }

}
