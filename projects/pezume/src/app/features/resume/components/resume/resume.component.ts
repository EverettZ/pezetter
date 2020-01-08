import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../../../../shared/services/resume/resume.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import Resume from 'projects/pezume/src/app/shared/models/control.model';

@Component({
  selector: 'pez-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  $resume: Observable<Resume>;

  constructor(
    private route: ActivatedRoute,
    public resumeService: ResumeService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.$resume = this.resumeService.getResume(`${id}`);
  }

}
