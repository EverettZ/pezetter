import { MenuOverlayRef } from './../../../../services/menu-overlay/menu-overlay-ref';
import { MenuOverlayService } from './../../../../services/menu-overlay/menu-overlay.service';
import { NavigationEnd, Router, Event } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { take, filter } from 'rxjs/operators';

@Component({
  selector: 'pez-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input() avatar: string;

  constructor(private router: Router, private menuDialog: MenuOverlayService) { }

  ngOnInit() {
  }


  openMenu() {

    const dialogRef: MenuOverlayRef = this.menuDialog.open();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      take(1)
    ).subscribe((event: Event) => {

      dialogRef.close();

    });


  }

}
