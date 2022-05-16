import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from 'src/app/interfaces/tweet';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent {
  private _tweet : Tweet | null = {};
 
  @Input()
  set tweet(tweet: Tweet | null) {
    if (tweet != null){
      this._tweet = tweet;
    }
    else{
      this._tweet = {}
    }
  }
  get tweet() {
    return this._tweet;
  }
}
