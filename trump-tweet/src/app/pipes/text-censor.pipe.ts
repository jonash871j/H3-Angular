import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textCensor'
})
export class TextCensorPipe implements PipeTransform {

  transform(text: string, badWords: string[]): string {
    for (let i = 0; i < badWords.length; i++){
      let badWord : string = badWords[i];
      let wordWithoutStartCharacter : string = badWord.substring(1);
      text = this.censorWord(text, badWord[0].toUpperCase() + wordWithoutStartCharacter);
      text = this.censorWord(text, badWord[0].toLowerCase() + wordWithoutStartCharacter);
    }
    return text;
  }

  censorWord(text : string, badWord : string) : string{
    while(text.indexOf(badWord) != -1){
      let censoredWord = badWord[0];
      for (let i = 0; i < badWord.length -1; i++){
        censoredWord += "*";
      }
      text = text.replace(badWord, censoredWord);
    }
    return text;
  }
}
