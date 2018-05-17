import { Component } from '@angular/core';
import { textFade } from '../animations/text-fade';

@Component({
  selector: 'pez-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    textFade
  ]
})
export class MenuComponent {}
