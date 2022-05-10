import { Component, Pipe } from '@angular/core';
import { TextPipe } from './pipes/text.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'piping-app';
  inputText : string = "";
}
