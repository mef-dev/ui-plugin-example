const pluginName = 'bankfeed';
const natecAlias = 'Bss/';
const bfAlias = 'bf/';
export const Endpoints = {
    getCustomerAccounts: `Entity/${natecAlias}customeraccounts.json`,
    createCustomerAccount: `Entity/${natecAlias}customeraccounts.json`,
    setCustomerAccount: `Entity/${natecAlias}customeraccounts/update/{0}.json`,
    deleteCustomerAccount: `Entity/${natecAlias}customeraccounts/{0}.json`,
};
