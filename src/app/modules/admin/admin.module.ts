import { QuestionControlService } from './services/question-control/question-control.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './components/admin/admin.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ResumeBuilderComponent } from './components/resume-builder/resume-builder.component';
import { ResumeBuilderQuestionComponent } from './components/resume-builder-question/resume-builder-question.component';
import {MatSelectModule} from '@angular/material/select';
import { QuestionCategoryComponent } from './components/question-category/question-category.component';



@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    ResumeBuilderComponent,
    ResumeBuilderQuestionComponent,
    QuestionCategoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule
  ],
  providers: [
    QuestionControlService
  ]
})
export class AdminModule { }
