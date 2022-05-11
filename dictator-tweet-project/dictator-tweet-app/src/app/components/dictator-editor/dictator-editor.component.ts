import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dictator-editor',
  templateUrl: './dictator-editor.component.html',
  styleUrls: ['./dictator-editor.component.css']
})
export class DictatorEditorComponent implements OnInit {

  constructor() { }
  @Input() isEditMode : boolean = false;

  ngOnInit(): void {
  }
}
