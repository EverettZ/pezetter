import { PublicLayoutComponent } from './../shared/layouts/components/public-layout/public-layout.component';
import { ResumeResolverService } from './../../services/resume-resolver/resume-resolver.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResumeComponent } from './components/resume/resume.component';
import { PersonalComponent } from './components/personal/personal.component';
import { UserComponent } from './components/user/user.component';


const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        component: UserComponent,
        children: [
          {
            path: 'home',
            component: PersonalComponent
          },
          {
            path: ':category',
            component: ResumeComponent
          },
          {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full'
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
  ],
  providers: [
    ResumeResolverService
  ]
})
export class UserRoutingModule { }
