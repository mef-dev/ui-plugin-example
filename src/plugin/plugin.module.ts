import {BrowserModule} from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {jqxGridModule} from 'jqwidgets-ng/jqxgrid';
import {jqxDateTimeInputModule} from 'jqwidgets-ng/jqxdatetimeinput';
import {jqxDropDownListModule} from 'jqwidgets-ng/jqxdropdownlist';
import {jqxChartModule} from 'jqwidgets-ng/jqxchart';

import {TranslateModule} from '@ngx-translate/core';
import {PLUGIN_VERSION} from 'src/environments/version';

import {PluginComponent} from './plugin.component';
import {SimpleItemComponent} from './components/simple-item.component';
import {CustomerAccountsService} from './services/customer-account.service';
import {FakeCustomerAccountsService} from './services/fake-customer-account.service';
import {PluginRoutes, devMode} from './plugin.routing';

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
    PluginRoutes
];

if (devMode) {
    importsModules.push(BrowserModule);
}

@NgModule({
    imports: importsModules,
    declarations: [PluginComponent, SimpleItemComponent],
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
