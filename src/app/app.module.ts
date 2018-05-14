import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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
import { AppTitleComponent } from './app-title/app-title.component';

@NgModule({
  declarations: [
    AppComponent,
    EducationComponent,
    SocialComponent,
    CharityComponent,
    ExperienceComponent,
    SkillsComponent,
    HomeComponent,
    PersonalComponent,
    AppTitleComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    ScrollbarModule
  ],
  providers: [
    ResumeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
