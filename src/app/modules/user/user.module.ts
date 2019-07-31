import { PersonalComponent } from './components/personal/personal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeComponent } from './components/resume/resume.component';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserComponent } from './components/user/user.component';



@NgModule({
  declarations: [
    PersonalComponent,
    ResumeComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    UserRoutingModule
  ]
})
export class UserModule { }
