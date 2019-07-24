import { PersonalComponent } from './components/personal/personal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { ResumeComponent } from './components/resume/resume.component';



@NgModule({
  declarations: [
    HomeComponent,
    PersonalComponent,
    ResumeComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UserModule { }
