import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dictator } from 'src/app/interfaces/dictator';
import { Tweet } from 'src/app/interfaces/tweet';
import { DictatorService } from 'src/app/services/dictator.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute, 
    private dictatorService : DictatorService, 
    private tweetService : TweetService) { }

  dictator : Dictator = {}; 
  tweets : Tweet[] = []

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.dictatorService.getDictator(params['dictator']).subscribe((dictator : Dictator) => {
        this.dictator = dictator;
        this.updateTweets();
      });
    });
  }

  updateTweets(){
    let dictatorFullName : string = this.dictator.firstName + " " + this.dictator.lastName;
    this.tweetService.getTweetsByAuthor(dictatorFullName).subscribe((tweets : Tweet[]) => {
      this.tweets = tweets;
    });
  }
}
