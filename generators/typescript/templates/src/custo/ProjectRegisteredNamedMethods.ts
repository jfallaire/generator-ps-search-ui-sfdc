declare function require(module: string);
declare var String: { toLocaleString: (param: any) => void; };

import { <%= capitalizeCustomerSafeName %>Custo } from './<%= capitalizeCustomerSafeName %>Custo';

export function init<%= capitalizeCustomerSafeName %>Custo(element: HTMLElement, options: any = {}, custoOptions: any = {}) {
  Coveo.Initialization.initializeFramework(element, options, () => {
    
    let custo = new <%= capitalizeCustomerSafeName %>Custo(element);
    custo.initStrings();
    let customOptions = _.extend(options, custo.getDefaultOptions());

    return Coveo.Initialization.initSearchInterface(element, customOptions);

  });
}

export function init<%= capitalizeCustomerSafeName %>AgentBoxCusto(element: HTMLElement, options: any = {}, custoOptions: any = {}) {
  Coveo.Initialization.initializeFramework(element, options, () => {

    let custo = new <%= capitalizeCustomerSafeName %>Custo(element);
    // custo.initStrings();
    let customOptions = _.extend(options, custo.getDefaultOptions());

    return Coveo.Initialization.initBoxInterface(element, customOptions);

  });
}

export function renew<%= capitalizeCustomerSafeName %>AccessToken(): Promise<string> {
  let renewTokenPromise = new Promise<string>((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open('POST', '/renewtoken');
    xhr.onreadystatechange = handler;
    xhr.setRequestHeader('Accept', 'application/text');
    xhr.send();

    function handler() {
      if (this.readyState === this.DONE) {

        if (this.status === 200) {
          resolve(this.response);
        } else {
          reject(new Error('renewtoken failed with status: [' + this.status + ']'));
        }
      }
    }
  });
  return renewTokenPromise;
}

Coveo.Initialization.registerNamedMethod('init<%= capitalizeCustomerSafeName %>Custo', (element?: HTMLElement, options: any = {}, custoOptions: any = {}) => {
  init<%= capitalizeCustomerSafeName %>Custo(element, options, custoOptions);
});

Coveo.Initialization.registerNamedMethod('init<%= capitalizeCustomerSafeName %>AgentBoxCusto', (element?: HTMLElement, options: any = {}) => {
  init<%= capitalizeCustomerSafeName %>AgentBoxCusto(element, options);
});
