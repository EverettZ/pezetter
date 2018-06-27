import { ResumeComponent } from './../../resume/resume.component';
import { ICardModel, IResume, IResumeCategory, IResumeItem } from './../../shared/models/card-model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RESUME_BUCKET } from '../../shared/models/urls';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable( {
  providedIn: 'root'
} )
export class ResumeService {

  url = RESUME_BUCKET;

  baseResume$: Observable<IResume>;
  resume$: Observable<IResumeCategory[]>;

  resumeCategoryRefs: IResumeItem[] = [];


  constructor ( private http: HttpClient, private router: Router ) {

    this.baseResume$ = this.http
      .get<IResume>( this.url )
      .pipe(
        tap( ( resume: IResume ) => {

          this.resumeCategoryRefs = resume.items;

        } )
      );

  }


  getCategory( name: string ) {

    const found = this.resumeCategoryRefs
      .find( el => el.name === name );

    if ( found ) {

      return this.http
        .get<IResumeCategory>( found.href );

    }

    return of( undefined );

  }



}
