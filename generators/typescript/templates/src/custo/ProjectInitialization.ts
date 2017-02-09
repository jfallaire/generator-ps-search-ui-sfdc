declare function require(module: string);
declare var String: { toLocaleString: (param: any) => void; };

import { <%= capitalizeCustomerSafeName %>Custo } from './<%= capitalizeCustomerSafeName %>Custo';

export function init<%= capitalizeCustomerSafeName %>Custo(element: HTMLElement, options: any = {}) {
  Coveo.Initialization.initializeFramework(element, options, () => {
    
    let custo = new <%= capitalizeCustomerSafeName %>Custo(element);
    // custo.initStrings();
    let customOptions = _.extend(options, custo.getDefaultOptions());

    Coveo.Initialization.initSearchInterface(element, customOptions);

  });
}

export function init<%= capitalizeCustomerSafeName %>AgentBoxCusto(element: HTMLElement, options: any = {}) {
  Coveo.Initialization.initializeFramework(element, options, () => {

    let custo = new <%= capitalizeCustomerSafeName %>Custo(element);
    // custo.initStrings();
    let customOptions = _.extend(options, custo.getDefaultOptions());

    Coveo.Initialization.initBoxInterface(element, customOptions);

  });
}

Coveo.Initialization.registerNamedMethod('init<%= capitalizeCustomerSafeName %>Custo', (element?: HTMLElement, options: any = {}) => {
  init<%= capitalizeCustomerSafeName %>Custo(element, options);
});

Coveo.Initialization.registerNamedMethod('init<%= capitalizeCustomerSafeName %>AgentBoxCusto', (element?: HTMLElement, options: any = {}) => {
  init<%= capitalizeCustomerSafeName %>AgentBoxCusto(element, options);
});
