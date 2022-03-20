import {RouterModule} from '@angular/router';
import {routes} from './plugin-routing.module';

export const PluginRoutes = RouterModule.forChild(routes);
export const devMode = false;
