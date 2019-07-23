import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IResumePersonal } from '../shared/models/resume-model';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'pez-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  providers: [
    DatePipe
  ]
})
export class PersonalComponent implements OnInit {

  personal: IResumePersonal;
  splitName: string[];
  links: string[] = [];
  showPhone = false;
  age = 0;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.data
      .pipe(
        map(data => data.ResumeResolverService)
      )
      .subscribe((data: { personal: IResumePersonal, links: string[] }) => {
        console.log(data);
        this.personal = data.personal;
        this.links = data.links;
        this.splitName = data.personal.name.split(' ');
        const ageDifMs = Date.now() - new Date(this.personal.dob).getTime();
        const ageDate = new Date(ageDifMs); // miliseconds from epoch
        this.age = Math.abs(ageDate.getUTCFullYear() - 1970);

      });

  }

}
