import {
    trigger,
    state,
    style,
    animate,
    transition,
} from '@angular/animations';


export const assetDetails = trigger('assetDetails', [
    // ...
    state('hidden', style({
      top: "100%",
      // opacity: 0,
      backgroundColor: 'rgba(0, 0, 0, 0)'
    })),
    state('shown', style({
      top: "0%",
      backgroundColor: 'rgba(0, 0, 0, 0.7)'
    })),
    transition('shown => hidden', [
      animate('0.5s')
    ]),
    transition('hidden => shown', [
      animate('0.5s')
    ]),
])