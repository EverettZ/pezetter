import { IResumeItem } from './../models/card-model';
import { Component } from '@angular/core';
import { textFade } from '../animations/text-fade';
import { ResumeService } from '../../services/resume/resume.service';

@Component({
  selector: 'pez-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    textFade
  ]
})
export class MenuComponent {

  routes: IResumeItem[] = [];

  constructor(private _resume: ResumeService) {

    this.routes = _resume.resumeRoutes;

  }
  

}
