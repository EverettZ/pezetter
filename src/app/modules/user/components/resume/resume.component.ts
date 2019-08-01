import { IResumeCategory } from './../../../../utils/models/resume-model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ResumeService } from 'src/app/services/resume/resume.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'pez-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  category$: Observable<IResumeCategory>;

  constructor(private route: ActivatedRoute, private resume: ResumeService) { }

  ngOnInit() {

    this.category$ = this.resume.getResume().pipe(
      map(resume => {
        return resume[this.route.snapshot.params.category];
      })
    );

  }



}
