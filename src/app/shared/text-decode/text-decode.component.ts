import { Component, ViewChild, Input, OnInit, AfterViewInit } from '@angular/core';
import { textFade } from '../animations/text-fade';

@Component({
  selector: 'pez-text-decode',
  templateUrl: './text-decode.component.html',
  styleUrls: ['./text-decode.component.scss'],
  animations: [
    textFade
  ]
})
export class TextDecodeComponent implements OnInit, AfterViewInit {

  @Input('value') value = "Paul Everett Zettersten";
  titleChars: string[] = [];

  ngOnInit() {

    this.splitValue();

  }

  ngAfterViewInit() {

    this.decodeText();

  }

  splitValue() {

    this.titleChars = this.value.split('');

  }


  decodeText() {

    // get nodelist
    const text = document.getElementsByClassName('decode-text')[0];

    // console.log(text);
    // console.log(text.children.length);

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


  // messages = [];

  // @ViewChild('messengerContainer') messengerContainer;
  // messenger;

  // codeletters = '&#*+%?£@§$';
  // message = 0;
  // current_length = 0;
  // fadeBuffer;
  // numBuffers = 0;

  // constructor() { }

  // ngOnInit() {

  //   this.init();


  // }

  // init() {

  //   if (this.messengerContainer.nativeElement.children !== undefined && this.messengerContainer.nativeElement.children.length) {

  //     this.messenger = this.messengerContainer.nativeElement.children[0];
  //     this.messenger.classList.add('messenger');
  //     this.messages.push(this.messenger.innerHTML);

  //   }

  //   this.animateIn();

  // }

  // generateRandomString(length) {

  //   let random_text = '';

  //   while (random_text.length < length) {

  //     random_text += this.codeletters.charAt(Math.floor(Math.random() * this.codeletters.length));

  //   }

  //   return random_text;

  // }

  // animateIn() {

  //   if (this.current_length < this.messages[this.message].length) {

  //     this.current_length = this.current_length + 2;

  //     if (this.current_length > this.messages[this.message].length) {

  //       this.current_length = this.messages[this.message].length;

  //     }

  //     const message = this.generateRandomString(this.current_length);

  //     this.setMessengerContent(message);

  //     setTimeout(() => {

  //       this.animateIn();

  //     }, 20);

  //   } else {

  //     setTimeout(() => {

  //       this.animateFadeBuffer();

  //     }, 20);

  //   }

  // }

  // animateFadeBuffer() {

  //   if (!this.fadeBuffer) {

  //     this.fadeBuffer = [];

  //     for (let i = 0; i < this.messages[this.message].length; i++) {

  //       this.fadeBuffer.push({ c: (Math.floor(Math.random() * 12)) + 1, l: this.messages[this.message].charAt(i) });

  //     }

  //   }

  //   let do_cycles = false,
  //     message = '';

  //   for (let i = 0; i < this.fadeBuffer.length; i++) {

  //     const fader = this.fadeBuffer[i];

  //     if (fader.c > 0) {

  //       do_cycles = true;
  //       fader.c--;
  //       message += this.codeletters.charAt(Math.floor(Math.random() * this.codeletters.length));

  //     } else {

  //       message += fader.l;

  //     }

  //   }

  //   this.setMessengerContent(message);

  //   if (do_cycles === true) {

  //     this.numBuffers++;

  //     const timeoutTime = 50 * this.numBuffers / 2.2;

  //     setTimeout(() => {

  //       this.animateFadeBuffer();

  //     }, timeoutTime);

  //   } else {

  //     setTimeout(() => {

  //       this.cycleText();

  //     }, 1000);

  //   }
  // }

  // cycleText() {

  //   this.message = this.message + 1;

  //   if (this.message >= this.messages.length) {

  //     this.message = 0;
  //     return;
  //   }

  //   this.current_length = 0;
  //   this.fadeBuffer = false;
  //   this.setMessengerContent('');

  //   setTimeout(() => {

  //     this.animateIn();

  //   }, 200);

  // }

  // setMessengerContent(val: string) {

  //   this.messenger.innerHTML = val;

  // }

}