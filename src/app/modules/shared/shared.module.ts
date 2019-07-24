import { ServicesModule } from './../../services/services.module';
import { RouterModule } from '@angular/router';
import { AvatarComponent } from './components/avatar/avatar.component';
import { LayoutsModule } from './layouts/layouts.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { TextDecodeComponent } from './components/text-decode/text-decode.component';
import { ParallaxerDirective } from './directives/parallaxer.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AvatarComponent,
    MenuComponent,
    TextDecodeComponent,
    ParallaxerDirective
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    RouterModule,
    OverlayModule,
    ServicesModule
  ],
  exports: [
    LayoutsModule,
    AvatarComponent,
    MenuComponent,
    TextDecodeComponent,
    ParallaxerDirective
  ]
})
export class SharedModule { }
