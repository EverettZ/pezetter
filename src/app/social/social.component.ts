import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../services/resume/resume.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Social } from '../shared/models/social';

@Component({
  selector: 'pez-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {

  title = 'social';
  socials$: BehaviorSubject<Social[]> = new BehaviorSubject<Social[]>([]);

  constructor(private _resume: ResumeService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._resume.socials$
      .pipe(
        tap(socials => {
          this.socials$.next(socials);
        })
      ).subscribe();
  }
}
