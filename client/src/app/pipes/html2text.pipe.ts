import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'html2text'
})
export class Html2textPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const plainText = value.replace(/<[^>]*>/g, '')
    return plainText;
  }

}
