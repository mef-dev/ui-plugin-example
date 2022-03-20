// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const productionUrl = ''; // get from your administrator
export const environment = {
    production: true,
    platformName: 'Base plugin',
    apiUrl: `${productionUrl}`,
    serviceName: 'customeraccounts',
};
