import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { FocusedLayoutModule } from '../../shared/layouts/focused-layout/focused-layout.module';
import { MatIconModule } from '@angular/material/icon';
import { LoginFormComponent } from './components/login-form/login-form.component';


@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent
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
    MatIconModule
  ]
})
export class LoginModule { }
