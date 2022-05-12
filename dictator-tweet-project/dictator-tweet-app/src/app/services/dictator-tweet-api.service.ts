import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dictator } from '../interfaces/dictator';

@Injectable({
  providedIn: 'root'
})
export class DictatorTweetAPIService {
  constructor(private http: HttpClient) {}

  dictators : Observable<Dictator[]> = new Observable;
  baseUrl: string = "https://localhost:5001/api";

  getDictators() : Observable<Dictator[]>{
    return this.http.get<Dictator[]>(this.baseUrl + "/dictator");
  }

  createDictator(dictator: Dictator){
    this.http.post(this.baseUrl + "/dictator", dictator).subscribe();
  }
}
