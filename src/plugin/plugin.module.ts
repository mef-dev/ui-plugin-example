import {BrowserModule} from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";

import {jqxGridModule} from 'jqwidgets-ng/jqxgrid';
import {jqxDateTimeInputModule} from 'jqwidgets-ng/jqxdatetimeinput';
import {jqxDropDownListModule} from 'jqwidgets-ng/jqxdropdownlist';
import {jqxChartModule} from 'jqwidgets-ng/jqxchart';

import {TranslateModule} from '@ngx-translate/core';
import {PLUGIN_VERSION} from 'src/environments/version';

import {PluginComponent} from './plugin.component';
import {TabsSetComponent} from './components/tabs-set.component';
import {CustomerAccountsService} from './services/customer-account.service';
import {FakeCustomerAccountsService} from './services/fake-customer-account.service';
import {PluginRoutes} from './plugin.routing';
import {BitcoinComponent} from './components/bitcoin/bitcoin.component';
import {MargaritaComponent} from './components/margarita/margarita.component';
import {ExampleComponent} from './components/example/example.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";

export const SETTINGS = new InjectionToken('SETTINGS');

const importsModules: any[] = [
    CommonModule,
    FormsModule,
    TranslateModule,
    jqxGridModule,
    jqxDateTimeInputModule,
    jqxDropDownListModule,
    jqxChartModule,
    HttpClientModule,
    MatTabsModule,
    NgxDatatableModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    PluginRoutes
];



@NgModule({
    imports: [
        importsModules
    ],
    declarations: [
        PluginComponent,
        TabsSetComponent,
        BitcoinComponent,
        MargaritaComponent,
        ExampleComponent
    ],
    providers: [
        HttpClient,
        DatePipe,
        {
            provide: PLUGIN_VERSION.name,
            useValue: PluginComponent,
        },
        CustomerAccountsService,
        FakeCustomerAccountsService
    ],
    bootstrap: [PluginComponent],
})
export class PluginBaseModule {
}
