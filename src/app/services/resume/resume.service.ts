import { BASE_SNIPPET } from './../../shared/models/urls';
import { IResume, IResumeCategory, IResumeItem, IBaseSnippet } from './../../shared/models/card-model';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, toArray, merge, concatMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable( {
  providedIn: 'root'
} )
export class ResumeService {

  personalInfo$: Observable<IResume>;

  resumeRoutes: IResumeItem[] = [];

  constructor ( private http: HttpClient, private router: Router ) { }

  getBaseSnippet() {

    return this.http
      .get( BASE_SNIPPET )
      .pipe(
        map( ( snippet: any ) => {

          const files = snippet.files;

          const resumeHrefs: string[] = [];

          for ( const key of Object.keys( files ) ) {

            const resumeHref = files[ key ].links.self.href;

            resumeHrefs.push( resumeHref );

            if ( key.indexOf( 'resume' ) === -1 ) {

              this.resumeRoutes.push( {
                name: key.split( '.json' )[ 0 ]
              } );

            }

          }

          return resumeHrefs;

        } ),
        mergeMap( ( resumeHrefs: string[] ) => {

          debugger;
          return this.getCategories( resumeHrefs );
          // return resumeHrefs;
        } )
      ).subscribe( ok => {
        console.log( ok );
        debugger;
      } );

  }




  private getCategories( resumeHrefs: string[] ) {
    debugger;
    return from( resumeHrefs )
      .pipe(
        mergeMap( href => {
          debugger;
          return this.http.get( href );

        } ),
        toArray()
      );
  }

  getPersonalInfo( href: string ) {

    this.personalInfo$ = this.http
      .get<IResume>( href );

  }
}
