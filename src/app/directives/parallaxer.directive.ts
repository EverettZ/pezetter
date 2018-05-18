import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { ScrollParallaxService } from '../services/scroll-parallax/scroll-parallax.service';

@Directive({
  selector: '[pezParallaxer]'
})
export class ParallaxerDirective implements OnInit {

  @Input('pezParallaxer') pezParallaxer;

  constructor(private elementRef: ElementRef, private _parallaxer: ScrollParallaxService) { }

  ngOnInit() {

    if (this.pezParallaxer) {

      this._parallaxer.add(this.elementRef);

    }

  }

}
