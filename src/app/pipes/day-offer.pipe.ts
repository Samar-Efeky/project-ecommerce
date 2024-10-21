import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayOffer',
  standalone: true
})
export class DayOfferPipe implements PipeTransform {

  transform(value:number):number {
    return value*(50/100);
  }

}
