import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class TabsSetService {

    constructor(private httpClient: HttpClient) {
    }

    getBitcoinCurrentPrice(): Observable<any> {
        return this.httpClient.get<any>('https://api.coindesk.com/v1/bpi/currentprice.json');
    }

    getMargaritas(): Observable<any> {
        return this.httpClient.get<any>('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');
    }
}
