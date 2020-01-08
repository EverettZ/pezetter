import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumeRoutingModule } from './resume-routing.module';
import { ResumeComponent } from './components/resume/resume.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FullLayoutModule } from '../../shared/layouts/full-layout/full-layout.module';
import { MatCardModule } from '@angular/material/card';
import { AvatarModule } from '../../shared/ui/avatar/avatar.module';

@NgModule({
  declarations: [
    ResumeComponent
  ],
  imports: [
    CommonModule,
    ResumeRoutingModule,
    MatTabsModule,
    FullLayoutModule,
    MatCardModule,
    AvatarModule
  ]
})
export class ResumeModule { }
