import { IResumeCategory, IResume } from './../shared/models/card-model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationEnd } from '@angular/router';
import { tap } from 'rxjs/operators';
import { MenuOverlayRef } from '../services/menu-overlay/menu-overlay-ref';
import { MenuOverlayService } from '../services/menu-overlay/menu-overlay.service';
import { ResumeService } from '../services/resume/resume.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'pez-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  resume$: Subject<IResume> = new Subject<IResume>();

  constructor(private menuDialog: MenuOverlayService, private router: Router, private _resume: ResumeService) { }

  ngOnInit() {

    this._resume.baseResume$
      .pipe(
        tap(resume => {

          this.resume$.next(resume);

        })
      ).subscribe();

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
