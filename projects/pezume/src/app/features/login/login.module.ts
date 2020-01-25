import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { FocusedLayoutModule } from '../../shared/ui/layouts/focused-layout/focused-layout.module';
import { MatIconModule } from '@angular/material/icon';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { LoggedOutComponent } from './components/logged-out/logged-out.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoggedOutComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    FocusedLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgxAuthFirebaseUIModule
  ]
})
export class LoginModule { }
