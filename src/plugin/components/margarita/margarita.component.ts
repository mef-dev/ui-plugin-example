import {Component, OnInit} from '@angular/core';
import {TabsSetService} from "../../services/tabs-set.service";
import {takeUntil} from "rxjs/operators";
import {ReplaySubject} from "rxjs";

@Component({
    selector: 'app-margarita',
    templateUrl: './margarita.component.html'
})
export class MargaritaComponent implements OnInit {

    destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

    constructor(private apiService: TabsSetService) {
    }

    ngOnInit(): void {
        this.apiService.getMargaritas()
            .pipe(takeUntil(this.destroy))
            .subscribe(res => {
            console.log(res)
        })
    }

    ngOnDestroy(): void {
        this.destroy.next(null);
        this.destroy.complete();
    }
}
