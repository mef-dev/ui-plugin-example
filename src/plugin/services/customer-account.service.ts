import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {environment} from 'src/environments/environment';
import {CustomerAccountModel} from '../models/customer-account.model';
import {BaseEntity} from '../models/base-entity.model';
import {Endpoints} from '../endpoints/base-endpoints';
import {StringExt} from '../utils/string-ext.util';

@Injectable()
export class CustomerAccountsService {
    baseUrl: string;
    private headers: HttpHeaders = new HttpHeaders(
        environment.production ?
            {withCredentials: 'true'} :
            {});

    constructor(
        @Inject('BASE_URL') baseUrl: string,
        @Inject(HttpClient) private http: HttpClient
    ) {
        this.baseUrl = baseUrl;
    }

    public getCustomerAccountsByModel(params: any): Observable<CustomerAccountModel[]> {
        return this.http.get<object>(
            `${this.baseUrl}${Endpoints.getCustomerAccounts
            }?page=1&pagesize=1000&filter=${JSON.stringify(
                params
            )}&hateoas=false`,
            {headers: this.headers})
            .pipe(map(data => data[`data`].map(dataItem => new CustomerAccountModel().deserialize(dataItem))));
    }

    public createCustomerAccount(model: CustomerAccountModel) {

        const body: BaseEntity = {
                Id: '',
                Name: model.CLIENT_NAME,
                ParentId: '',
                Format: 'json',
                Lang: 'uk',
                IsCoerced: true,
                CustomAttributes: {}
            };

        return this.http.post(`${this.baseUrl}${Endpoints.createCustomerAccount}`, body,
            {headers: this.headers});
    }

    public updateCustomerAccount(model: CustomerAccountModel) {
        const body: BaseEntity = {
                Id: model.ABN_ID.toString(),
                Name: model.CLIENT_NAME,
                ParentId: '',
                Format: 'json',
                Lang: 'uk',
                IsCoerced: true,
                CustomAttributes: {}
            };

        return this.http.put(`${this.baseUrl}${StringExt.Format(Endpoints.setCustomerAccount, model.ABN_ID)}`,
            body, {headers: this.headers});
    }

    public deleteCustomerAccount(ABN_ID: number) {
        return this.http.delete(`${this.baseUrl}${StringExt.Format(Endpoints.deleteCustomerAccount, ABN_ID)}`,
            {headers: this.headers});
    }
}


