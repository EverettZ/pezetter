import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      @import "tailwindcss/base";
      @import "tailwindcss/components";
      @import "tailwindcss/utilities";
    `
  ]
})
export class AppComponent {
}
