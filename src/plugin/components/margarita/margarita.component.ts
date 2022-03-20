import {Component, Inject, OnDestroy, ViewChild} from '@angular/core';
import {jqxGridComponent} from 'jqwidgets-ng/jqxgrid';
import {FakeCustomerAccountsService} from '../../services/fake-customer-account.service';
import {ReplaySubject} from 'rxjs';
import {TabsSetService} from '../../services/tabs-set.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-margarita',
  templateUrl: './margarita.component.html',
  styleUrls: ['./margarita.component.scss']
})
export class MargaritaComponent implements OnDestroy {
  margaritas = [];
  isLoading = false;
  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);
  
 
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
  
  constructor (
    @Inject('BASE_URL') baseUrl: string,
    @Inject(FakeCustomerAccountsService) private customerAccountsService: FakeCustomerAccountsService,
    private apiService: TabsSetService
  ) {
    this.isLoading = true;
    this.apiService.getMargaritas()
      .pipe(takeUntil(this.destroy))
      .subscribe(res => {
        this.margaritas = res.drinks || [];
        this.isLoading = false;
      });
    
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
  
  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }
  getIngredients(item: any): any {
    const result = [];
    const regexp = new RegExp('strIngredient');
    Object.keys(item).filter(ingredient => regexp.test(ingredient)).forEach((name, i) => {
      if (item[name]) {
        result.push({ingredient: item[name], measure: item['strMeasure' + (i + 1)]});
      }
    });
    return result;
  }
  
  getCustomerAccountsSource(array?: Array<any>) {
    return {
      datatype: 'json',
      dataFields: this.fields,
      localData: array,
    };
  }
}
