import { Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dictator-tweet-app';

  ngOnInit(): void {
    const subject = webSocket('ws://192.168.0.16:81');
    subject.subscribe({
      next: msg => console.log('message received: ' + JSON.stringify(msg)), // Called whenever there is a message from the server.
      error: err => console.log('error: ' + JSON.stringify(err, ["message", "arguments", "type", "name"])), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
    });
    let timer = setInterval(() => {
      subject.next('Hello World');
    }, 1000);
  }
}
