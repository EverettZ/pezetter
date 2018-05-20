import { ElementRef } from "@angular/core";

export class ParallaxerConfig {

    xMax: number = 100;
    yMax: number = 100;
    increment: number = 1;

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
    speed: number = 1;

    constructor(config: ParallaxerConfig) {

        if (window.outerHeight < 900) {

            config.xMax = config.xMax * 2;
            config.yMax = config.yMax * 2;

        }
        
        this.x = new ParallaxerDimension(0, 0, config.xMax);
        this.y = new ParallaxerDimension(0, 0, config.yMax);
        this.speed = config.increment || 1;

    }

    increment() {

        let curr = this.speed;

        while (curr > 0) {

            this.x.increment();
            this.y.increment();
            curr--;

        }

    }

    decrement() {

        let curr = this.speed;

        while (curr > 0) {

            this.x.decrement();
            this.y.decrement();
            curr--;

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