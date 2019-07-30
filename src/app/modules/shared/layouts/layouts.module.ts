import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicLayoutComponent } from './components/public-layout/public-layout.component';
import { RouterModule } from '@angular/router';
import { HeaderLayoutComponent } from './components/header-layout/header-layout.component';



@NgModule({
  entryComponents: [
    PublicLayoutComponent,
    HeaderLayoutComponent
  ],
  declarations: [
    PublicLayoutComponent,
    HeaderLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    PublicLayoutComponent,
    HeaderLayoutComponent
  ]
})
export class LayoutsModule { }
