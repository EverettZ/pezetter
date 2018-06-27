import { IResumeCategory, IResume } from './../shared/models/card-model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationEnd, NavigationStart, Params } from '@angular/router';
import { tap } from 'rxjs/operators';
import { MenuOverlayRef } from '../services/menu-overlay/menu-overlay-ref';
import { MenuOverlayService } from '../services/menu-overlay/menu-overlay.service';
import { ResumeService } from '../services/resume/resume.service';
import { Subject, Observable } from 'rxjs';

@Component( {
  selector: 'pez-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
} )
export class HomeComponent implements OnInit {

  resume$: Subject<IResume> = new Subject<IResume>();
  _resume$: Observable<IResume>;

  categoryData: IResumeCategory;

  categoryName: string = '';

  constructor ( private menuDialog: MenuOverlayService, private router: Router, private _resume: ResumeService, private route: ActivatedRoute ) { }

  ngOnInit() {

    // this._resume$ = this._resume.baseResume$
    //   .pipe(
    //     tap( () => {

    //       this.route.queryParams
    //         .subscribe( ( data: Params ) => {

    //           console.log( data );

    //           if ( data[ 'category' ] ) {

    //             this.categoryName = data[ 'category' ];

    //             this._resume.getCategory( this.categoryName )
    //               .pipe(
    //                 tap( ok => {

    //                   this.categoryData = ok;

    //                 } )
    //               ).subscribe();
    //           }

    //         } );

    //     } )
    //   );

    this._resume.getBaseSnippet();

  }




  openMenu() {

    const dialogRef: MenuOverlayRef = this.menuDialog.open();

    this.router.events
      .subscribe( ( event: Event ) => {

        if ( event instanceof NavigationEnd ) {

          dialogRef.close();

        }

      } );


  }

}
