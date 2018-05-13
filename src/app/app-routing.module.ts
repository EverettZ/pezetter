import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExperienceComponent } from './experience/experience.component';
import { EducationComponent } from './education/education.component';
import { SocialComponent } from './social/social.component';
import { SkillsComponent } from './skills/skills.component';
import { CharityComponent } from './charity/charity.component';
import { PersonalComponent } from './personal/personal.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: 'experience',
            component: ExperienceComponent
          },
          {
            path: 'charity',
            component: CharityComponent
          },
          {
            path: 'skills',
            component: SkillsComponent
          },
          {
            path: 'social',
            component: SocialComponent
          },
          {
            path: 'education',
            component: EducationComponent
          },
          {
            path: 'personal',
            component: PersonalComponent
          }
        ]
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
