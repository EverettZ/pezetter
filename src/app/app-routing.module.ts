import { ResumeComponent } from './resume/resume.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResumeCategoryTypes } from './shared/models/resume-model';
import { ResumeResolverService } from './services/resume-resolver/resume-resolver.service';
import { PersonalComponent } from './personal/personal.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: HomeComponent,
//     children: [
//       {
//         path: ':category',
//         component: ResumeComponent,
//         resolve: {
//           ResumeResolverService
//         }
//       },
//       {
//         path: '',
//         component: PersonalComponent,
//         resolve: {
//           ResumeResolverService
//         }
//       }
//     ]
//   },
//   { path: '**', component: PageNotFoundComponent }
// ];

const routes: Routes = [
  {
    path: 'user',
    loadChildren: './modules/user/user.module#UserModule',
  },
  {
    path: 'admin',
    loadChildren: './modules/admin/admin.module#AdminModule',
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ResumeResolverService
  ]
})
export class AppRoutingModule { }
