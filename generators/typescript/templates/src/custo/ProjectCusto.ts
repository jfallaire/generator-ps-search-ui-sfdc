import $$ = Coveo.$$;
import Component = Coveo.Component;
import Initialization = Coveo.Initialization;
import ComponentOptions = Coveo.ComponentOptions;
import IComponentBindings = Coveo.IComponentBindings;
import IBuildingQueryEventArgs = Coveo.IBuildingQueryEventArgs;
import IDoneBuildingQueryEventArgs = Coveo.IDoneBuildingQueryEventArgs;
import IPreprocessResultsEventArgs = Coveo.IPreprocessResultsEventArgs;
import INewQueryEventArgs = Coveo.INewQueryEventArgs;
import IAttributeChangedEventArg = Coveo.IAttributeChangedEventArg;
import { <%= capitalizeCustomerSafeName %>Helper } from './<%= capitalizeCustomerSafeName %>Helper';
import { UrlUtils } from '../utils/UrlUtils';
import IStringMap = Coveo.IStringMap;

declare var String: { toLocaleString: (param: any) => void; };

export interface I<%= capitalizeCustomerSafeName %>Options {
}

/**
 * Required customization specifically applied for your implementation
 */
export class <%= capitalizeCustomerSafeName %>Custo extends Component {

  static ID = '<%= capitalizeCustomerSafeName %>Custo';
  static options: I<%= capitalizeCustomerSafeName %>Options = {};

  constructor(public element: HTMLElement, public options: I<%= capitalizeCustomerSafeName %>Options, public bindings?: IComponentBindings) {

    super(element, <%= capitalizeCustomerSafeName %>Custo.ID, bindings);
    this.options = ComponentOptions.initComponentOptions(element, <%= capitalizeCustomerSafeName %>Custo, options);

    // Initialization Events
    this.bind.onRootElement(Coveo.InitializationEvents.beforeInitialization, this.handleBeforeInit);
    this.bind.onRootElement(Coveo.InitializationEvents.afterComponentsInitialization, this.handleAfterComponentsInit);
    this.bind.onRootElement(Coveo.InitializationEvents.afterInitialization, this.handleAfterInit);

    // Query Events
    this.bind.onRootElement(Coveo.QueryEvents.newQuery, this.handleNewQuery);
    this.bind.onRootElement(Coveo.QueryEvents.buildingQuery, this.handleBuildingQuery);
    this.bind.onRootElement(Coveo.QueryEvents.doneBuildingQuery, this.handleDoneBuildingQuery);
    this.bind.onRootElement(Coveo.QueryEvents.preprocessResults, this.handlePreprocessResults);
    this.bind.onRootElement(Coveo.QueryEvents.querySuccess, this.handleQuerySuccess);

  }

  /**
   * Before Initialization
   */
  private handleBeforeInit() {}

  /**
   * After Component Initialization
   */
  private handleAfterComponentsInit() {}

  /**
   * After Component Initialization
   */
  private handleAfterInit() {}

  /**
   * New Query
   */
  private handleNewQuery(args: INewQueryEventArgs) { }
  /**
   * Building Query
   */
  private handleBuildingQuery(args: IBuildingQueryEventArgs) { }
  /**
   * Done Building Query
   */
  private handleDoneBuildingQuery(args: IDoneBuildingQueryEventArgs) { }
  
  /**
   * Preprocess Results
   */
  private handlePreprocessResults(args: IPreprocessResultsEventArgs) { }
  /**
   * Query Success
   */
  private handleQuerySuccess(args: Coveo.IQuerySuccessEventArgs) { }

};

Initialization.registerAutoCreateComponent(<%= capitalizeCustomerSafeName %>Custo);

