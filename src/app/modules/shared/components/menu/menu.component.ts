
import { Component } from '@angular/core';
import { textFade } from 'src/app/utils/animations/text-fade';
import { ResumeService } from 'src/app/services/resume/resume.service';
import { MenuOverlayService } from 'src/app/services/menu-overlay/menu-overlay.service';

@Component({
  selector: 'pez-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    textFade
  ]
})
export class MenuComponent {

  links: string[] = [];

  constructor(private resumeService: ResumeService, private menuDialog: MenuOverlayService) {

    this.links = this.resumeService.links;

  }

  closeMenu() {
    this.menuDialog.close();
  }



}
