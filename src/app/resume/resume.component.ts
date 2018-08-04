import { IResumeCategory, ResumeCategoryTypes } from '../shared/models/resume-model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../services/resume/resume.service';

@Component( {
  selector: 'pez-resume',
  templateUrl: './resume.component.html',
  styleUrls: [ './resume.component.scss' ]
} )
export class ResumeComponent implements OnInit {

 title = '';

  // categories$: BehaviorSubject<IResumeCategory[]> = new BehaviorSubject<IResumeCategory[]>([]);
 category: IResumeCategory;

  constructor ( private router: Router, private route: ActivatedRoute, private _resume: ResumeService ) { }

  ngOnInit() {

    console.log(this.router.url);

    switch ( this.route.toString() ) {
      case ResumeCategoryTypes.education:
        this.category = this._resume.education;
        break;
      case ResumeCategoryTypes.experience:
        this.category = this._resume.experiences;
        break;
      case ResumeCategoryTypes.portfolio:
        this.category = this._resume.portfolio;
        break;
      case ResumeCategoryTypes.skills:
        this.category = this._resume.skills;
        break;
      case ResumeCategoryTypes.social:
        this.category = this._resume.social;
        break;
    }
  }

}
