import { Component, Input, OnInit } from '@angular/core';
import { Dictator } from 'src/app/interfaces/dictator';
import { DictatorService } from 'src/app/services/dictator.service';


@Component({
  selector: 'app-dictator-editor',
  templateUrl: './dictator-editor.component.html',
  styleUrls: ['./dictator-editor.component.css']
})
export class DictatorEditorComponent implements OnInit {

  constructor(private dictatorService : DictatorService) { }
  @Input() selectedDictatorName : string = "";
  dictator: Dictator = {};

  ngOnInit(): void {
  }

  createDictator(){
    this.dictatorService.createDictator(this.dictator);
  }
}
