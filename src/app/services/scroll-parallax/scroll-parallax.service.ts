import { element } from 'protractor';
import { Injectable, HostListener, ElementRef } from '@angular/core';
import { ParallaxerElementRef, Parallaxer, ParallaxerConfig } from '../../directives/parallaxer.config';
import { fromEvent } from 'rxjs';
import { throttle, throttleTime, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ScrollParallaxService {

  parallaxes: ParallaxerElementRef[] = [];

  constructor() {

    const wheelMoves = fromEvent(window, 'mousewheel');
    const touchMoves = fromEvent(window, 'touchmove');
    let lastY;

    wheelMoves.pipe(
      throttleTime(100),
      tap((ev: any) => {
        
        this.shiftElements(ev.deltaY >= 0);

      })
    ).subscribe();


    touchMoves.pipe(
      throttleTime(100),
      tap((ev: any) => {

        const currentY = ev.changedTouches[0].clientY;
        this.shiftElements(currentY > lastY);
        lastY = currentY;

      })
    ).subscribe();

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

