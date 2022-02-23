import {Component, Inject, OnInit, ViewChild} from '@angular/core';

import {jqxGridComponent} from 'jqwidgets-ng/jqxgrid';

import {CustomerAccountModel} from '../models/customer-account.model';
import {FakeCustomerAccountsService} from '../services/fake-customer-account.service';

@Component({
    selector: 'plugin-item',
    templateUrl: './simple-item.component.html'
})
export class SimpleItemComponent implements OnInit {

    @ViewChild('myGrid') myGrid: jqxGridComponent;
    public requestsCnt = 0;
    public errReqLog = '';
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
    columns: any[] = [
        {
            text: 'Тип аккаунта',
            dataField: 'ACCOUNT_TYPES',
            width: 125,
            columnType: 'dropdownList',
            createEditor: (row: number, value: any, editor: any): void =>
                editor.jqxDropDownList({
                    autoDropDownHeight: true,
                }),
            filterType: 'list',
            filterItems: ['0', '1']
        },
        {text: 'Язик', dataField: 'Lang', width: 75, columnType: 'dropdowns', search: false, sortable: false, filterable: false},
        {text: 'Внешний ID', dataField: 'IsExternalID', width: 100, search: false, sortable: false, filterable: false}, // ???
        {text: 'Имя', dataField: 'CLIENT_NAME', width: 200},
        {text: 'Контракти', dataField: 'CLIENT_CONTRACT', width: 150},
        {text: 'ОКПО', dataField: 'CLI_OKPO', width: 100},
        {text: 'ID Абонента', dataField: 'ABN_ID', width: 100, search: false, sortable: false, filterable: false},
        {
            text: 'Аккаунт закрит',
            dataField: 'ACCOUNT_STATUS_CLOSED',
            width: 100,
            columnType: 'checkbox',
            cellBeginEdit: this.cellBeginEdit, search: false, sortable: false, filterable: false
        }, // ???
        {text: 'ID Аккаунта', dataField: 'ACCOUNT_ID', width: 75, search: false, sortable: false, filterable: false},
        {text: 'Аккаунт', dataField: 'ACCOUNT', width: 100},
        {text: 'Номер', dataField: 'BILL_NO', width: 100, search: false, sortable: false, filterable: false}, // ???

    ];
    private rowsToUpdate: Array<CustomerAccountModel> = new Array<CustomerAccountModel>();
    private rowsToCreate: Array<CustomerAccountModel> = new Array<CustomerAccountModel>();
    private rowsToDelete: Array<CustomerAccountModel> = new Array<CustomerAccountModel>();

    //#region init grid
    private nowEditRow = -1;
    private isNewRow = false;
    private isDelRow = false;

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

    renderGridRows = (params: any): any => {
        return params.data;
    }

    beforeLoadComplete(records: any): any {
        for (const key in records) {
            if (records.hasOwnProperty(key)) {
                const record = records[key];
                record.status_metadata = record.status == null ? 'null' : record.status;
            }
        }
        return records;
    }

    getCustomerAccountsSource(array?: Array<any>) {
        return {
            datatype: 'json',
            dataFields: this.fields,
            localData: array,
        };
    }

    cellBeginEdit(row: number, dataField: string, columnType: any, value: any): boolean {
        return this.nowEditRow === row;
    }

    //#endregion

    //#region logic

    rowSelect(event: any): void {
        this.nowEditRow = event.args.rowindex;
        console.log('edit row ' + this.nowEditRow);
    }

    rowUnSelect(event: any): void {
        if (this.nowEditRow !== -1) {
            this.myGrid.endrowedit(this.nowEditRow, false);

            if (!this.isDelRow) {
                (this.isNewRow ? this.rowsToCreate : this.rowsToUpdate).push(this.myGrid.getrows()[this.nowEditRow]);
            } else {
                this.isDelRow = false;
            }

            console.log(`End edit row ${event.args.rowindex}`);

            this.nowEditRow = -1;
            this.isNewRow = false;
        }
    }

