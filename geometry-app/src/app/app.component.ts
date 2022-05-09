import { Component } from '@angular/core';
import { Parallelogram } from './classes/parallelogram';
import { Rectangle } from './classes/rectangle';
import { Trapeze } from './classes/trapeze';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'geometry-app';
  rectangle = new Rectangle(0, 0);
  trapeze = new Trapeze(0, 0, 0);
  parallelogram = new Parallelogram(0, 0, 0);
}
