import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';

import {environment} from 'src/environments/environment';
import {Endpoints} from '../endpoints/base-endpoints';
import {CustomerAccountModel} from '../models/customer-account.model';
import {BaseEntity} from '../models/base-entity.model';

@Injectable()
export class FakeCustomerAccountsService {
    url: string;
    baseUrl: string;
    accounts: CustomerAccountModel[] = [{Id: '1', ACCOUNT: 'Demo'} as CustomerAccountModel];
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

    public getCustomerAccountsByModel(params?: any): Observable<any> { // CustomerAccountModel[]
        return this.ok(this.accounts);
    }

    public createCustomerAccount(model: CustomerAccountModel) {

        const body: BaseEntity =
            {
                Id: '',
                Name: model.CLIENT_NAME,
                ParentId: '',
                Format: 'json',
                Lang: 'uk',
                IsCoerced: true,
                CustomAttributes: {}
            };
        this.accounts.push(model);

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

        return this.ok();
    }

    public deleteCustomerAccount(ABN_ID: number) {
        return this.ok();
    }

    ok(body?) {
        return of(body);
    }
}
