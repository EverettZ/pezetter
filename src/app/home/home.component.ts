import { IResumeCategory, IResume } from '../shared/models/resume-model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationEnd, NavigationStart, Params } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ResumeService } from '../services/resume/resume.service';
import { Subject, Observable } from 'rxjs';

@Component( {
  selector: 'pez-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
} )
export class HomeComponent implements OnInit {

  constructor (private router: Router, private _resume: ResumeService, private route: ActivatedRoute ) { }

  ngOnInit() {

  }



}
