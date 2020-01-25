import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { ResumeService } from '../../../../shared/services/resume/resume.service';

@Component({
  selector: 'pez-add-resume',
  templateUrl: './add-resume.component.html',
  styleUrls: ['./add-resume.component.scss']
})
export class AddResumeComponent implements OnInit {
  
  @HostBinding('class.card') card = true;

  constructor(private resumeService: ResumeService) { }

  ngOnInit() {
  }

  addResume() {
    this.resumeService.intializeNewResume();
  }

}
