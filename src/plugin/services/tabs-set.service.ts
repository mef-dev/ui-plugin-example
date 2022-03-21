import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class TabsSetService {
  
  constructor(
    @Inject(HttpClient) private http: HttpClient
  ) {
  }
  
  public getBitcoinCurrentPrice(): Observable<any> {
    return this.http.get<any>('https://api.coindesk.com/v1/bpi/currentprice.json');
  }
  
  public getMargaritas(): Observable<any> {
    return this.http.get<any>('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');
  }
}
