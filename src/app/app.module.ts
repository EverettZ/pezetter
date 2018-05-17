import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EducationComponent } from './education/education.component';
import { SocialComponent } from './social/social.component';
import { CharityComponent } from './charity/charity.component';
import { ExperienceComponent } from './experience/experience.component';
import { SkillsComponent } from './skills/skills.component';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { PersonalComponent } from './personal/personal.component';
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
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {OverlayModule, OverlayContainer, FullscreenOverlayContainer} from '@angular/cdk/overlay';
import { MenuOverlayService } from './services/menu-overlay.service.ts/menu-overlay.service';
import { MenuComponent } from './shared/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    EducationComponent,
    SocialComponent,
    CharityComponent,
    ExperienceComponent,
    SkillsComponent,
    HomeComponent,
    PersonalComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    HttpClientModule,
    OverlayModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    ResumeService,
    MenuOverlayService,
    { provide: RequestCache, useClass: RequestCacheWithMap },
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: EnsureHttpsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
