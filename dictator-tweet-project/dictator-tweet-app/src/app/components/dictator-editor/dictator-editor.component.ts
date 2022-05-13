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
  dictator: Dictator = {};
  private _selectedDictatorName: string = "";
 
  @Input()
  set selectedDictatorName(value: string) {
    this._selectedDictatorName = value;

    if (this.selectedDictatorName != ""){
      this.dictatorService.getDictator(this._selectedDictatorName).subscribe((dictator : Dictator) => {
        this.dictator = dictator;
      });
    }
    else{
      this.dictator = {};
    }
  }
  get selectedDictatorName() {
    return this._selectedDictatorName;
  }
}
