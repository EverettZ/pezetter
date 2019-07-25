import { ScrollParallaxService } from './../../../services/scroll-parallax/scroll-parallax.service';
import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { ParallaxerConfig } from './parallaxer.config';

const defaultConfig: ParallaxerConfig = {
  xMax: 100,
  yMax: 100,
  increment: 1
};

@Directive({
  selector: '[pezParallaxer]'
})
export class ParallaxerDirective implements OnInit {

  @Input() pezParallaxer = '0';
  @Input() pezParallaxerConfig: ParallaxerConfig = defaultConfig;

  constructor(private elementRef: ElementRef, private _parallaxer: ScrollParallaxService) { }

  ngOnInit() {

    this._parallaxer.add(this.elementRef, this.pezParallaxerConfig);

  }

}
