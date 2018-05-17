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
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    ResumeService,
    { provide: RequestCache, useClass: RequestCacheWithMap },
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: EnsureHttpsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
