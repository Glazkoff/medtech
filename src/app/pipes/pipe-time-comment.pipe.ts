import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeTimeComment'
})
export class PipeTimeCommentPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return `${value.slice(8,10)}.${value.slice(5,7)}.${value.slice(0,4)}, ${value.slice(11,13)}:${value.slice(14,16)}`;
  }

}
