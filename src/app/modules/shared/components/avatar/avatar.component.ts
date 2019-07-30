import { MenuOverlayService } from './../../../../services/menu-overlay/menu-overlay.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { LocalStorageEnum } from 'src/app/utils/models/local-storage-enum';

@Component({
  selector: 'pez-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input() avatar: string;
  showBadge = true;
  tooltipText = 'Click to open menu';

  constructor(private menuDialog: MenuOverlayService, @Inject('LOCALSTORAGE') private localStorage: Storage) { }

  ngOnInit() {

    this.showBadge = !!this.localStorage.getItem(LocalStorageEnum.HideAvatarBadge);

  }


  openMenu() {

    this.menuDialog.open();

  }

  hideBadge() {

    if (this.showBadge) {

      this.localStorage.setItem(LocalStorageEnum.HideAvatarBadge, 'true');
      this.showBadge = false;


    }

    if (this.tooltipText.length) {

      setTimeout(() => {

        this.tooltipText = '';

      }, 5000);

    }

  }

}
