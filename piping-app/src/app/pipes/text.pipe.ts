import { Pipe, PipeTransform } from '@angular/core';
import { Md5 } from 'ts-md5';

@Pipe({
  name: 'text'
})
export class TextPipe implements PipeTransform {
  morseTableOffsetIndex : number = 48;
  morseTable = [
    // 0 - 9 : ascii 48 - 57
    "-----", ".----", "..---", "...--", "....-",
    ".....", "-....", "--...", "---..", "----.",

    // dont care : ascii 58 - 64
    "","","","","","","",

    // A - Z : ascii 65 - 90
    ".-", "-...", "-.-.", "-..", ".", 
    "..-.", "--.", "....", "..", ".---", 
    "-.-", ".-..", "--","-.", "---", 
    ".--.", "--.-", ".-.", "...", 
    "-", "..-", "...-", ".--", 
    "-..-", "-.--", "--.."
  ];

  transform(value: string, text: string) : string {
    if (text == "morse"){
      return this.convertToMorse(value.toUpperCase());
    }
    else if (text == "md5"){
      return this.convertToMD5(value);
    }
    return "error";
  }

  convertToMorse(value : string) : string{
    let morse : string = "";
    for (let i = 0; i < value.length; i++){
      let character : string = value[i];
      let characterAsciiValue : number = character.charCodeAt(0);
      if (characterAsciiValue >= 48 && characterAsciiValue <= 90)
      {
        morse += this.morseTable[characterAsciiValue - this.morseTableOffsetIndex] + "/";
      }
    }
    return morse;
  }

  convertToMD5(value : string) : string{
    return Md5.hashStr(value);
  }
}
