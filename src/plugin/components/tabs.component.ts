import {Component, Inject, OnInit, ViewChild} from '@angular/core';

import {jqxGridComponent} from 'jqwidgets-ng/jqxgrid';

import {FakeCustomerAccountsService} from '../services/fake-customer-account.service';

@Component({
    selector: 'plugin-item',
    templateUrl: './tabs.component.html'
})
export class TabsComponent implements OnInit {
    @ViewChild('myGrid') myGrid: jqxGridComponent;
    baseUrl: string;
    loadProcess: boolean;
    fields: Array<any> = [
        {name: 'ACCOUNT_TYPES', type: 'string'},
        {name: 'Total', type: 'number'},
        {name: 'NUM_QTY', type: 'number'},
        {name: 'Lang', type: 'string'},
        {name: 'IsExternalID', type: 'number'},
        {name: 'CLIENT_NAME', type: 'string'},
        {name: 'CLIENT_CONTRACT', type: 'string'},
        {name: 'CLI_OKPO', type: 'string'},
        {name: 'ABN_ID', type: 'number'},
        {name: 'ACCOUNT_STATUS_CLOSED', type: 'bool'},
        {name: 'ACCOUNT_ID', type: 'number'},
        {name: 'ACCOUNT', type: 'string'},
        {name: 'BILL_NO', type: 'string'},
    ];

    source: any = {
        datatype: 'json',
        dataFields: this.fields,
        sort: () => {
            // update the grid and send a request to the server.
            this.myGrid.updatebounddata('sort');
        },
        filter: () => {
            // update the grid and send a request to the server.
            this.myGrid.updatebounddata('filter');
        }
    };

    dataAdapter: any = new jqx.dataAdapter(this.source, {
        loadServerData: (serverData, source, callback) => {
            console.log('serverData', serverData);
            this.customerAccountsService.getCustomerAccountsByModel(serverData).subscribe(
                req => {
                    callback({records: req, totalRecords: (req[0] != null ? req[0].Total : 0)});
                },
                err => console.log(err)
            );
        }
    });

    constructor(
        @Inject('BASE_URL') baseUrl: string,
        @Inject(FakeCustomerAccountsService) private customerAccountsService: FakeCustomerAccountsService
    ) {
        this.baseUrl = baseUrl;

        this.customerAccountsService.getCustomerAccountsByModel({})
            .subscribe((bankAccounts) => {
                    const accounts: any[] = bankAccounts;
                    accounts.unshift({oneString: ' ', bacId: 0});
                    this.source = this.getCustomerAccountsSource(
                        accounts
                    );
                    this.dataAdapter = new jqx.dataAdapter(
                        this.source
                    );
                },
                () => {
                    this.loadProcess = false;
                }
            );
    }

    ngOnInit() {
    }

    getCustomerAccountsSource(array?: Array<any>) {
        return {
            datatype: 'json',
            dataFields: this.fields,
            localData: array,
        };
    }
}
