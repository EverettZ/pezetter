import { PublicLayoutComponent } from './../shared/layouts/components/public-layout/public-layout.component';
import { ResumeResolverService } from './../../services/resume-resolver/resume-resolver.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResumeComponent } from './components/resume/resume.component';
import { PersonalComponent } from './components/personal/personal.component';


const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: ':category',
        component: ResumeComponent,
        resolve: {
          ResumeResolverService
        }
      },
      {
        path: '',
        component: PersonalComponent,
        resolve: {
          ResumeResolverService
        }
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
