import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

export function slideUpAnimation() {
  return trigger('slideUp', [
    state('show', style({transform: 'translateY(0)'})),
    transition('void => *', [
      animate(200, keyframes([
        style({transform: 'translateY(100%)', offset: 0}),
        style({transform: 'translateY(0)', offset: 1.0})
      ]))
    ]),
    transition('* => void', [
      animate(200, keyframes([
        style({transform: 'translateY(0)', offset: 0}),
        style({transform: 'translateY(-100%)', offset: 1.0})
      ]))
    ])
  ]);
}
