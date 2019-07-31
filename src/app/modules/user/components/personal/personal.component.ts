import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { IResumePersonal } from 'src/app/utils/models/resume-model';
import { Observable } from 'rxjs';
import { ResumeService } from 'src/app/services/resume/resume.service';

@Component({
  selector: 'pez-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  providers: [
    DatePipe
  ]
})
export class PersonalComponent implements OnInit {

  personal$: Observable<IResumePersonal>;

  constructor(private resume: ResumeService) { }

  ngOnInit() {

    this.personal$ = this.resume.getResume().pipe(
      map(r => r.personal)
    );

  }

}
