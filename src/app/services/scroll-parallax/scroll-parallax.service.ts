import { element } from 'protractor';
import { Injectable, HostListener, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollParallaxService {

  parallaxes: ParallaxerElementRef[] = [];

  @HostListener('mousewheel', ['$event']) scrollling(ev: WheelEvent) {



  }

  constructor() {

    window.addEventListener('mousewheel', (ev) => {
      
      this.shiftElements(ev.deltaY >= 0);

    });

  }

  add(el: ElementRef) {

    const parallax = new Parallaxer(0, 0, 20, 0, 0, 20, 1);
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

export class ParallaxerElementRef {

  parallaxer: Parallaxer;
  el: ElementRef;

  constructor(parallaxer: Parallaxer, el: ElementRef) {
    this.parallaxer = parallaxer;
    this.el = el;
  }

}

export class Parallaxer {

  x: ParallaxerDimension;
  y: ParallaxerDimension;
  speed = 1;

  constructor(xCurr: number, xBase: number, xMax: number, yCurr: number, yBase: number, yMax: number, speed: number) {

    this.x = new ParallaxerDimension(xBase, xCurr, xMax);
    this.y = new ParallaxerDimension(yBase, yCurr, yMax);
    this.speed = speed;
  }

  increment() {

    let currSpeed = this.speed;

    while (currSpeed > 0) {
      this.x.increment();
      this.y.increment();
      currSpeed--;
    }

  }

  decrement() {

    let currSpeed = this.speed;

    while (currSpeed > 0) {

      this.x.decrement();
      this.y.decrement();

      currSpeed--;

    }

  }

  getCurrX() {
    return this.x.curr;
  }
  getCurrY() {
    return this.y.curr;
  }

}

export class ParallaxerDimension {

  curr: number;
  base: number;
  max: number;
  direction: ParallaxerDirection = ParallaxerDirection.positive;

  constructor(curr, base, max) {

    this.curr = curr;
    this.base = base;
    this.max = max;

    if (max < base) {

      this.direction = ParallaxerDirection.negative;

    }

  }

  increment() {

    if (this.direction === ParallaxerDirection.negative && this.curr > this.max) {

      this.curr--;

    } else if (this.direction === ParallaxerDirection.positive && this.curr < this.max) {

      this.curr++;

    }

  }

  decrement() {

    if (this.direction === ParallaxerDirection.negative && this.curr < this.base) {

      this.curr++;

    } else if (this.direction === ParallaxerDirection.positive && this.curr > this.base) {

      this.curr--;

    }

  }

}

export enum ParallaxerDirection {
  positive,
  negative
}