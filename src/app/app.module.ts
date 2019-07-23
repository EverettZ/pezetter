import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import * as LogRocket from 'logrocket';

import { ResumeComponent } from './resume/resume.component';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from './shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { PersonalComponent } from './personal/personal.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar/avatar.component';
import { UserModule } from './modules/user/user.module';

if ( location.hostname !== 'localhost' ) {

  LogRocket.init( '9fzko8/pezetter');

}

@NgModule({
  entryComponents: [
    ResumeComponent
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ResumeComponent,
    PersonalComponent,
    PageNotFoundComponent,
    AvatarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UserModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    OverlayModule,
    MatCardModule,
    SharedModule,
    CommonModule,
    // ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
