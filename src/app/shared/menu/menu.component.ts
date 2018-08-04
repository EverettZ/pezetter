
import { Component } from '@angular/core';
import { textFade } from '../animations/text-fade';
import { ResumeService } from '../../services/resume/resume.service';
import { IResumeCategory } from '../models/resume-model';

@Component({
  selector: 'pez-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    textFade
  ]
})
export class MenuComponent {

  routes: IResumeCategory[] = [];

  constructor(private _resume: ResumeService) {

    this.routes = this._resume.allCategories;

  }
  

}
