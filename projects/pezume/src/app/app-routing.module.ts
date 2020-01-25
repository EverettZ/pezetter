import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule),
    data: {
      animation: 'login',
      hideLogin: true
    }
  },
  {
    path: 'browse',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
    data: {
      animation: 'browse'
    }
  },
  {
    path: 'resume/:id',
    loadChildren: () => import('./features/resume/resume.module').then(m => m.ResumeModule),
    data: {
      animation: 'resume'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
