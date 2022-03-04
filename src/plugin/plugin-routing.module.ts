import {Routes} from '@angular/router';
import {TabsSetComponent} from './components/tabs-set.component';
import {PluginComponent} from './plugin.component';

export const routes: Routes = [
    {
        path: '',
        component: PluginComponent,
        children:
            [
                {path: '', redirectTo: 'item', pathMatch: 'full'},
                {path: 'item', component: TabsSetComponent},
            ]
    },
];

