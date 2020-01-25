import { Pipe, PipeTransform } from '@angular/core';
import limitContent from '../../directives/max-length-etc/limit-content';

@Pipe({
  name: 'maxLengthEtc'
})
export class MaxLengthEtcPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return limitContent(value, args[0]);
  }

}
