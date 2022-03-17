import { Pipe, PipeTransform } from '@angular/core';
import { Md5 } from 'ts-md5';

@Pipe({
  name: 'emailHash'
})
export class EmailHashPipe implements PipeTransform {

  transform(email: string, ...args: any[]): any {
    return Md5.hashStr(email).toString();
  }

}
