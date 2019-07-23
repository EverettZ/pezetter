import { NavigationEnd, Router, Event } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { MenuOverlayRef } from '../services/menu-overlay/menu-overlay-ref';
import { MenuOverlayService } from '../services/menu-overlay/menu-overlay.service';

@Component({
  selector: 'pez-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  avatarValue = "url('https://material.angular.io/assets/img/examples/shiba1.jpg')";

  @Input('avatar')
  set avatar(val: string) {
    this.avatarValue = `${val}`;
  }
  get avatar() {
    return this.avatarValue;
  }

  constructor(private router: Router, private menuDialog: MenuOverlayService) { }

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
