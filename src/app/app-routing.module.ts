import { ResumeComponent } from './resume/resume.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'resume',
    component: HomeComponent,
    children: []
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
