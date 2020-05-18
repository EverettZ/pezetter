import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoggedOutComponent } from './components/logged-out/logged-out.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'logged-out', component: LoggedOutComponent
  },
  {
    path: 'user', component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
