import { ResumePreview } from './../../../../shared/models/resume.model';
import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'pez-resume-card',
  templateUrl: './resume-card.component.html',
  styleUrls: ['./resume-card.component.scss']
})
export class ResumeCardComponent implements OnInit {
  @HostBinding('class.card') card = true;
  @Input() resume: ResumePreview;
  @Input() currUserId: ResumePreview;
  constructor() { }

  ngOnInit() {
  } 

}
