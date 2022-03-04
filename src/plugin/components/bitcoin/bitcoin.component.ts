import {Component, OnDestroy, OnInit} from '@angular/core';
import {TabsSetService} from "../../services/tabs-set.service";
import {ReplaySubject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
    selector: 'app-bitcoin',
    templateUrl: './bitcoin.component.html'
})
export class BitcoinComponent implements OnInit, OnDestroy {
    editing = {};
    rows = [];

    destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

    constructor(private apiService: TabsSetService) {
    }

    ngOnInit(): void {
        this.apiService.getBitcoinCurrentPrice()
            .pipe(takeUntil(this.destroy))
            .subscribe(res => {
            console.log(res)
        })
    }

    ngOnDestroy(): void {
        this.destroy.next(null);
        this.destroy.complete();
    }

    updateValue(event, cell, rowIndex) {
        console.log('inline editing rowIndex', rowIndex);
        this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = event.target.value;
        this.rows = [...this.rows];
        console.log('UPDATED!', this.rows[rowIndex][cell]);
    }

}
