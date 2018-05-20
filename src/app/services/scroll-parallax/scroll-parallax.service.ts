import { element } from 'protractor';
import { Injectable, HostListener, ElementRef } from '@angular/core';
import { ParallaxerElementRef, Parallaxer, ParallaxerConfig } from '../../directives/parallaxer.config';


@Injectable({
  providedIn: 'root'
})
export class ScrollParallaxService {

  parallaxes: ParallaxerElementRef[] = [];

  constructor() {

    window.addEventListener('mousewheel', (ev) => {
      
      this.shiftElements(ev.deltaY >= 0);

    });

    let lastY;
    window.addEventListener('touchmove', (ev) => {
       const currentY = ev.changedTouches[0].clientY;
       this.shiftElements(currentY > lastY);
       lastY = currentY;
 
     });

  }

  add(el: ElementRef, config: ParallaxerConfig) {

    const parallax = new Parallaxer(config);
    const newParallaxElementRef = new ParallaxerElementRef(parallax, el);
    
    this.parallaxes.push(newParallaxElementRef);

  }

  shiftElements(isPositive: boolean) {

    this.parallaxes
      .forEach((parallaxRef: ParallaxerElementRef) => {

        if (isPositive) {

          parallaxRef.parallaxer.increment();

        } else {
          
          parallaxRef.parallaxer.decrement();

        }

        this.shiftElement(parallaxRef);

      });

  }

  shiftElement(parallaxRef: ParallaxerElementRef) {

    parallaxRef.el.nativeElement.style.transform = `translate(${parallaxRef.parallaxer.getCurrX()}px, ${parallaxRef.parallaxer.getCurrY()}px)`;

  }

}

