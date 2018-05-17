import { Component, OnInit, ViewChild } from '@angular/core';

// https://www.yearofmoo.com/2017/06/new-wave-of-animation-features.html

@Component({
  selector: 'pez-app-title',
  templateUrl: './app-title.component.html',
  styleUrls: ['./app-title.component.scss']
})
export class AppTitleComponent implements OnInit {

  @ViewChild('messenger') messenger;

  codeletters = '&#*+%?£@§$';
  message = 0;
  current_length = 0;
  fadeBuffer;
  messages = [
    'Paul Everett Zettersten'
  ];
  numBuffers = 0;

  constructor() { }

  ngOnInit() {
    this.init();
  }

  init() {

    setTimeout(() => {

      this.animateIn();

    }, 2000);

  }

  generateRandomString(length) {

    let random_text = '';

    while (random_text.length < length) {

      random_text += this.codeletters.charAt(Math.floor(Math.random() * this.codeletters.length));

    }

    return random_text;

  }

  animateIn() {

    if (this.current_length < this.messages[this.message].length) {

      this.current_length = this.current_length + 2;

      if (this.current_length > this.messages[this.message].length) {

        this.current_length = this.messages[this.message].length;

      }

      const message = this.generateRandomString(this.current_length);

      this.setMessengerContent(message);

      setTimeout(() => {

        this.animateIn();

      }, 20);

    } else {



      setTimeout(() => {

        this.animateFadeBuffer();

      }, 20);


    }

  }

  animateFadeBuffer() {

    if (!this.fadeBuffer) {

      this.fadeBuffer = [];

      for (let i = 0; i < this.messages[this.message].length; i++) {

        this.fadeBuffer.push({ c: (Math.floor(Math.random() * 12)) + 1, l: this.messages[this.message].charAt(i) });

      }

    }

    let do_cycles = false,
      message = '';

    for (let i = 0; i < this.fadeBuffer.length; i++) {

      const fader = this.fadeBuffer[i];

      if (fader.c > 0) {

        do_cycles = true;
        fader.c--;
        message += this.codeletters.charAt(Math.floor(Math.random() * this.codeletters.length));

      } else {

        message += fader.l;

      }

    }

    this.setMessengerContent(message);

    if (do_cycles === true) {

      this.numBuffers++;

      const timeoutTime = 50 * this.numBuffers / 2.2;

      setTimeout(() => {

        this.animateFadeBuffer();

      }, timeoutTime);

    } else {


      setTimeout(() => {

        this.cycleText();

      }, 1000);

    }
  }

  cycleText() {

    this.message = this.message + 1;

    if (this.message >= this.messages.length) {

      this.message = 0;
      return;
    }

    this.current_length = 0;
    this.fadeBuffer = false;
    this.setMessengerContent('');

    setTimeout(() => {

      this.animateIn();

    }, 200);

  }

  setMessengerContent(val: string) {

    this.messenger.nativeElement.innerHTML = val;

  }

}
