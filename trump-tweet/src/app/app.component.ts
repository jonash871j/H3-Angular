import { Component } from '@angular/core';
import { TrumpTweetsService, TweetFilter } from './services/trump-tweets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
constructor(trumpTweetService : TrumpTweetsService){
  this.trumpTweetService = trumpTweetService;
}

  title = 'trump-tweet';
  trumpTweetService : TrumpTweetsService;
  tweetFilter : TweetFilter = TweetFilter.All;
}
