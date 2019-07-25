import { PersonalComponent } from './components/personal/personal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeComponent } from './components/resume/resume.component';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PersonalComponent,
    ResumeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    UserRoutingModule
  ]
})
export class UserModule { }
