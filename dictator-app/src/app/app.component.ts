import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Dictator } from './classes/dictator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
 constructor(private fb: FormBuilder){}

  title = 'dictator-app';
  dictatorData = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    isDead: ['', Validators.required],
    yearOfBirth: ['', Validators.required],
    yearOfDeath: ['', Validators.required],
    description: ['', Validators.required],
    dictatorList: [ '' ]
 });
 dictators : Dictator[] = [];
 selectedDictatorIndex : number = 0;

  addDictator() {
    let dictator : Dictator = { 
      firstName: this.dictatorData.get('firstName')?.value,
      lastName : this.dictatorData.get('lastName')?.value,
      isDead : this.dictatorData.get('isDead')?.value,
      yearOfBirth : this.dictatorData.get('yearOfBirth')?.value,
      yearOfDeath : this.dictatorData.get('yearOfDeath')?.value,
      description : this.dictatorData.get('description')?.value 
    };

    let dictatorFullName : string = dictator.firstName + " " + dictator.lastName;
    if (this.getIndexOfByFullName(dictatorFullName) != -1){
      return;
    }

    this.dictators.push(dictator);
  }

  selectedDictator() {
    let fullName = this.dictatorData.get('dictatorList')?.value;
    this.selectedDictatorIndex = this.getIndexOfByFullName(fullName);
  }

  getIndexOfByFullName(fullName : string) : number{
    for (let i = 0; i < this.dictators.length; i++){
      let dictator : Dictator = this.dictators[i];
      let fullNameOfDictatorToCheck = dictator.firstName + " " + dictator.lastName;
      if (fullNameOfDictatorToCheck == fullName){
        return i;
      }
    }
    return -1;
  }
}
