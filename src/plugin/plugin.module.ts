import {BrowserModule} from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {jqxGridModule} from 'jqwidgets-ng/jqxgrid';
import {jqxDateTimeInputModule} from 'jqwidgets-ng/jqxdatetimeinput';
import {jqxDropDownListModule} from 'jqwidgets-ng/jqxdropdownlist';
import {jqxChartModule} from 'jqwidgets-ng/jqxchart';
import {TabsModule} from "ngx-bootstrap/tabs";

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
    TabsModule.forRoot(),
    NgxDatatableModule,
    BrowserModule,
    PluginRoutes
];


@NgModule({
    imports: importsModules,
    declarations: [
        PluginComponent,
        TabsSetComponent,
        BitcoinComponent,
        MargaritaComponent,
        ExampleComponent
    ],
    providers: [
        HttpClient,
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
