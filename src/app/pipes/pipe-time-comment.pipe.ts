import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";
@Pipe({
  name: 'pipeTimeComment'
})
export class PipeTimeCommentPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value;
    // return `${value.slice(8,10)}.${value.slice(5,7)}.${value.slice(0,4)}, ${value.slice(11,13)}:${value.slice(14,16)}`;
  }

}
