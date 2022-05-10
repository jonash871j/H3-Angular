import { Pipe, PipeTransform } from '@angular/core';
import { Md5 } from 'ts-md5';
import { MorseConverter } from '../classes/morse-converter';

@Pipe({
  name: 'text'
})
export class TextPipe implements PipeTransform {
  transform(value: string, text: string) : string {
    if (text == "morse"){
      return MorseConverter.convertTextToMorse(value.toUpperCase());
    }
    else if (text == "md5"){
      return Md5.hashStr(value);
    }
    return "error";
  }
}
