import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Dictator } from '../interfaces/dictator';
import { DictatorTweetAPIService } from './dictator-tweet-api.service';

@Injectable({
  providedIn: 'root'
})
export class DictatorService {
  constructor(private dictatorTweetAPIServoce: DictatorTweetAPIService) {}

  getDictators() : Observable<Dictator[]>{
    return this.dictatorTweetAPIServoce.getDictators();
  }

  createDictator(dictator: Dictator){
    this.dictatorTweetAPIServoce.createDictator(dictator);
  }
}
