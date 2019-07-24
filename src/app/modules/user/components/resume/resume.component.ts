import { IResumeCategory, IResumePersonal } from './../../../../utils/models/resume-model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'pez-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  category: IResumeCategory;
  personal: IResumePersonal;
  links: string[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.data
      .pipe(
        map(data => data.ResumeResolverService)
      )
      .subscribe((data: { category: IResumeCategory, personal: IResumePersonal, links: string[] }) => {

        this.category = data.category;
        this.personal = data.personal;
        this.links = data.links;

      });

  }



}
