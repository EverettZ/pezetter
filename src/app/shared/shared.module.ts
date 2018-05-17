import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TitleComponent } from './title/title.component';
import { AppTitleComponent } from './app-title/app-title.component';
import { TextDecodeComponent } from './text-decode/text-decode.component';

@NgModule({
  declarations: [
    TitleComponent,
    AppTitleComponent,
    TextDecodeComponent
  ],
  exports: [
    TitleComponent,
    AppTitleComponent,
    TextDecodeComponent
  ],
  imports: [
    BrowserAnimationsModule
  ]
})
export class SharedModule { }
