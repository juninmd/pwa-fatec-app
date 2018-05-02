import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the OrderByPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'orderby',
})
export class OrderByPipe implements PipeTransform {
  transform(array: Array<any>, args: string): Array<any> {
    array.sort((a: any, b: any) => {
      if (a[args] < b[args]) {
        return 1;
      } else if (a[args] > b[args]) {
        return -1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
