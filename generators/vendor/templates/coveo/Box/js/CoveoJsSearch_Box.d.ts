

declare module Coveo {
    interface BoxStateAttributes {
        enableNonContextualSearch: boolean;
        t: string;
    }
    class BoxStateModel extends Model {
        static ID: string;
        static defaultAttributes: BoxStateAttributes;
        static attributesEnum: {
            enableNonContextualSearch: string;
            t: string;
        };
        constructor(element: HTMLElement, attributes?: {
            [key: string]: any;
        }, bindings?: BoxComponentBindings);
        getSimpleEvent(name: string): string;
    }
}
declare module Coveo {
    interface ContainerComponentBindings extends IComponentBindings {
        container?: Container;
        root: HTMLElement;
        queryStateModel: QueryStateModel;
        queryController: QueryController;
        searchInterface: SearchInterface;
        componentStateModel: ComponentStateModel;
        componentOptionsModel: ComponentOptionsModel;
        usageAnalytics: IAnalyticsClient;
    }
    interface ContainerComponent extends Component {
        options: any;
    }
    interface ContainerComponentStatic {
        ID: string;
        editAttributes?: any;
        options?: any;
        getMarkup?: () => JQuery;
        getInjection?: () => ContainerInjection;
    }
    interface ContainerStatic extends ContainerComponentStatic {
        new (element: HTMLElement, options?: any, bindings?: ContainerComponentBindings, injectFunction?: () => ContainerInjection, originalOptionsObject?: any): ContainerComponent;
    }
    interface ContainerHeaderStatic extends ContainerComponentStatic {
        new (element: HTMLElement, options?: any, bindings?: ContainerComponentBindings, id?: string): Component;
    }
    interface ContainerBodyStatic extends ContainerComponentStatic {
        new (element: HTMLElement, options?: any, bindings?: ContainerComponentBindings, id?: string): Component;
    }
    interface ContainerFooterStatic extends ContainerComponentStatic {
        new (element: HTMLElement, options?: any, bindings?: ContainerComponentBindings, id?: string): Component;
    }
    interface ContainerQueryStatic extends ContainerComponentStatic {
        new (element: HTMLElement, options?: any, bindings?: ContainerComponentBindings, id?: string): Component;
    }
    interface ContainerContextStatic extends ContainerComponentStatic {
        new (element: HTMLElement, options?: any, bindings?: ContainerComponentBindings, id?: string): Component;
    }
    interface ContainerSidePanelStatic extends ContainerComponentStatic {
        new (element: HTMLElement, options?: any, bindings?: ContainerComponentBindings, id?: string): Component;
    }
    interface ContainerInjectionEditable {
        name: string;
        defaultValue: any;
    }
    interface ContainerQueryBuilderInjection {
        onBuildingQuery: (e: JQueryEventObject, args: IBuildingQueryEventArgs) => void;
    }
}
declare module Coveo {
    class ContainerInjection {
        editableAttributes: {
            [boxPart: string]: {
                [key: string]: ContainerInjectionEditable;
            };
        };
        queryKlass: ContainerQueryStatic;
        headerKlass: ContainerHeaderStatic;
        bodyKlass: ContainerBodyStatic;
        footerKlass: ContainerFooterStatic;
        contextKlass: ContainerContextStatic;
        sidePanelKlass: ContainerSidePanelStatic;
        private logger;
        constructor();
        withHeader(headerKlass: ContainerHeaderStatic): this;
        withBody(bodyKlass: ContainerBodyStatic): this;
        withFooter(footerKlass: ContainerFooterStatic): this;
        withQuery(queryKlass: ContainerQueryStatic): this;
        withOptions(options: any): this;
        withContext(contextKlass: ContainerContextStatic): this;
        getAttributes(): ContainerInjectionEditable[];
        private loggerInfo(part, oldPart, newPart);
        private fromComponentOptionsToContainerInjectionEditable(options);
    }
}
declare module Coveo.Salesforce {
    interface SalesforceRecord {
        "assetid": any;
        "lastmodifiedbyid": string;
        "user__userid": string;
        "suppliedname": any;
        "user__lastname": string;
        "casenumber": string;
        "lastvieweddate": string;
        "ownerid": string;
        "createddate": string;
        "user__usertype": string;
        "origin": string;
        "user__firstname": string;
        "hascommentsunreadbyowner": boolean;
        "suppliedphone": any;
        "user__username": string;
        "isescalated": boolean;
        "status": string;
        "user__userroleid": any;
        "user__name": string;
        "accountid": string;
        "suppliedcompany": any;
        "systemmodstamp": string;
        "user__language": string;
        "isdeleted": boolean;
        "priority": string;
        "description": any;
        "user__profile": string;
        "user__useremail": string;
        "id": string;
        "lastmodifieddate": string;
        "createdbyid": string;
        "contactid": string;
        "type": string;
        "closeddate": string;
        "suppliedemail": any;
        "parentid": any;
        "hasselfservicecomments": boolean;
        "subject": string;
        "reason": string;
        "isclosed": boolean;
        "user__locale": string;
    }
    interface KBArticleType {
        type: string;
        label: string;
    }
    interface KnowledgeArticleInfos {
        types: KBArticleType[];
        isKnowledgeEnabled: boolean;
    }
    var record: SalesforceRecord;
    var fullPageUri: string;
    var type: string;
    var fieldLabels: {
        [field: string]: string;
    };
    var coveoFieldNames: string[];
    var extensions: {
        name: string;
        argumentNames: string[];
    }[];
    var knowledgeArticleInfos: KnowledgeArticleInfos;
}
declare module Coveo {
    interface ContainerOptions extends ISearchInterfaceOptions {
    }
    class Container extends SearchInterface {
        element: HTMLElement;
        injectionFunction: () => ContainerInjection;
        originalOptionsObject: any;
        options: ContainerOptions;
        header: Component;
        context: {
            [key: string]: any;
        };
        static options: ContainerOptions;
        constructor(element: HTMLElement, options?: ContainerOptions, analyticsOptions?: any, injectionFunction?: () => ContainerInjection, originalOptionsObject?: any);
        addGlobalContext(key: string, context: any): void;
        getGlobalContext(key: string): any;
        private injectContainerHeader(injection);
        private injectContainerBody(injection);
        private injectContainerFooter(injection);
        private injectContainerQuery(injection);
        private injectContainerContext(injection);
        private injectContainerSidePanel(injection);
        getBindings(): ContainerComponentBindings;
    }
}
declare module Coveo {
    interface BoxComponentBindings extends ContainerComponentBindings {
        container?: Box;
        boxStateModel?: BoxStateModel;
        isWaitingForRecord?: boolean;
    }
}
declare module Coveo {
    interface BoxExpandLinkOptions {
        uri: string;
        title: string;
        hd: string;
        targetTab: string;
        icon: string;
        toPrimaryTab: boolean;
        text: string;
    }
    class BoxExpandLink extends Component {
        element: HTMLElement;
        options: BoxExpandLinkOptions;
        bindings: BoxComponentBindings;
        static ID: string;
        static getMarkup(): JQuery;
        static options: BoxExpandLinkOptions;
        private baseHref;
        private currentHref;
        constructor(element: HTMLElement, options?: BoxExpandLinkOptions, bindings?: BoxComponentBindings);
        private appendIcon();
        private getHd();
        private getHq(q, args);
        private setBaseHref();
        private setNewHref(args);
        private extractBaseHrefFromBaseUri(baseHref, hashArguments);
        private buildHrefFromArguments(baseHref, hashArguments);
        private bindAnalyticsEvent();
        private getTargetTab();
    }
}
declare module Coveo {
    interface BoxEditLinkOptions {
        uri: string;
        icon: string;
        queryStringParams?: {
            [key: string]: string;
        };
        text: string;
    }
    class BoxEditLink extends Component {
        element: HTMLElement;
        options: BoxEditLinkOptions;
        bindings: BoxComponentBindings;
        static ID: string;
        static getMarkup(): JQuery;
        static options: BoxEditLinkOptions;
        constructor(element: HTMLElement, options?: BoxEditLinkOptions, bindings?: BoxComponentBindings);
        private setBaseHref();
        private bindAnalyticsEvent();
        private appendIcon();
    }
}
declare module Coveo {
    interface CreateArticleOptions {
        /** The list of article types to show */
        articleTypeFilter: string[];
        /** Whether to hide the component */
        hidden: boolean;
        /** Whether to open the Article form in a primary tab or a sub-tab */
        openInPrimaryTab: boolean;
    }
    /**
     * BoxCreateArticle
     * Displays a link to create a Knowledge Article from a Salesforce Case
     */
    class BoxCreateArticle extends Component {
        element: HTMLElement;
        options: CreateArticleOptions;
        bindings: BoxComponentBindings;
        static ID: string;
        static options: CreateArticleOptions;
        private createArticlePage;
        private articleTypes;
        constructor(element: HTMLElement, options?: CreateArticleOptions, bindings?: BoxComponentBindings);
        private bindAction(element, articleType);
        private bindAnalyticsEvent(element);
        private renderElement();
        private buildHref(articleType);
        /**
         * Changes the default CreateArticle page
         * @param page The page URL
        */
        setCreateArticlePage(page: string): void;
    }
}
declare module Coveo {
    interface BoxHeaderOptions extends ISearchboxOptions {
        includeSearchbox: boolean;
        includeSettings: boolean;
        placeholder: string;
        allowNonContextualSearch: boolean;
    }
    class BoxHeader extends Component {
        element: HTMLElement;
        options: BoxHeaderOptions;
        bindings: BoxComponentBindings;
        private id;
        static ID: string;
        static options: BoxHeaderOptions;
        static getMarkup(): JQuery;
        private searchbox;
        private settings;
        private subSection;
        private nonContextualSearchToggle;
        constructor(element: HTMLElement, options?: BoxHeaderOptions, bindings?: BoxComponentBindings, id?: string);
        private buildContextualSearchInput();
        private toggleFancySwitch(activate);
        private buildSubSection();
        private buildSearchbox(container);
        private buildSettings(container);
        private buildSearchBoxSection();
    }
}
declare module Coveo {
    interface BoxBodyOptions extends IResultListOptions {
    }
    class BoxBody extends Component {
        element: HTMLElement;
        options: BoxBodyOptions;
        bindings: BoxComponentBindings;
        static ID: string;
        static options: BoxBodyOptions;
        static getMarkup(): JQuery;
        private resizeHandler;
        constructor(element: HTMLElement, options?: BoxBodyOptions, bindings?: BoxComponentBindings);
        getHeight(): number;
        resize(): void;
        private appendResultList();
        private handleNuke();
    }
}
declare module Coveo {
    interface BoxPopupOptions {
        title?: string;
        icon?: string;
        withAnimation: boolean;
        fullWidth: boolean;
        fullHeight: boolean;
        hidden: boolean;
    }
    class BoxPopup extends Component {
        element: HTMLElement;
        options: BoxPopupOptions;
        bindings: BoxComponentBindings;
        private id;
        static ID: string;
        private top;
        static options: BoxPopupOptions;
        static getMarkup(): JQuery;
        private toggleButton;
        private popupWrapper;
        private titleElement;
        private isOpen;
        constructor(element: HTMLElement, options?: BoxPopupOptions, bindings?: BoxComponentBindings, id?: string);
        setTitle(title: JQuery): any;
        setTitle(title: HTMLElement): any;
        setTitle(title: string): any;
        getTopPosition(): any;
        setTopPosition(): void;
        setToggleHeight(): void;
        setToggleWidth(): void;
        open(): void;
        close(): void;
        toggle(): void;
        private setClasses();
        private buildTitle(title?);
        private buildBasicTitle();
        private buildToggleButton();
    }
}
declare module Coveo {
    interface BoxCurrentTabOptions {
    }
    class BoxCurrentTab extends Component {
        element: HTMLElement;
        options: BoxCurrentTabOptions;
        bindings: BoxComponentBindings;
        static ID: string;
        private nearestBoxSidePanel;
        constructor(element: HTMLElement, options?: BoxCurrentTabOptions, bindings?: BoxComponentBindings);
        private handleTabChange(args);
    }
}
declare module Coveo {
    interface BoxCurrentSortOptions {
    }
    class BoxCurrentSort extends Component {
        element: HTMLElement;
        options: BoxCurrentSortOptions;
        bindings: BoxComponentBindings;
        static ID: string;
        private nearestBoxSidePanel;
        constructor(element: HTMLElement, options?: BoxCurrentSortOptions, bindings?: BoxComponentBindings);
        private handleSortChange(args);
    }
}
declare module Coveo {
    interface BoxResultActionOptions {
        menuDelay: number;
        displayInline: boolean;
    }
    interface IncludedInBoxResultAction {
        getTitle: (displayedInline: boolean) => HTMLElement;
    }
    class BoxResultAction extends Component {
        element: HTMLElement;
        options: BoxResultActionOptions;
        bindings: BoxComponentBindings;
        result: IQueryResult;
        static ID: string;
        static getMarkup(): JQuery;
        static options: BoxResultActionOptions;
        private menu;
        private container;
        constructor(element: HTMLElement, options?: BoxResultActionOptions, bindings?: BoxComponentBindings, result?: IQueryResult);
        private doesImplementIncludedInterface(elem);
    }
}
declare module Coveo {
    class BoxAttachToCase extends AttachToCase implements IncludedInBoxResultAction {
        element: HTMLElement;
        options: AttachToCaseOptions;
        result: IQueryResult;
        static ID: string;
        static getMarkup(): JQuery;
        private displayedInline;
        protected textElement: JQuery;
        private iconElement;
        constructor(element: HTMLElement, options?: AttachToCaseOptions, bindings?: IResultsComponentBindings, result?: IQueryResult);
        getTitle(displayedInline: boolean): HTMLElement;
        protected renderButton(): void;
        protected updateButton(sendEvent?: boolean): void;
    }
}
declare module Coveo {
    class BoxQuickview extends Quickview implements IncludedInBoxResultAction {
        element: HTMLElement;
        options: IQuickviewOptions;
        result: IQueryResult;
        static ID: string;
        static getMarkup(): JQuery;
        constructor(element: HTMLElement, options?: IQuickviewOptions, bindings?: IResultsComponentBindings, result?: IQueryResult);
        getTitle(displayedInline: boolean): any;
    }
}
declare module Coveo {
    interface BoxQuerySummaryOptions {
    }
    class BoxQuerySummary extends Component {
        element: HTMLElement;
        options: BoxQuerySummaryOptions;
        bindings: BoxComponentBindings;
        static ID: string;
        static options: BoxQuerySummaryOptions;
        private totalNumberOfResults;
        private resultList;
        constructor(element: HTMLElement, options?: BoxQuerySummaryOptions, bindings?: BoxComponentBindings);
        private render();
        private renderWithResults();
        private renderNoResults();
        protected getSearchTips(): JQuery;
    }
}
declare module Coveo {
    class BoxFieldTable extends FieldTable {
        element: HTMLElement;
        options: IFieldTableOptions;
        static ID: string;
        constructor(element: HTMLElement, options?: IFieldTableOptions, bindings?: IComponentBindings, result?: IQueryResult);
        protected isTogglable(): boolean;
    }
}
declare module Coveo {
    interface BoxResultLinkOptions extends SalesforceResultLinkOptions {
    }
    class BoxResultLink extends SalesforceResultLink {
        static ID: string;
    }
}
declare module Coveo {
    class BoxFollowItem extends FollowItem implements IncludedInBoxResultAction {
        element: HTMLElement;
        options: IFollowItemOptions;
        result: IQueryResult;
        static ID: string;
        static getMarkup(): JQuery;
        private menuDiv;
        constructor(element: HTMLElement, options?: IFollowItemOptions, bindings?: IResultsComponentBindings, result?: IQueryResult);
        getTitle(displayedInline: boolean): HTMLElement;
        setFollowed(subscription: ISubscription): void;
        setNotFollowed(): void;
    }
}
declare module Coveo {
    interface BoxSearchAlertsOptions extends ISearchAlertsOptions {
    }
    class BoxSearchAlerts extends SearchAlerts {
        element: HTMLElement;
        options: BoxSearchAlertsOptions;
        static ID: string;
        static getMarkup(): JQuery;
        constructor(element: HTMLElement, options?: BoxSearchAlertsOptions, bindings?: IComponentBindings);
        openPanel(): Promise<ISubscription>;
        redirectToManageAlertsPage(subscriptionUser: ISubscriptionUser): void;
    }
}
declare module Coveo {
    interface BoxOptions extends ContainerOptions {
        record?: Salesforce.SalesforceRecord;
        type?: string;
        withAnalytics?: boolean;
        useLocalStorageForBoxState?: boolean;
        enableBoxStateHistory?: boolean;
    }
    class Box extends Container {
        element: HTMLElement;
        options: BoxOptions;
        static ID: string;
        static options: BoxOptions;
        static getInjection(): ContainerInjection;
        boxStateModel: BoxStateModel;
        private resizeHandler;
        constructor(element: HTMLElement, options?: BoxOptions, analyticsOptions?: any, injection?: () => ContainerInjection, originalOptionsObject?: any);
        resize(): void;
        protected initializeAnalytics(): IAnalyticsClient;
        getBindings(): BoxComponentBindings;
        private handleNuke();
    }
}
declare module Coveo {
    interface ExtensionQREOptions {
        expression: string;
        modifier: number;
        bindOnQuery?: boolean;
        quotedExpression?: boolean;
    }
    class ExtensionQRE extends Component {
        element: HTMLElement;
        options: ExtensionQREOptions;
        static ID: string;
        static options: ExtensionQREOptions;
        constructor(element: HTMLElement, options: ExtensionQREOptions, bindings: BoxComponentBindings);
        getBuilder(): ExtensionBuilder;
        handleBuildingQuery(args: IBuildingQueryEventArgs): void;
    }
}
declare module Coveo {
    interface ExtensionQRFOptions {
        expression: string;
        normalizeWeight: boolean;
    }
    class ExtensionQRF extends Component {
        element: HTMLElement;
        options: ExtensionQRFOptions;
        static ID: string;
        static options: ExtensionQRFOptions;
        constructor(element: HTMLElement, options: ExtensionQRFOptions, bindings: BoxComponentBindings);
        handleBuildingQuery(args: IBuildingQueryEventArgs): void;
    }
}
declare module Coveo {
    interface ExtensionQFOptions {
        func: string;
        fieldName: string;
    }
    class ExtensionQF extends Component {
        element: HTMLElement;
        options: ExtensionQFOptions;
        static ID: string;
        static options: ExtensionQFOptions;
        constructor(element: HTMLElement, options: ExtensionQFOptions, bindings: BoxComponentBindings);
        handleBuildingQuery(args: IBuildingQueryEventArgs): void;
    }
}
declare module Coveo {
    enum SupportedBoxQueryExtension {
        QRE = 0,
        QRF = 1,
        QF = 2,
    }
    interface BoxQueryExtensionConfiguration {
        extension: SupportedBoxQueryExtension;
        name: string;
        definition: QREDefinition | QRFDefinition | QFDefinition;
    }
    interface QREDefinition {
        expression?: string;
        modifier?: number;
    }
    interface QRFDefinition {
        expression: string;
        normalizeWeight: boolean;
    }
    interface QFDefinition {
        func: string;
        fieldName: string;
    }
    interface BoxQueryExtensionsOptions {
        configurations?: BoxQueryExtensionConfiguration[];
        disableOnNonContextualSearch: boolean;
    }
    class BoxQueryExtensions extends Component {
        element: HTMLElement;
        options: BoxQueryExtensionsOptions;
        bindings: BoxComponentBindings;
        static ID: string;
        static getMarkup(): JQuery;
        static options: BoxQueryExtensionsOptions;
        static getConfigFromContent(content: string): BoxQueryExtensionConfiguration[];
        static getConfigFromContent(content: HTMLElement): BoxQueryExtensionConfiguration[];
        private extensions;
        private isDisabledFromContextualQuery;
        constructor(element: HTMLElement, options?: BoxQueryExtensionsOptions, bindings?: BoxComponentBindings);
        private buildQREExtension(qreConfiguration);
        private buildQRFExtension(qrfConfiguration);
        private buildQFExtension(qfConfiguration);
        enable(): void;
        disable(): void;
    }
}
declare module Coveo {
    class ExtensionBuilder {
        name: string;
        withQuote: boolean;
        private params;
        constructor(name: string, withQuote?: boolean);
        withParam(key: string, value: any): this;
        build(): string;
    }
}
declare module Coveo {
    interface ExtensionSomeOptions {
        keywords: string;
        best?: number;
        match?: number | string;
        removeStopWords?: boolean;
        maximum?: number;
        bindOnQuery?: boolean;
    }
    class ExtensionSome extends Component {
        element: HTMLElement;
        options: ExtensionSomeOptions;
        static ID: string;
        static options: ExtensionSomeOptions;
        static fromStringArrayToStringKeywords(array: string[], bindings: BoxComponentBindings): string;
        constructor(element: HTMLElement, options: ExtensionSomeOptions, bindings: BoxComponentBindings);
        getBuilder(): ExtensionBuilder;
        handleBuildingQuery(args: IBuildingQueryEventArgs): void;
    }
}
declare module Coveo {
    enum BoxRelatedContextImportance {
        LOWEST = 0,
        LOW = 1,
        AVERAGE = 2,
        HIGH = 3,
        HIGHEST = 4,
        MANDATORY = 5,
    }
    interface BoxRelatedContextConfiguration {
        importance: BoxRelatedContextImportance;
        include: string[];
        name: string;
    }
    interface BoxRelatedContextOptions {
        configurations: BoxRelatedContextConfiguration[];
    }
    class BoxRelatedContext extends Component {
        element: HTMLElement;
        options: BoxRelatedContextOptions;
        bindings: BoxComponentBindings;
        static ID: string;
        static BestKeywordsToMatch: number;
        static getMarkup(): JQuery;
        static getConfigFromContent(content: string): BoxRelatedContextConfiguration[];
        static getConfigFromContent(content: HTMLElement): BoxRelatedContextConfiguration[];
        private importanceDescription;
        constructor(element: HTMLElement, options?: BoxRelatedContextOptions, bindings?: BoxComponentBindings);
        private handleBuildingQuery(args, expression);
    }
}
declare module Coveo {
    interface BoxQueryGenericOptions {
        disableOnNonContextualSearch: boolean;
    }
    class BoxQueryGeneric extends Component {
        element: HTMLElement;
        options: BoxQueryGenericOptions;
        bindings: BoxComponentBindings;
        static ID: string;
        static getMarkup(): JQuery;
        static options: BoxQueryGenericOptions;
        private content;
        private isDisabledFromContextualQuery;
        constructor(element: HTMLElement, options?: BoxQueryGenericOptions, bindings?: BoxComponentBindings);
        private handleBuildingQuery(args);
    }
}
declare module Coveo {
    class BoxPipelineContext extends PipelineContext {
        element: HTMLElement;
        options: IPipelineContextOptions;
        bindings: BoxComponentBindings;
        static ID: string;
        static getMarkup(): JQuery;
        constructor(element: HTMLElement, options?: IPipelineContextOptions, bindings?: BoxComponentBindings);
    }
}
declare module Coveo {
    interface BoxQuerySomeOptions extends ExtensionSomeOptions {
        include: string[];
        includeCurrentRecord: boolean;
        disableOnNonContextualSearch: boolean;
    }
    class BoxQuerySome extends Component {
        element: HTMLElement;
        options: BoxQuerySomeOptions;
        bindings: BoxComponentBindings;
        static ID: string;
        static options: BoxQuerySomeOptions;
        private keywordsForQuery;
        private extensionSome;
        private isDisabledFromContextualQuery;
        constructor(element: HTMLElement, options?: BoxQuerySomeOptions, bindings?: BoxComponentBindings);
        enable(): void;
        disable(): void;
        private fromIncludeOptionToKeywords();
    }
}
