import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { FullLayoutModule } from '../../shared/ui/layouts/full-layout/full-layout.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FocusedLayoutModule } from '../../shared/ui/layouts/focused-layout/focused-layout.module';
import { MatChipsModule } from '@angular/material/chips';
import { AddResumeComponent } from './components/add-resume/add-resume.component';
import { ResumeCardComponent } from './components/resume-card/resume-card.component';
import { MaxLengthEtcDirective } from '../../shared/directives/max-length-etc/max-length-etc.directive';
import { MaxLengthEtcPipe } from '../../shared/pipe/max-length-etc/max-length-etc.pipe';


@NgModule({
  declarations: [
    HomeComponent,
    AddResumeComponent,
    ResumeCardComponent,
    MaxLengthEtcPipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FullLayoutModule,
    FocusedLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    MatChipsModule
  ]
})
export class HomeModule { }
