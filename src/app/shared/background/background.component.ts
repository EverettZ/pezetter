import { Component, Input, ViewChildren, HostListener, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'pez-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements AfterViewInit {


  aElements: ElementRef[] = [];
  bElements: ElementRef[] = [];
  cElements: ElementRef[] = [];

  aParallaxer: Parallaxer;
  bParallaxer: Parallaxer;
  cParallaxer: Parallaxer;

  @ViewChildren('parallaxA') parallaxA;
  @ViewChildren('parallaxB') parallaxB;
  @ViewChildren('parallaxB') parallaxC;

  @HostListener('mousewheel', ['$event']) scrollling(ev: WheelEvent) {

    console.log(ev);

    if (ev.deltaY >= 0) {

      this.aParallaxer.increment();
      this.bParallaxer.increment();
      this.cParallaxer.increment();

    } else {

      this.aParallaxer.decrement();
      this.bParallaxer.decrement();
      this.cParallaxer.decrement();

    }

    this.shiftElements(this.aElements, this.aParallaxer);
    this.shiftElements(this.bElements, this.bParallaxer);
    this.shiftElements(this.cElements, this.cParallaxer);

  }

  constructor() { }

  ngAfterViewInit() {

    this.aElements = this.parallaxA._results;
    this.bElements = this.parallaxB._results;
    this.cElements = this.parallaxC._results;
    console.log(this.cElements);
    this.aParallaxer = new Parallaxer(0, 0, -50, 0, 0, -50, 1);
    this.bParallaxer = new Parallaxer(0, 0, 0, 0, 0, 75, 2);
    this.cParallaxer = new Parallaxer(0, 0, 50, 0, 0, 20, 2);

  }

  shiftElements(elements: ElementRef[], parallaxer: Parallaxer) {

    elements.forEach((element: ElementRef) => {
      element.nativeElement.style.transform = `translate(${parallaxer.getCurrX()}px, ${parallaxer.getCurrY()}px)`;
    });

  }

}

class Parallaxer {

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

class ParallaxerDimension {

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

enum ParallaxerDirection {
  positive,
  negative
}