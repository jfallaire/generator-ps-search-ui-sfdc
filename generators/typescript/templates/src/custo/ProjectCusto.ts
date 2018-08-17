import $$ = Coveo.$$;
import IBuildingQueryEventArgs = Coveo.IBuildingQueryEventArgs;
import IDoneBuildingQueryEventArgs = Coveo.IDoneBuildingQueryEventArgs;
import IPreprocessResultsEventArgs = Coveo.IPreprocessResultsEventArgs;
import INewQueryEventArgs = Coveo.INewQueryEventArgs;
import IAttributeChangedEventArg = Coveo.IAttributeChangedEventArg;
import { <%= capitalizeCustomerSafeName %>Helper, I<%= capitalizeCustomerSafeName %>IconOptions } from './<%= capitalizeCustomerSafeName %>Helper';
import IStringMap = Coveo.IStringMap;
declare var String: { toLocaleString: (param: any) => void; };

/**
 * Required customization specifically applied for Tableau's implementation
 */
export class <%= capitalizeCustomerSafeName %>Custo {

  private searchInterface: Coveo.SearchInterface;
  private rootElement: Coveo.Dom;

  constructor(public searchInterfaceElement: HTMLElement) {

    this.rootElement = $$(searchInterfaceElement);

    // let changeTabEvtName = Coveo.QueryStateModel.eventTypes.changeOne + Coveo.QueryStateModel.attributesEnum.t;
    let changeFacetSourceEvtNames = [
      this.getStateEventName(Coveo.QueryStateModel.eventTypes.changeOne + 'f:allSource'),
      this.getStateEventName(Coveo.QueryStateModel.eventTypes.changeOne + 'f:coreSource')

    ];

    let changeAllFacetsEvtNames = _.map(this.rootElement.findAll('.CoveoFacet'), (el) => {
      return this.getStateEventName(Coveo.QueryStateModel.eventTypes.changeOne + 'f:' + el.dataset['id']);
    });

    // Initialization Events
    this.rootElement.on(Coveo.InitializationEvents.beforeInitialization, () => this.handleBeforeInit());
    this.rootElement.on(Coveo.InitializationEvents.afterInitialization, () => this.handleAfterInit());
    this.rootElement.on(Coveo.InitializationEvents.afterComponentsInitialization, () => this.handleAfterComponentsInit());

    // Query Events
    this.rootElement.on(Coveo.QueryEvents.newQuery, (e: Event, data: INewQueryEventArgs) => this.handleNewQuery(e, data));
    this.rootElement.on(Coveo.QueryEvents.buildingQuery, (e: Event, data: IBuildingQueryEventArgs) => this.handleBuildingQuery(e, data));
    this.rootElement.on(Coveo.QueryEvents.doneBuildingQuery, (e: Event, data: IDoneBuildingQueryEventArgs) => this.handleDoneBuildingQuery(e, data));
    this.rootElement.on(Coveo.QueryEvents.preprocessResults, (e: Event, data: IPreprocessResultsEventArgs) => this.handlePreprocessResults(e, data));
    this.rootElement.on(Coveo.QueryEvents.querySuccess, (e: Event, data: Coveo.IQuerySuccessEventArgs) => this.handleQuerySuccess(e, data));

    // State Events

    // Custom Events
    // TODO
  }

  private getStateEventName(event: string) {
    return Coveo.QueryStateModel.ID + ':' + event;
  }

