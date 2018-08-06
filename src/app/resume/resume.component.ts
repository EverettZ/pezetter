import { IResumeCategory, ResumeCategoryTypes, IResumePersonal } from '../shared/models/resume-model';
import { Router, ActivatedRoute, Event, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../services/resume/resume.service';
import { map } from 'rxjs/operators';
import { MenuOverlayService } from '../services/menu-overlay/menu-overlay.service';
import { MenuOverlayRef } from '../services/menu-overlay/menu-overlay-ref';

@Component({
  selector: 'pez-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {


  // categories$: BehaviorSubject<IResumeCategory[]> = new BehaviorSubject<IResumeCategory[]>([]);
  category: IResumeCategory;
  personal: IResumePersonal;
  links: string[] = [];


  constructor(private menuDialog: MenuOverlayService, private router: Router, private route: ActivatedRoute, private _resume: ResumeService) { }

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


  openMenu() {

    const dialogRef: MenuOverlayRef = this.menuDialog.open();

    this.router.events
      .subscribe((event: Event) => {

        if (event instanceof NavigationEnd) {

          dialogRef.close();

        }

      });


  }

}
