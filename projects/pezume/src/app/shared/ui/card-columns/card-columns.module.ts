import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardColumnsComponent } from './components/card-columns/card-columns.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [CardColumnsComponent],
  exports: [CardColumnsComponent],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class CardColumnsModule { }
