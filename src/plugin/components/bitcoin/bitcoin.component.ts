import { Component, Inject, OnInit } from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {TabsSetService} from '../../services/tabs-set.service';
import {DatePipe} from '@angular/common';
import {takeUntil} from 'rxjs/operators';
import {ColumnMode} from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-bitcoin',
  templateUrl: './bitcoin.component.html',
  styleUrls: ['./bitcoin.component.scss']
})
export class BitcoinComponent implements OnInit {
  isLoading = false;
  rows = [];
  columns = [{prop: 'name'}, {name: 'EUR'}, {name: 'GBP'}, {name: 'USD'}, {name: 'Updated'}];
  ColumnMode = ColumnMode;
  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);
  constructor(
    @Inject(TabsSetService) private apiService: TabsSetService, 
    @Inject(DatePipe) private datePipe: DatePipe) {
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.apiService.getBitcoinCurrentPrice()
      .pipe(takeUntil(this.destroy))
      .subscribe(res => {
        this.rows.push({
          name: 'Bitcoin',
          eur: res.bpi.EUR.rate,
          gbp: res.bpi.GBP.rate,
          usd: res.bpi.USD.rate,
          updated: this.datePipe.transform(res.time.updated, 'yyyy-MM-dd HH:MM')
        });
        console.log(this.rows);
        this.isLoading = false;
      });
  }
  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

}
