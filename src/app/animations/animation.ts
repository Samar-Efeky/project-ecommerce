import { trigger, state, style, transition, animate } from '@angular/animations';

export const slideInOutAnimation = trigger('slideInOut', [
  state('in', style({
    transform: 'translateX(0)'
  })),
  state('out', style({
    transform: 'translateX(100%)'
  })),
  transition('in => out', [
    animate('0.5s ease-in-out')
  ]),
  transition('out => in', [
    animate('0.5s ease-in-out')
  ])
]);
export const imageAnimation= trigger('imageAnimation', [
    state('hidden', style({
      transform: 'scale(0)', 
      opacity: 0
    })),
    state('visible', style({
      transform: 'scale(1)', 
      opacity: 1
    })),
    transition('hidden => visible', [
      animate('1s ease-out') 
    ]),
    transition('visible => hidden', [
      animate('0.5s ease-in') 
    ])
  ]);
  export const slideInAnimation=  trigger('slideIn', [
    transition(':enter', [
      style({ transform: 'translateY(100%)', opacity: 0 }),
      animate('0.7s ease-out', style({ transform: 'translateY(0)', opacity: 1 })) 
    ]),
    transition(':leave', [
      animate('0.7s ease-out', style({ transform: 'translateY(100%)', opacity: 0 }))
    ])
  ]);
  export const slideDownAnimation=  trigger('slideDown', [
    transition(':enter', [
      style({ transform: 'translateY(-100%)', opacity: 0 }),
      animate('0.5s ease-out', style({ transform: 'translateY(0)', opacity: 1 })) 
    ]),
    transition(':leave', [
      animate('0.5s ease-out', style({ transform: 'translateY(-100%)', opacity: 0 }))
    ])
  ]);
  