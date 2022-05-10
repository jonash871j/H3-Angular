export class MorseConverter {
    private static morseTableOffsetIndex : number = 48;
    private static morseTable = [
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

    static convertTextToMorse(text : string) : string{
        let morse : string = "";
        for (let i = 0; i < text.length; i++){
          let character : string = text[i];
          let characterAsciiValue : number = character.charCodeAt(0);
          if (characterAsciiValue >= 48 && characterAsciiValue <= 90)
          {
            morse += this.morseTable[characterAsciiValue - this.morseTableOffsetIndex] + "/";
          }
        }
        return morse;
    }
}
