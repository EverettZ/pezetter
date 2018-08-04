import { ServicesModule } from '../services/services.module';
import { ParallaxerDirective } from '../directives/parallaxer.directive';
import { BackgroundComponent } from './background/background.component';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TitleComponent } from './title/title.component';
import { AppTitleComponent } from './app-title/app-title.component';
import { TextDecodeComponent } from './text-decode/text-decode.component';
import { MenuComponent } from './menu/menu.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {  OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  entryComponents: [
    MenuComponent,
    BackgroundComponent
  ],
  declarations: [
    TitleComponent,
    AppTitleComponent,
    TextDecodeComponent,
    MenuComponent,
    BackgroundComponent,
    ParallaxerDirective
  ],
  exports: [
    TitleComponent,
    AppTitleComponent,
    TextDecodeComponent,
    MenuComponent,
    BackgroundComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    RouterModule,
    OverlayModule,
    ServicesModule
  ]
})
export class SharedModule { }
