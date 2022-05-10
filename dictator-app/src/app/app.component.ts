import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Dictator } from './classes/dictator';
import { DictatorService } from './services/dictator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
 constructor(private fb: FormBuilder, dictatorService: DictatorService)
 {
  this.dictatorService = dictatorService;
 }

  title = 'dictator-app';
  dictatorForm = this.fb.group({
    firstName: '',
    lastName: '',
    yearOfBirth: '',
    yearOfDeath: '',
    description: '',
    dictatorList: ''
  });
  dictatorService : DictatorService;
  selectedDictator : Dictator | null = null;

  addDictator() {
    let dictator : Dictator = { 
      firstName: this.dictatorForm.get('firstName')?.value,
      lastName : this.dictatorForm.get('lastName')?.value,
      yearOfBirth : this.dictatorForm.get('yearOfBirth')?.value,
      yearOfDeath : this.dictatorForm.get('yearOfDeath')?.value,
      description : this.dictatorForm.get('description')?.value 
    };

    let isAdded : boolean = this.dictatorService.addDictator(dictator);
    if (!isAdded){
      alert("Failed to add dictator");
    }
  }

  selectedDictatorChanged() {
    let fullName = this.dictatorForm.get('dictatorList')?.value;
    this.selectedDictator = this.dictatorService.getDictator(fullName);
  }

  removeDictator(){
    let fullName = this.dictatorForm.get('dictatorList')?.value;
    this.dictatorService.removeDictator(fullName);
  }
}
