import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dictator } from '../interfaces/dictator';

@Injectable({
  providedIn: 'root'
})
export class DictatorTweetAPIService {
  constructor(private http: HttpClient) {}

  private baseUrl: string = "https://localhost:5001/api";

  getDictators() : Observable<Dictator[]>{
    return this.http.get<Dictator[]>(this.baseUrl + "/dictator");
  }

  getDictator(fullName : string) : Observable<Dictator>{
    return this.http.get<Dictator>(this.baseUrl + "/dictator/" + fullName);
  }

  createDictator(dictator: Dictator) : Observable<boolean>{
    return this.http.post<boolean>(this.baseUrl + "/dictator", dictator);
  }

  updateDictator(fullName : string, dictator : Dictator) : Observable<boolean>{
    return this.http.put<boolean>(this.baseUrl + "/dictator/" + fullName, dictator);
  }

  deleteDictator(fullName : string) : Observable<boolean>{
    return this.http.delete<boolean>(this.baseUrl + "/dictator/" + fullName);
  }
}
