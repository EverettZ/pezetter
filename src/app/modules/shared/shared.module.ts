import { RouterModule } from '@angular/router';
import { AvatarComponent } from './components/avatar/avatar.component';
import { LayoutsModule } from './layouts/layouts.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AvatarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LayoutsModule,
    AvatarComponent
  ]
})
export class SharedModule { }
