import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusedLayoutComponent } from './focused-layout.component';
import { LayoutModule } from '@angular/cdk/layout';



@NgModule({
  declarations: [
    FocusedLayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutModule
  ],
  exports: [
    FocusedLayoutComponent
  ]
})
export class FocusedLayoutModule { }
