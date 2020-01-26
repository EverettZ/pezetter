import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { ResumePage, ResumeCard } from '../../../../shared/models/resume.model';

@Component({
  selector: 'pez-resume-page-card',
  templateUrl: './resume-page-card.component.html',
  styleUrls: ['./resume-page-card.component.scss']
})
export class ResumePageCardComponent implements OnInit {
  @HostBinding('class.card') cardClass = true;
  @Input() card: ResumeCard;
  constructor() { }

  ngOnInit() {
  }

}
