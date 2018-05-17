import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TitleComponent } from './title/title.component';
import { AppTitleComponent } from './app-title/app-title.component';
import { TextDecodeComponent } from './text-decode/text-decode.component';
import { MenuComponent } from './menu/menu.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MenuOverlayService } from '../services/menu-overlay.service.ts/menu-overlay.service';
import { OverlayContainer, FullscreenOverlayContainer, OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  entryComponents: [
    MenuComponent
  ],
  declarations: [
    TitleComponent,
    AppTitleComponent,
    TextDecodeComponent,
    MenuComponent
  ],
  exports: [
    TitleComponent,
    AppTitleComponent,
    TextDecodeComponent,
    MenuComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    RouterModule,
    OverlayModule
  ]
})
export class SharedModule { }
