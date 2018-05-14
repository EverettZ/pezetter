import { Component, OnInit, AfterViewInit } from '@angular/core';
import { textFade } from '../shared/animations/text-fade';
// https://www.yearofmoo.com/2017/06/new-wave-of-animation-features.html
@Component({
  selector: 'pez-app-title',
  templateUrl: './app-title.component.html',
  styleUrls: ['./app-title.component.scss'],
  animations: [
    textFade
  ]
})
export class AppTitleComponent implements OnInit, AfterViewInit {

  title = 'pezetter';

  codeletters = '&#*+%?£@§$';
  currLength = 0;
  message = 0;
  current_rando = 0;
  num_randos = 6;
  fadeBuffer = false;
  startTitle = 'pezetter';
  endTitle = 'Paul Everett Zettersten';
  fadeToggle = '';

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.currLength = this.startTitle.length;
    setTimeout(() => {
      this.animateIn();
    }, 1000);
  }

  fadeIn() {
    this.fadeToggle = 'fadeIn';
  }
  fadeOut() {
    this.fadeToggle = 'fadeOut';
  }
  toggle() {
    this.fadeToggle === 'fadeOut' ? this.fadeIn() : this.fadeOut();
  }

  animateIn() {

    if (this.title.length !== this.endTitle.length && (this.current_rando < ((this.endTitle.length - this.startTitle.length) / 2))) {

      this.current_rando++;

      if (this.startTitle.length < this.endTitle.length) {

        this.currLength++;

      }

      this.title = this.generateRandomString(this.title, this.currLength);
      this.toggle();
      setTimeout(() => {
        this.animateIn();
      }, 300);

    } else {

      this.title = this.endTitle;

    }
  }

  generateRandomString(currStr: string, length: number) {

    let random_text = '';

    while (random_text.length < length) {

      random_text += this.codeletters.charAt(Math.floor(Math.random() * this.codeletters.length));

    }

    return random_text;

  }

  getRandomIndexes(currStr: string) {

    let result = [],
      i = currStr.length / 2,
      j = 0,
      nums = [];

    for (let index = 0; index < currStr.length; index++) {

      nums.push(index);

    }

    while (i--) {

      j = Math.floor(Math.random() * (i + 1));
      result.push(j);
      nums.splice(j, 1);

    }

    return result;

  }

}
