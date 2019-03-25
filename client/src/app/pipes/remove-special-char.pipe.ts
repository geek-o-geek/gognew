import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSpecialChar'
})
export class RemoveSpecialCharPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const plainText = value.replace(/[^\w\s]/gi, '')
    return plainText;
  }

}
