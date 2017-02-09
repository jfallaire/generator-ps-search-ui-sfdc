
interface Window {
    sforce: {
        console: {
            isInConsole: () => boolean;
            getPageInfo: (tabId: string, callback?: (result) => any) => void;
            openSubtab: (primaryTabId: string, url: string, active: boolean, tabLabel: string, tabId: string, callback?: (result) => any) => void;
            focusSubtabById: (tabId: string, callback?: (result) => any) => void;
            getSubtabIds: (primaryTabId?: string, callback?: (result) => any) => void;
            getFocusedPrimaryTabId: (callback?: (result) => any) => void;
            openPrimaryTab: (tabId: string, url: string, active: boolean, tabLabel?: string, callback?: (result) => any) => void;
            focusPrimaryTabById: (id: string, callback?: (result) => any) => void;
            getPrimaryTabIds: (callback?: (result) => any) => void;
        };
    };
}
declare module Coveo {
    class SalesforceUtilities {
        static isInSalesforce(): boolean;
        static isInSalesforceConsole(): boolean;
        static focusOrOpenTab(url: string, tabText: string, openInPrimaryTab?: boolean): void;
        static getSfIdFromUrl(url: string): string;
        static expandStringUsingRecord(value: string, record: any): string;
        static expandStringUsingExpert(value: string, expert: any): string;
        static cleanSentenceForQuery(sentence: string): string;
    }
}
declare module Coveo {
    interface SalesforceResultLinkOptions extends IResultLinkOptions {
        openInPrimaryTab: boolean;
        openInSubTab: boolean;
    }
    class SalesforceResultLink extends ResultLink {
        element: HTMLElement;
        options: SalesforceResultLinkOptions;
        result: IQueryResult;
        static ID: string;
        static options: SalesforceResultLinkOptions;
        constructor(element: HTMLElement, options?: SalesforceResultLinkOptions, bindings?: IResultsComponentBindings, result?: IQueryResult);
        protected bindEventToOpen(): boolean;
    }
}
declare var userActionsHandler: Coveo.UserActionsHandler;
declare module Coveo {
    interface UserActionsOptions {
        filters?: string[];
        showButton?: boolean;
        enableBindOnBox?: boolean;
    }
    interface APIAnalyticsEvent {
        type: string;
        dateTime: number;
        eventMetadata: any;
    }
    interface APIAnalyticsSession {
        events: APIAnalyticsEvent[];
        numberOfEvents: number;
        visitId: string;
    }
    interface APIAnalyticsVisitResponse {
        visits: APIAnalyticsSession[];
        totalNumberOfVisits: number;
        message?: string;
        type?: string;
    }
    interface UserActionsHandler {
        getDataFromUA: (callback: any) => any;
    }
    class UserActions extends Component {
        element: HTMLElement;
        options: UserActionsOptions;
        bindings: IComponentBindings;
        static ID: string;
        static DEFAULT_FILTERS: string[];
        static options: UserActionsOptions;
        private eventListBox;
        private loadingBox;
        private handler;
        constructor(element: HTMLElement, options?: UserActionsOptions, bindings?: IComponentBindings);
        setHandler(handler: UserActionsHandler): void;
        setFilters(filters: string[]): void;
        private handleChangeAnalyticsEvents(e, args);
        private render();
        open(): void;
        toggle(): void;
        close(): void;
        private renderEvents(visits);
        private renderEvent(event);
        private renderField(fieldTitle, fieldValue);
        private renderLinkField(fieldTitle, fieldValue, fieldLink);
        private renderHeaderBox(session);
        private renderButton();
    }
}
declare module Coveo {
    interface EnterOnSearchboxEventArgs {
        expression: string;
    }
    interface QuickviewLoadedEventArgs {
        duration: number;
    }
    interface OpenQuickviewEventArgs {
        termsToHighlight: Array<string>;
    }
    interface AttachToCaseEventArgs {
        result: IQueryResult;
        dataToAttach: any;
    }
    interface DetachFromCaseEventArgs {
        result: IQueryResult;
    }
    class UserActionEvents {
        static enterOnSearchbox: string;
        static quickviewLoaded: string;
        static openQuickview: string;
        static attachToCase: string;
        static detachFromCase: string;
        static attachToCaseStateChanged: string;
    }
}
declare module Coveo {
    interface AttachToCaseOptions {
        displayText?: boolean;
        readonly?: boolean;
    }
    interface ResultToAttach {
        uriHash: string;
        resultUrl: string;
        source: string;
        title: string;
        name: string;
        customs: any;
        knowledgeArticleId: string;
        articleLanguage: string;
        articleVersionNumber: string;
    }
    interface AttachToCaseStateChangedArg {
        target: HTMLElement;
        urihash: string;
        loading: boolean;
    }
    interface AttachToCaseCallbackArg {
        succeeded: boolean;
        message: string;
    }
    interface AttachToCaseDataArg {
        succeeded: boolean;
        message: string;
        attachedResults: string[];
    }
    interface AttachToCaseEndpoint {
        attachToCase: (dataToAttach: ResultToAttach, callback: (arg: AttachToCaseCallbackArg) => void) => boolean;
        detachFromCase: (uriHash: string, sfkbid: string, callback: (arg: AttachToCaseCallbackArg) => void) => boolean;
        data: AttachToCaseDataArg;
        caseId: string;
    }
    class AttachToCase extends Component {
        element: HTMLElement;
        options: AttachToCaseOptions;
        bindings: IComponentBindings;
        result: IQueryResult;
        static ID: string;
        static options: AttachToCaseOptions;
        protected buttonElement: JQuery;
        protected textElement: JQuery;
        protected attachToCaseEndpoint: AttachToCaseEndpoint;
        protected attachedResults: string[];
        protected attached: boolean;
        protected loading: boolean;
        protected initialized: boolean;
        constructor(element: HTMLElement, options?: AttachToCaseOptions, bindings?: IComponentBindings, result?: IQueryResult);
        private initialize();
        attach(): void;
        detach(): boolean;
        setAttachToCaseEndpoint(endpoint: AttachToCaseEndpoint): void;
        isAttached(): boolean;
        protected handleClick(): void;
        private handleData(arg);
        private handleAttachCallback(arg);
        private handleDetachCallback(arg);
        private handleStateChanged(arg);
        protected renderButton(): void;
        protected handleHover(isIn: boolean): void;
        protected sendStateChangedEvent(): void;
        protected updateButton(sendEvent?: boolean): void;
    }
}
declare module Coveo {
    class AttachedResultsTab extends Tab {
        element: HTMLElement;
        options: ITabOptions;
        static ID: string;
        private attachToCaseEndpoint;
        constructor(element: HTMLElement, options?: ITabOptions, bindings?: IComponentBindings);
        setAttachToCaseEndpoint(endpoint: AttachToCaseEndpoint): void;
        private handleBuildingQueryForAttachedResults(e, data);
        private getExpressions();
    }
}
