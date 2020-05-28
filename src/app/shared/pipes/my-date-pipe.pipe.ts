import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myDatePipe'
})
export class MyDatePipePipe implements PipeTransform {

  transform(value) {
    // let date = new Date(value);
    // let month = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`;
    return value;
    // return `${date.getDate()}.${month}.${date.getFullYear}`;
  }

}
