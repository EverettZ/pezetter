import { textFade } from './../../../../utils/animations/text-fade';
import { Component, Input, AfterViewInit, HostBinding, HostListener } from '@angular/core';
let count = 0;
@Component({
  selector: 'pez-text-decode',
  templateUrl: './text-decode.component.html',
  styleUrls: ['./text-decode.component.scss'],
  animations: [
    textFade
  ]
})
export class TextDecodeComponent implements AfterViewInit {

  decodeClass = `decode-text-${count++}`;

  tempValue: string;

  @Input() set value(val: string) {

    this.tempValue = val;

    if (val.length) {

      this.splitValue();

      setTimeout(() => {

        this.decodeText();

      }, 1000);

    }

  }

  get value() {

    return this.tempValue;

  }

  titleChars: string[] = [];

  ngAfterViewInit() {

    this.decodeText();

  }

  splitValue() {

    this.titleChars = this.value.split('');

  }


  decodeText() {

    // get nodelist
    const text = document.getElementsByClassName(this.decodeClass)[0];

    // assign the placeholder array its places
    const state = [];

    for (let i = 0, j = text.children.length; i < j; i++) {

      state[i] = i;

    }

    // shuffle the array places to get randomness
    const shuffled = this.shuffle(state);

    for (let i = 0, j = shuffled.length; i < j; i++) {

      const child = text.children[shuffled[i]];
      const classes = child.classList;

      // fire the first one at random times
      const state1Time = Math.round(Math.random() * (2000 - 300)) + 50;

      if (classes.contains('text-animation')) {

        setTimeout(() => {

          this.firstStages(child);

        }, state1Time);

      }
    }

  }

  // send the node for later .state changes
  firstStages(child) {

    if (child.classList.contains('state-2')) {

      child.classList.add('state-3');

    } else if (child.classList.contains('state-1')) {

      child.classList.add('state-2');

    } else if (!child.classList.contains('state-1')) {

      child.classList.add('state-1');

      setTimeout(() => {

        this.secondStages(child);

      }, 100);


    }
  }
  secondStages(child) {

    if (child.classList.contains('state-1')) {

      child.classList.add('state-2');

      setTimeout(() => {

        this.thirdStages(child);

      }, 100);

    } else if (!child.classList.contains('state-1')) {

      child.classList.add('state-1');

    }
  }

  thirdStages(child) {

    if (child.classList.contains('state-2')) {

      child.classList.add('state-3');

    }

  }


  shuffle(array) {

    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;

    }

    return array;
  }

}
