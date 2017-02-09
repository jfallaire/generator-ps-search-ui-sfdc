declare function require(module: string);

export { CustomEvents } from './events/CustomEvents';

export * from './custo/<%= capitalizeCustomerSafeName %>Initialization';
export { <%= capitalizeCustomerSafeName %>Helper } from './custo/<%= capitalizeCustomerSafeName %>Helper';
export { <%= capitalizeCustomerSafeName %>Custo } from './custo/<%= capitalizeCustomerSafeName %>Custo';

// Webpack output a library target with a temporary name.
// This is to allow end user to put CoveoPSComponents.js before or after the main CoveoJsSearch.js, without breaking
// This code swap the current module to the "real" Coveo variable.
let swapVar = () => {
  if (window['Coveo'] == undefined) {
    window['Coveo'] = this;
  } else {
    _.each(_.keys(this), (k) => {
      window['Coveo'][k] = this[k];
    });
  }
};
swapVar();
