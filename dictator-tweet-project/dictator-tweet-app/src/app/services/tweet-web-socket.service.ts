import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { Dictator } from '../interfaces/dictator';
import { Tweet } from '../interfaces/tweet';
import { DictatorService } from './dictator.service';

@Injectable({
  providedIn: 'root'
})
export class TweetWebSocketService {

  constructor() { 
    this.initialize();
  }

  private isInitialized : boolean = false;
  private tweets$ = new BehaviorSubject<Tweet[]>([]);

  getTweets() : Observable<Tweet[]>{
    return this.tweets$;
  }

  private initialize() {
    if (!this.isInitialized){
      const client = webSocket('ws://192.168.0.16:81');
      client.subscribe({
        next: msg => this.tweets$.next(msg as Tweet[]), 
        error: err => console.log('error: ' + JSON.stringify(err, ["message", "arguments", "type", "name"])), 
        complete: () => console.log('complete') 
      });

      setInterval(() => {
        client.next("");
      }, 200);

      this.isInitialized = true;
    }
  }
}
