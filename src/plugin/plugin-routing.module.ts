import {Routes} from '@angular/router';
import {TabsComponent} from './components/tabs.component';
import {PluginComponent} from './plugin.component';

export const routes: Routes = [
    {
        path: '',
        component: PluginComponent,
        children:
            [
                {path: '', redirectTo: 'tabs', pathMatch: 'full'},
                {path: 'tabs', component: TabsComponent},
            ]
    },
];

