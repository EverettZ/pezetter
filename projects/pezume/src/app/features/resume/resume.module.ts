import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumeRoutingModule } from './resume-routing.module';
import { ResumeComponent } from './components/resume/resume.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FullLayoutModule } from '../../shared/ui/layouts/full-layout/full-layout.module';
import { MatCardModule } from '@angular/material/card';
import { AvatarModule } from '../../shared/ui/avatar/avatar.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatepickerModule } from '../../shared/ui/datepicker/datepicker.module';
import { ResumePageCardComponent } from './components/resume-page-card/resume-page-card.component';
import { CardColumnsModule } from '../../shared/ui/card-columns/card-columns.module';
import { FileUploaderModule } from '../../shared/ui/file-uploader/file-uploader.module';

@NgModule({
  declarations: [
    ResumeComponent,
    ResumePageCardComponent
  ],
  imports: [
    CommonModule,
    ResumeRoutingModule,
    MatTabsModule,
    FullLayoutModule,
    MatCardModule,
    AvatarModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    DatepickerModule,
    CardColumnsModule,
    FileUploaderModule
  ]
})
export class ResumeModule { }
