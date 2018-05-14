import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../services/resume/resume.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Skill } from '../shared/models/skill';

@Component({
  selector: 'pez-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
 
  title = 'skills';
  skills$: BehaviorSubject<Skill[]> = new BehaviorSubject<Skill[]>([]);

  constructor(private _resume: ResumeService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._resume.skills$
      .pipe(
        tap(skills => {
          this.skills$.next(skills);
        })
      ).subscribe();
  }
}
