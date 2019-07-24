
import { Component } from '@angular/core';
import { textFade } from 'src/app/shared/animations/text-fade';
import { ResumeService } from 'src/app/services/resume/resume.service';

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

  constructor(private _resume: ResumeService) {

    this.links = this._resume.links;

  }


}
