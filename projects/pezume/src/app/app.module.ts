import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavModule } from './shared/ui/navigation/main-nav/main-nav.module';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeModule } from './features/home/home.module';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MaxLengthEtcDirective } from './shared/directives/max-length-etc/max-length-etc.directive';
import { MaxLengthEtcPipe } from './shared/pipe/max-length-etc/max-length-etc.pipe';
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainNavModule,
    LayoutModule,
    HomeModule,
    MatNativeDateModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    NgxAuthFirebaseUIModule.forRoot(
      {
        apiKey: 'AIzaSyBVacySy-aJ3fBd6UI8HA_W63pjqqY-5Jg',
        authDomain: 'pezetter-204020.firebaseapp.com',
        databaseURL: 'https://pezetter-204020.firebaseio.com',
        projectId: 'pezetter-204020',
        storageBucket: 'pezetter-204020.appspot.com',
        messagingSenderId: '699564472178',
        appId: '1:699564472178:web:6a768b5e5bbd221b'
      },
      () => 'pezume_factory',
      {
        enableFirestoreSync: true, // enable/disable autosync users with firestore
        toastMessageOnAuthSuccess: false, // whether to open/show a snackbar message on auth success - default : true
        toastMessageOnAuthError: true, // whether to open/show a snackbar message on auth error - default : true
        authGuardFallbackURL: '/logged-out', // url for unauthenticated users - to use in combination with canActivate feature on a route
        authGuardLoggedInURL: '/browse', // url for authenticated users - to use in combination with canActivate feature on a route
        passwordMaxLength: 60, // `min/max` input parameters in components should be within this range.
        passwordMinLength: 7, // Password length min/max in forms independently of each componenet min/max.
        // Same as password but for the name
        nameMaxLength: 50,
        nameMinLength: 2,
        // If set, sign-in/up form is not available until email has been verified.
        // Plus protected routes are still protected even though user is connected.
        guardProtectedRoutesUntilEmailIsVerified: false,
        enableEmailVerification: true, // default: true
      }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
