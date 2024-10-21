import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title',
  standalone: true
})
export class TitlePipe implements PipeTransform {

  transform(value: string):string {
    return value.split(' ').slice(0,8).join(' ');
  }

}
