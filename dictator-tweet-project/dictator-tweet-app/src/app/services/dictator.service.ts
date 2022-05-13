import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subscription, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Dictator } from '../interfaces/dictator';
import { DictatorTweetAPIService } from './dictator-tweet-api.service';

@Injectable({
  providedIn: 'root'
})
export class DictatorService {
  constructor(private dictatorTweetAPIService: DictatorTweetAPIService) {}
  dictators$ = new BehaviorSubject<Dictator[]>([]);

  getDictators() : BehaviorSubject<Dictator[]>{
    this.updateDictators();
    return this.dictators$;
  }

  getDictator(fullName : string): Observable<Dictator>{
    return this.dictatorTweetAPIService.getDictator(fullName);
  }

  createDictator(dictator: Dictator){
    this.dictatorTweetAPIService.createDictator(dictator).subscribe((isCreated : boolean) => {
      if (isCreated){
        this.updateDictators();
      }
    });
  }

  updateDictator(fullName : string, dictator: Dictator){
    this.dictatorTweetAPIService.updateDictator(fullName, dictator).subscribe((isCreated : boolean) => {
      if (isCreated){
        this.updateDictators();
      }
    });
  }

  deleteDictator(fullName : string){
    this.dictatorTweetAPIService.deleteDictator(fullName).subscribe((isCreated : boolean) => {
      if (isCreated){
        this.updateDictators();
      }
    });
  }

  updateDictators(){
    this.dictatorTweetAPIService.getDictators().subscribe((dictators : Dictator[]) => {
      this.dictators$.next(dictators);
    });
  }
}
