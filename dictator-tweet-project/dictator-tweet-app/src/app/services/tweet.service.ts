import { Injectable } from '@angular/core';
import { TweetWebSocketService } from './tweet-web-socket.service';
import { Tweet } from '../interfaces/tweet';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private tweetWebSocketService : TweetWebSocketService) { }

  getTweetsByAuthor(author : string) : Observable<Tweet[]>{
    let tweets$ = new BehaviorSubject<Tweet[]>([]);
    this.tweetWebSocketService.getTweets().subscribe((tweets : Tweet[]) => 
    {
      let tweetsToReturn : Tweet[] = [];
      for (let tweet of tweets){
        if (tweet.author == author){
          tweetsToReturn.unshift(tweet);
        }
      }
      tweets$.next(tweetsToReturn);
    });
    return tweets$;
  }

  getLatestTweetByAuthor(author : string) : Observable<Tweet>{
    let tweet$ = new BehaviorSubject<Tweet>({});
    this.getTweetsByAuthor(author).subscribe((tweets : Tweet[]) => {
      if (tweets.length > 0){
        tweet$.next(tweets[0]);
      }
    });
    return tweet$;
  }
}
