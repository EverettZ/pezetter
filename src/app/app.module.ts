import { AdminModule } from './modules/admin/admin.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import * as LogRocket from 'logrocket';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { OverlayModule } from '@angular/cdk/overlay';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CommonModule } from '@angular/common';
import { UserModule } from './modules/user/user.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBVacySy-aJ3fBd6UI8HA_W63pjqqY-5Jg",
  authDomain: "pezetter-204020.firebaseapp.com",
  databaseURL: "https://pezetter-204020.firebaseio.com",
  projectId: "pezetter-204020",
  storageBucket: "pezetter-204020.appspot.com",
  messagingSenderId: "699564472178",
  appId: "1:699564472178:web:6a768b5e5bbd221b"
};

if ( location.hostname !== 'localhost' ) {

  LogRocket.init( '9fzko8/pezetter');

}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UserModule,
    AdminModule,
    MatButtonModule,
    MatMenuModule,
    OverlayModule,
    CommonModule,

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    // ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
