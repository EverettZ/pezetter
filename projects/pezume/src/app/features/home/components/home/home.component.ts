import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../../../../shared/services/resume/resume.service';
import Resume from '../../../../shared/models/resume.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'pez-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  $resumes: Observable<Resume[]>;

  constructor(private resumeService: ResumeService) { }

  ngOnInit() {
    this.$resumes = this.resumeService.getResumes();
  }

}