    addRowBtnClick = () => {
        this.nowEditRow = 0;
        this.isNewRow = true;
        this.myGrid.addrow(0, new CustomerAccountModel(), 0);
        this.myGrid.beginrowedit(this.nowEditRow);
        console.log('add row btn');
    }

    delRowBtnClick = () => {
        console.log('del btn ', this.nowEditRow);
        if (this.nowEditRow === -1) {
            return;
        }
        this.rowsToDelete.push(this.myGrid.getrows()[this.nowEditRow]);
        this.isDelRow = true;
        this.saveBtnClick();
    }

    saveBtnClick = () => {

        if (this.nowEditRow !== -1) {
            this.myGrid.unselectrow(this.nowEditRow);
        }
        console.log('Save Change btn');

        console.log('this.rowsToCreate ', this.rowsToCreate);
        console.log('this.rowsToUpdate ', this.rowsToUpdate);
        console.log('this.rowsToDelete ', this.rowsToDelete);

        this.rowsToCreate.forEach(element => {
            this.requestsCnt++;
            this.customerAccountsService.createCustomerAccount(element).subscribe(
                request => this.okRequestAction('createCustomerAccounts', request),
                error => this.okRequestAction('createCustomerAccounts', error)
            );
        });
        this.rowsToCreate = [];

        this.rowsToUpdate.forEach(element => {
            this.requestsCnt++;
            this.customerAccountsService.updateCustomerAccount(element).subscribe(
                request => this.okRequestAction('updateCustomerAccounts', request),
                error => this.okRequestAction('updateCustomerAccounts', error)
            );
        });
        this.rowsToUpdate = [];

        this.rowsToDelete.forEach(element => {
            this.requestsCnt++;
            this.customerAccountsService.deleteCustomerAccount(element.ABN_ID).subscribe(
                request => this.okRequestAction('deleteCustomerAccounts', request),
                error => this.okRequestAction('deleteCustomerAccounts', error)
            );
        });
        this.rowsToDelete = [];
        this.myGrid.updatebounddata();
    }

    okRequestAction(actionName: string, req: any): void {
        if (req.id > 0) {
            console.log(actionName + ' ', req);
            this.requestsCnt--;
            this.myGrid.updatebounddata();
        } else {
            this.errRequestAction(actionName, req);
        }
    }

    errRequestAction(actionName: string, req: any): void {
        console.log(actionName + ' err ', req);
        this.errReqLog += req;
        this.requestsCnt--;
        this.myGrid.updatebounddata();
    }

    renderToolbar = (toolbar: any): void => {
        const container = document.createElement('div');

        container.style.margin = '5px';

        const buttonContainer1 = document.createElement('div');
        const buttonContainer2 = document.createElement('div');
        const buttonContainer3 = document.createElement('div');

        buttonContainer1.id = 'buttonContainer1';
        buttonContainer2.id = 'buttonContainer2';
        buttonContainer3.id = 'buttonContainer3';

        buttonContainer1.style.cssText =
            buttonContainer2.style.cssText =
                buttonContainer3.style.cssText = 'float: right; margin-left: 10px; margin-right: 10px;';

        container.appendChild(buttonContainer1);
        container.appendChild(buttonContainer2);
        container.appendChild(buttonContainer3);

        toolbar[0].appendChild(container);

        const addRowButton = jqwidgets
            .createInstance('#buttonContainer1', 'jqxButton', {width: 105, value: 'Add New Row'});
        const saveChangeButton = jqwidgets
            .createInstance('#buttonContainer2', 'jqxButton', {width: 105, value: 'Save Change'});
        const deleteRowButton = jqwidgets
            .createInstance('#buttonContainer3', 'jqxButton', {width: 105, value: 'Delete select row'});

        addRowButton.addEventHandler('click', this.addRowBtnClick);
        saveChangeButton.addEventHandler('click', this.saveBtnClick);
        deleteRowButton.addEventHandler('click', this.delRowBtnClick);

    }
}
