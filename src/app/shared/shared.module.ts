import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TitleComponent } from './title/title.component';

@NgModule({
  declarations: [
    TitleComponent
  ],
  exports: [
    TitleComponent
  ],
  imports: [
    BrowserAnimationsModule
  ]
})
export class SharedModule { }
