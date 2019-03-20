import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ucfirst'
})
export class UcfirstPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value) return;
    return value.charAt(0).toUpperCase() + value.slice(1, value.length);
  }

}
