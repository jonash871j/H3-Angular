import { Component, Input, OnInit } from '@angular/core';
import { Dictator } from 'src/app/interfaces/dictator';
import { DictatorService } from 'src/app/services/dictator.service';


@Component({
  selector: 'app-dictator-editor',
  templateUrl: './dictator-editor.component.html',
  styleUrls: ['./dictator-editor.component.css']
})
export class DictatorEditorComponent {

  constructor(public dictatorService : DictatorService) { }
  
  private _selectedDictatorName: string = "";
  dictator: Dictator = {};
 
  @Input()
  set selectedDictatorName(selectedDictatorName: string) {
    this._selectedDictatorName = selectedDictatorName;
    this.updateDictator();
  }
  get selectedDictatorName() {
    return this._selectedDictatorName;
  }

  private updateDictator(){
    if (this.selectedDictatorName != ""){
      this.dictatorService.getDictator(this.selectedDictatorName).subscribe((dictator : Dictator) => {
        this.dictator = dictator;
      });
    }
    else{
      this.dictator = {};
    }
  }
}
