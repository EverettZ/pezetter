import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

export const textFade = trigger(
    'textFade', [
      transition('* => fadeIn', [
        style({opacity: 0}),
        animate('750ms', style({opacity: 1}))
      ]),
      transition('* => fadeOut', [
        style({opacity: 1}),
        animate('750ms', style({opacity: 0}))
      ])
    ]
  );