import { ResumeComponent } from './resume/resume.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResumeCategoryTypes } from './shared/models/resume-model';

const routes: Routes = [
  {
    path: 'resume',
    component: HomeComponent,
    children: [
      {
        path: ResumeCategoryTypes.education,
        component: ResumeComponent
      },
      {
        path: ResumeCategoryTypes.experience,
        component: ResumeComponent
      },
      {
        path: ResumeCategoryTypes.portfolio,
        component: ResumeComponent
      },
      {
        path: ResumeCategoryTypes.skills,
        component: ResumeComponent
      },
      {
        path: ResumeCategoryTypes.social,
        component: ResumeComponent,
      },

    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'resume'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
