import { AdminComponent } from './components/admin/admin.component';
import { PublicLayoutComponent } from './../shared/layouts/components/public-layout/public-layout.component';
import { ResumeResolverService } from './../../services/resume-resolver/resume-resolver.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        component: AdminComponent
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
