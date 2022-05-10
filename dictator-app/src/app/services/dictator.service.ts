import { Injectable } from '@angular/core';
import { Dictator } from '../classes/dictator';

@Injectable({
  providedIn: 'root'
})
export class DictatorService {
  constructor() { }

  dictators : Dictator[] = [];

  addDictator(dictator: Dictator) : boolean{
    let dictatorFullName : string = dictator.firstName + "-" + dictator.lastName;
    
    // Checks if fullName is empty
    if (dictatorFullName.length == 0){
      return false;
    }
    // Checks if dictator already exist
    if (this.getDictator(dictatorFullName) != null){
      return false;
    }

    this.dictators.push(dictator);
    return true;
  }

  removeDictator(fullName : string){
    let index : number = this.getDictatorIndexByFullName(fullName);
    if (index != -1){
      this.dictators.splice(index, 1);
    }
  }

  getDictator(fullName : string) : Dictator | null{
    let index : number = this.getDictatorIndexByFullName(fullName);
    return index != -1 ? this.dictators[index] : null;
  }

  getDictatorIndexByFullName(fullName : string) : number{
    for (let i = 0; i < this.dictators.length; i++){
      let dictator : Dictator = this.dictators[i];
      let fullNameOfDictatorToCheck = dictator.firstName + "-" + dictator.lastName;
      if (fullNameOfDictatorToCheck == fullName){
        return i;
      }
    }
    return -1;
  }
}
