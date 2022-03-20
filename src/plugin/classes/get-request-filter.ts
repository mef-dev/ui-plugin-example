import {FilteredColum} from './filtered-colum';

export class Filter {
    filterFields: Array<FilteredColum>;
    sortFieldName: string;
    sortOrder: string;

    constructor(params: any) {
        this.filterFields = this.FilteredColumnsFromJQPParams(params);
        this.sortFieldName = params[`sortDataField`];
        this.sortOrder = params[`sortOrder`];
    }

    private FilteredColumnsFromJQPParams(params: any): Array<FilteredColum> {
        const arr = new Array<FilteredColum>();

        const props = Object.keys(params);
        let filterNumber = 0;

        while (props.find(prop => prop.toString() === `filterCondition${filterNumber}`.toString())) {
            const filter = new FilteredColum();
            filter.columName = params[`filterDataField${filterNumber}`];
            filter.condition = params[`filterCondition${filterNumber}`];
            filter.value = params[`filterValue${filterNumber}`];

            arr.push(filter);
            filterNumber++;
        }

        return arr;
    }
}
