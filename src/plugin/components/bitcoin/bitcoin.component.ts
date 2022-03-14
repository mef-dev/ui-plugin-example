import {Component, OnDestroy, OnInit} from '@angular/core';
import {TabsSetService} from "../../services/tabs-set.service";
import {ReplaySubject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {ColumnMode} from '@swimlane/ngx-datatable';
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-bitcoin',
    templateUrl: './bitcoin.component.html',
    styleUrls: ['./bitcoin.component.scss']
})
export class BitcoinComponent implements OnInit, OnDestroy {
    isLoading = false;

    rows = [];
    columns = [{prop: 'name'}, {name: 'EUR'}, {name: 'GBP'}, {name: 'USD'}, {name: 'Updated'}];
    ColumnMode = ColumnMode;
    destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

    constructor(private apiService: TabsSetService, private datePipe: DatePipe) {
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
                })
                this.isLoading = false;
            })
    }

    ngOnDestroy(): void {
        this.destroy.next(null);
        this.destroy.complete();
    }
}
