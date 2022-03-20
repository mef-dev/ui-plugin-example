import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {PluginTabsModule} from './plugin/plugin.module';
import {environment} from './environments/environment';

export {PluginTabsModule} from './plugin/plugin.module';
export function getBaseUrl() {
    return environment.apiUrl; // document.getElementsByTagName("base")[0].href;
}

const providers = [{provide: 'BASE_URL', useFactory: getBaseUrl, deps: []}];

platformBrowserDynamic(providers)
    .bootstrapModule(PluginTabsModule)
    .catch((err) => console.log(err));
