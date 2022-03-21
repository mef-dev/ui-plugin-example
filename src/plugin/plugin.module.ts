import {BrowserModule} from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {jqxGridModule} from 'jqwidgets-ng/jqxgrid';
import {jqxDateTimeInputModule} from 'jqwidgets-ng/jqxdatetimeinput';
import {jqxDropDownListModule} from 'jqwidgets-ng/jqxdropdownlist';
import {jqxChartModule} from 'jqwidgets-ng/jqxchart';

import {TranslateModule} from '@ngx-translate/core';
import {PLUGIN_VERSION} from 'src/environments/version';

import {PluginComponent} from './plugin.component';
import {TabsComponent} from './components/tabs.component';
import {PluginRoutes, devMode} from './plugin.routing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { MargaritaComponent } from './components/margarita/margarita.component';
import {TabsSetService} from './services/tabs-set.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BitcoinComponent } from './components/bitcoin/bitcoin.component';
import { ExampleComponent } from './components/example/example.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

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
    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    NgxDatatableModule,
    PluginRoutes
];

if (devMode) {
    importsModules.push(BrowserModule);
}

@NgModule({
    imports: importsModules,
    declarations: [PluginComponent, TabsComponent, MargaritaComponent, BitcoinComponent, ExampleComponent],
    providers: [
        HttpClient,
        TabsSetService,
        DatePipe,
        {
            provide: PLUGIN_VERSION.name,
            useValue: PluginComponent,
        }
    ],
    bootstrap: [PluginComponent],
})
export class PluginTabsModule {
}
