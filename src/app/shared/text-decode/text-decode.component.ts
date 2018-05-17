import { Component, ViewChild, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pez-text-decode',
  templateUrl: './text-decode.component.html',
  styleUrls: ['./text-decode.component.scss']
})
export class TextDecodeComponent implements OnInit {

  messages = [];

  @ViewChild('messengerContainer') messengerContainer;
  messenger;

  codeletters = '&#*+%?£@§$';
  message = 0;
  current_length = 0;
  fadeBuffer;
  numBuffers = 0;

  constructor() { }

  ngOnInit() {

    this.init();


  }

  init() {

    if (this.messengerContainer.nativeElement.children !== undefined && this.messengerContainer.nativeElement.children.length) {

      this.messenger = this.messengerContainer.nativeElement.children[0];
      this.messenger.classList.add('messenger');
      this.messages.push(this.messenger.innerHTML);

    }
    
    this.animateIn();

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

    this.messenger.innerHTML = val;

  }

}