  /**
   * Before Initialization
   */
  private handleBeforeInit() {
  }
  /**
   * After Initialization
   * initializing custom strings during before init event to avoid any issue with SFDC init strings.
   */
  private handleAfterInit() {
    this.initStrings();
  }
  /**
   * After Component Initialization
   * Adding Setting Menu item for Tableau training link
   * Registering custom template helper to manage tableau custom icons. see result templates
   */
  private handleAfterComponentsInit() {
    this.searchInterface = <Coveo.SearchInterface>Coveo.Component.get(this.rootElement.el, Coveo.SearchInterface);
    
    Coveo.TemplateHelpers.registerTemplateHelper('from<%= capitalizeCustomerSafeName %>TypeToIcon', (result: Coveo.IQueryResult, options: I<%= capitalizeCustomerSafeName %>IconOptions) => {
      return <%= capitalizeCustomerSafeName %>Helper.from<%= capitalizeCustomerSafeName %>TypeToIcon(result, options);
    });

    Coveo.TemplateHelpers.registerFieldHelper('customDate', (value: any, options: any) => {
      return <%= capitalizeCustomerSafeName %>Helper.customDate(Coveo.DateUtils.convertFromJsonDateIfNeeded(value));
    });

  }
  /**
   * New Query
   */
  private handleNewQuery(evt: Event, args: INewQueryEventArgs) { }
  /**
   * Building Query
   */
  private handleBuildingQuery(evt: Event, args: IBuildingQueryEventArgs) { }
  /**
   * Done Building Query
   */
  private handleDoneBuildingQuery(evt: Event, args: IDoneBuildingQueryEventArgs) { }
  /**
   * Preprocess Results
   */
  private handlePreprocessResults(evt: Event, args: IPreprocessResultsEventArgs) { }
  /**
   * Query Success
   */
  private handleQuerySuccess(evt: Event, args: Coveo.IQuerySuccessEventArgs) { }

  /**
   * Initialized Custom Strings
   */
  public initStrings() {
    // Custom variable for current application
    String.toLocaleString({
      'en': {
        'ShowingResultsOf': 'Result<pl>s</pl> {0}<pl>-{1}</pl> of about {2}',
        'RemoveContext': 'Remove Case Filters',
        'GoToFullSearch': 'Full Search Page'
      }
    });
  }

  /**
   * Set default options of different UI Components for <%= capitalizeCustomerSafeName %>.
   */
  public getDefaultOptions(): any {
    let defaultOptions: any = {
      SalesforceResultLink: {
        alwaysOpenInNewWindow: true
      },
      ResultLink: {
        alwaysOpenInNewWindow: true
      },
      Facet: {
        availableSorts: ['occurrences', 'score', 'alphaAscending', 'alphaDescending'],
        valueCaption: {
          'Not Specified': 'Unspecified',
          'Web Misc.': 'Web (other)'
        }
      }
    };
    return defaultOptions;
  }

};

export function init<%= capitalizeCustomerSafeName %>Custo(element: HTMLElement, options: any = {}, custoOptions: any = {}) {
  Coveo.Initialization.initializeFramework(element, options, () => {
    
    let custo = new <%= capitalizeCustomerSafeName %>Custo(element);
    custo.initStrings();
    let customOptions = _.extend({}, custo.getDefaultOptions(), options);

    return Coveo.Initialization.initSearchInterface(element, customOptions);

  });
}

Coveo.Initialization.registerNamedMethod('init<%= capitalizeCustomerSafeName %>Custo', (element?: HTMLElement, options: any = {}, custoOptions: any = {}) => {
  init<%= capitalizeCustomerSafeName %>Custo(element, options, custoOptions);
});

export function init<%= capitalizeCustomerSafeName %>AgentBoxCusto(element: HTMLElement, options: any = {}, custoOptions: any = {}) {
  Coveo.Initialization.initializeFramework(element, options, () => {

    let custo = new <%= capitalizeCustomerSafeName %>Custo(element);
    // custo.initStrings();
    let customOptions = _.extend({}, custo.getDefaultOptions(), options);

    return Coveo.Initialization.initBoxInterface(element, customOptions);

  });
}

Coveo.Initialization.registerNamedMethod('init<%= capitalizeCustomerSafeName %>AgentBoxCusto', (element?: HTMLElement, options: any = {}) => {
  init<%= capitalizeCustomerSafeName %>AgentBoxCusto(element, options);
});

