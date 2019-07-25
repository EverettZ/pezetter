import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ResumeService } from 'src/app/services/resume/resume.service';

@Component({
  selector: 'pez-resume-builder',
  templateUrl: './resume-builder.component.html',
  styleUrls: ['./resume-builder.component.scss']
})
export class ResumeBuilderComponent implements OnInit {

  constructor(public auth: AuthService, private resume: ResumeService) { }

  ngOnInit() {
  }

}
