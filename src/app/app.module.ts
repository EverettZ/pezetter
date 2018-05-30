import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ResumeComponent } from './resume/resume.component';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from './shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { ResumeService } from './services/resume/resume.service';
import { ScrollbarModule } from 'ngx-scrollbar';
import { RequestCache, RequestCacheWithMap } from './services/request-cache/request-cache.service';
import { NoopInterceptor } from './services/interceptors/noop-interceptor';
import { EnsureHttpsInterceptor } from './services/interceptors/ensure-https-interceptor';
import { CachingInterceptor } from './services/interceptors/caching-interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule, OverlayContainer, FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { MenuOverlayService } from './services/menu-overlay/menu-overlay.service';
import { MenuComponent } from './shared/menu/menu.component';

@NgModule({
  entryComponents: [
    ResumeComponent
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ResumeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    OverlayModule,
    SharedModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
