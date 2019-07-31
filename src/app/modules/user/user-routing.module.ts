import { CategoryResolverService } from './services/category-resolver/category-resolver.service';
import { ContainerResolverService } from './services/container-resolver/container-resolver.service';
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
        resolve: {
          ContainerResolverService
        },
        children: [
          {
            path: 'home',
            component: PersonalComponent
          },
          {
            path: ':category',
            component: ResumeComponent,
            resolve: {
              CategoryResolverService
            }
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
