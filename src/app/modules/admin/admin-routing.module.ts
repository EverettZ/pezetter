import { AdminComponent } from './components/admin/admin.component';
import { PublicLayoutComponent } from './../shared/layouts/components/public-layout/public-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ResumeBuilderComponent } from './components/resume-builder/resume-builder.component';
import { AuthGuard } from './guards/auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'resume-builder',
        pathMatch: 'full'
      },
      {
        path: '',
        component: AdminComponent,
        children: [
          {
            path: 'login',
            component: LoginComponent
          },
          {
            path: 'resume-builder',
            component: ResumeBuilderComponent,
            canActivate: [
              AuthGuard
            ],
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
