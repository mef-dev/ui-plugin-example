import {Component, OnDestroy} from '@angular/core';
import {TabsSetService} from "../../services/tabs-set.service";
import {takeUntil} from "rxjs/operators";
import {ReplaySubject} from "rxjs";

@Component({
    selector: 'app-margarita',
    templateUrl: './margarita.component.html',
    styleUrls: ['./margarita.component.scss']
})
export class MargaritaComponent implements OnDestroy {
    margaritas = [];
    isLoading = false;
    destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

    constructor(private apiService: TabsSetService) {
        this.isLoading = true;
        this.apiService.getMargaritas()
            .pipe(takeUntil(this.destroy))
            .subscribe(res => {
                this.margaritas = res.drinks;
                this.isLoading = false;
            })
    }

    ngOnDestroy(): void {
        this.destroy.next(null);
        this.destroy.complete();
    }

    getIngredients(item: any): any {
        let result = []
        const regexp = new RegExp('strIngredient');
        Object.keys(item).filter(ingredient => regexp.test(ingredient)).forEach((name, i) => {
            if (item[name]) {
                result.push({ingredient: item[name], measure: item['strMeasure' + (i + 1)]})
            }
        })
        return result;
    }
}
