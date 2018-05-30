import { ServicesModule } from './../services/services.module';
import { ParallaxerDirective } from './../directives/parallaxer.directive';
import { BackgroundComponent } from './background/background.component';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TitleComponent } from './title/title.component';
import { AppTitleComponent } from './app-title/app-title.component';
import { TextDecodeComponent } from './text-decode/text-decode.component';
import { MenuComponent } from './menu/menu.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MenuOverlayService } from '../services/menu-overlay/menu-overlay.service';
import { OverlayContainer, FullscreenOverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { ScrollParallaxService } from '../services/scroll-parallax/scroll-parallax.service';
import { ResumeComponent } from '../resume/resume.component';

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
