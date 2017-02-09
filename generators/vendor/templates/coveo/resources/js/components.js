var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../../../node_modules/coveo-search-ui/bin/ts/CoveoJsSearch.d.ts" />
var Coveo;
(function (Coveo) {
    var SalesforceUtilities = (function () {
        function SalesforceUtilities() {
        }
        SalesforceUtilities.isInSalesforce = function () {
            return window.sforce != undefined;
        };
        SalesforceUtilities.isInSalesforceConsole = function () {
            return SalesforceUtilities.isInSalesforce() && window.sforce.console != undefined && window.sforce.console.isInConsole();
        };
        SalesforceUtilities.focusOrOpenTab = function (url, tabText, openInPrimaryTab) {
            if (openInPrimaryTab === void 0) { openInPrimaryTab = false; }
            url = typeof url !== 'undefined' ? url : "";
            var originalUrl = url;
            url = url.split('#')[0].split('?')[0];
            var urlId = this.getSfIdFromUrl(url);
            var endsWith = function (str, suffix) {
                if (!(str && suffix))
                    return false;
                return str.indexOf(suffix, str.length - suffix.length) !== -1;
            };
            var resultError = function (result) {
                if (!result.success) {
                    openSubtab(focusedPrimaryTabId, url);
                    return true;
                }
                return false;
            };
            // Open in subtab
            var subtabCount = 0;
            var tabFocused = false;
            var subtabIndex = 0;
            var focusedPrimaryTabId = null;
            var openSubtab = function (primaryTabId, url) {
                window.sforce.console.openSubtab(primaryTabId, originalUrl, true, tabText, null, function openSuccess(result) {
                    if (!result.success) {
                        window.open(originalUrl);
                    }
                });
            };
            var handleGetSubtabInfo = function (result, id) {
                if (!resultError(result)) {
                    subtabIndex++;
                    if (!tabFocused) {
                        var tabUrl = $.parseJSON(result.pageInfo).url;
                        tabUrl = tabUrl ? tabUrl.split('#')[0].split('?')[0] : tabUrl;
                        var tabUrlId = $.parseJSON(result.pageInfo).objectId;
                        tabUrlId = tabUrlId ? tabUrlId.substr(0, 15) : tabUrl;
                        if ((tabUrlId == urlId) || (endsWith(url, tabUrl) || endsWith(tabUrl, url))) {
                            window.sforce.console.focusSubtabById(id);
                            tabFocused = true;
                        }
                        subtabCount--;
                        if (!tabFocused && (subtabCount == 0)) {
                            openSubtab(focusedPrimaryTabId, url);
                        }
                    }
                }
            };
            var handleGetSubTabIds = function (result) {
                if (!resultError(result)) {
                    subtabCount = result.ids.length;
                    for (var i = 0; i < result.ids.length; i++) {
                        window.sforce.console.getPageInfo(result.ids[i], function (newResult) {
                            handleGetSubtabInfo(newResult, result.ids[subtabIndex]);
                        });
                    }
                }
            };
            var handleGetFocusedPrimaryTabId = function (result) {
                if (!resultError(result)) {
                    focusedPrimaryTabId = result.id;
                    window.sforce.console.getSubtabIds(result.id, handleGetSubTabIds);
                }
            };
            if (!openInPrimaryTab) {
                window.sforce.console.getFocusedPrimaryTabId(handleGetFocusedPrimaryTabId);
            }
            // Open in primary tab
            var primaryTabCount = 0;
            var primaryTabIndex = 0;
            var openPrimaryTab = function (url) {
                window.sforce.console.openPrimaryTab(null, originalUrl, true, tabText, function openSuccess(result) {
                    if (!result.success) {
                        window.open(originalUrl);
                    }
                });
            };
            var handleGetPrimaryTabInfo = function (result, id) {
                if (!resultError(result)) {
                    primaryTabIndex++;
                    if (!tabFocused) {
                        var tabUrl = $.parseJSON(result.pageInfo).url;
                        tabUrl = tabUrl ? tabUrl.split('#')[0].split('?')[0] : tabUrl;
                        var tabUrlId = $.parseJSON(result.pageInfo).objectId;
                        tabUrlId = tabUrlId ? tabUrlId.substr(0, 15) : tabUrl;
                        if ((tabUrlId == urlId) || (endsWith(url, tabUrl) || endsWith(tabUrl, url))) {
                            window.sforce.console.focusPrimaryTabById(id);
                            tabFocused = true;
                        }
                        primaryTabCount--;
                        if (!tabFocused && (primaryTabCount == 0)) {
                            openPrimaryTab(url);
                        }
                    }
                }
            };
            var handleGetPrimaryTabIds = function (result) {
                if (!resultError(result)) {
                    primaryTabCount = result.ids.length;
                    for (var i = 0; i < result.ids.length; i++) {
                        window.sforce.console.getPageInfo(result.ids[i], function (newResult) {
                            handleGetPrimaryTabInfo(newResult, result.ids[primaryTabIndex]);
                        });
                    }
                }
            };
            if (openInPrimaryTab) {
                window.sforce.console.getPrimaryTabIds(handleGetPrimaryTabIds);
            }
        };
        SalesforceUtilities.getSfIdFromUrl = function (url) {
            var id = url.substr((url.lastIndexOf('/') + 1), 18);
            var idIsValid = /^\w+$/.test(id);
            if (!idIsValid) {
                return url.split('#')[0].split('?')[0];
            }
            return id.substr(0, 15);
        };
        SalesforceUtilities.expandStringUsingRecord = function (value, record) {
            if (value != null) {
                var matches = value.match(/\{!(>?)(.*?)\}/g);
                if (matches != null) {
                    for (var i = 0; i < matches.length; i++) {
                        var match = matches[i];
                        var groups = /\{!(>?)(.*?)\}/g.exec(match);
                        var cleanup = groups[1] === '>';
                        var fieldName = groups[2].toLowerCase();
                        var fieldValue = '';
                        if (record[fieldName] != null) {
                            fieldValue = record[fieldName].toString();
                            if (cleanup) {
                                fieldValue = SalesforceUtilities.cleanSentenceForQuery(fieldValue);
                            }
                        }
                        value = value.replace(groups[0], fieldValue);
                    }
                }
            }
            return value;
        };
        SalesforceUtilities.expandStringUsingExpert = function (value, expert) {
            if (value != null) {
                var matches = value.match(/%(\w+)%/g);
                if (matches != null) {
                    for (var i = 0; i < matches.length; i++) {
                        var match = matches[i];
                        var groups = /%(\w+)%/g.exec(match);
                        var fieldName = groups[1].toLowerCase();
                        var fieldValue = Coveo.Utils.getFieldValue(expert, fieldName);
                        if (fieldValue != null) {
                            fieldValue = SalesforceUtilities.cleanSentenceForQuery(fieldValue);
                        }
                        else {
                            fieldValue = '';
                        }
                        value = value.replace(groups[0], fieldValue);
                    }
                }
            }
            return value;
        };
        SalesforceUtilities.cleanSentenceForQuery = function (sentence) {
            return sentence.replace(/[\[\]"'\(\),\.@=<>:]/g, '');
        };
        return SalesforceUtilities;
    }());
    Coveo.SalesforceUtilities = SalesforceUtilities;
})(Coveo || (Coveo = {}));
/// <reference path="../../../../node_modules/coveo-search-ui/bin/ts/CoveoJsSearch.d.ts" />
/// <reference path="SalesforceUtils.ts" />
var Coveo;
(function (Coveo) {
    // This class is, as it's name implied, used only in the salesforce integration to handle
    // results link that can be opened in the console correctly.
    // When the page is created in salesforce (interface editor) all CoveoResultLink are replaced with CoveoSalesforceResultLink.
    var SalesforceResultLink = (function (_super) {
        __extends(SalesforceResultLink, _super);
        function SalesforceResultLink(element, options, bindings, result) {
            _super.call(this, element, Coveo.ComponentOptions.initComponentOptions(element, SalesforceResultLink, options), bindings, result);
            this.element = element;
            this.options = options;
            this.result = result;
        }
        SalesforceResultLink.prototype.bindEventToOpen = function () {
            var _this = this;
            if (Coveo.SalesforceUtilities.isInSalesforceConsole()) {
                var eventWasBinded = false;
                if (this.options.openInPrimaryTab) {
                    $(this.element).click(function () {
                        Coveo.SalesforceUtilities.focusOrOpenTab(decodeURIComponent(_this.result.clickUri), _this.result.title, true);
                    });
                    eventWasBinded = true;
                }
                else if (this.options.openInSubTab) {
                    $(this.element).click(function () {
                        Coveo.SalesforceUtilities.focusOrOpenTab(decodeURIComponent(_this.result.clickUri), _this.result.title, false);
                    });
                    eventWasBinded = true;
                }
                if (!eventWasBinded) {
                    eventWasBinded = _super.prototype.bindEventToOpen.call(this);
                }
                return eventWasBinded;
            }
            else {
                return _super.prototype.bindEventToOpen.call(this);
            }
        };
        SalesforceResultLink.ID = 'SalesforceResultLink';
        SalesforceResultLink.options = _.extend({}, {
            openInPrimaryTab: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true }),
            openInSubTab: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: false })
        }, Coveo.ResultLink.options);
        return SalesforceResultLink;
    }(Coveo.ResultLink));
    Coveo.SalesforceResultLink = SalesforceResultLink;
    Coveo.Initialization.registerAutoCreateComponent(SalesforceResultLink);
})(Coveo || (Coveo = {}));
/// <reference path="../../../../node_modules/coveo-search-ui/bin/ts/CoveoJsSearch.d.ts" />
var Coveo;
(function (Coveo) {
    var UserActions = (function (_super) {
        __extends(UserActions, _super);
        function UserActions(element, options, bindings) {
            var _this = this;
            _super.call(this, element, UserActions.ID, bindings);
            this.element = element;
            this.options = options;
            this.bindings = bindings;
            this.options = Coveo.ComponentOptions.initComponentOptions(element, UserActions, options);
            $(this.root).on(Coveo.AnalyticsEvents.changeAnalyticsCustomData, $.proxy(this.handleChangeAnalyticsEvents, this));
            if (typeof userActionsHandler != "undefined") {
                this.setHandler(userActionsHandler);
            }
            this.render();
            if (this.options.enableBindOnBox) {
                $(element).closest('.CoveoBoxPopup').on('onPopupOpen', function () {
                    _this.open();
                });
            }
        }
        UserActions.prototype.setHandler = function (handler) {
            this.handler = handler;
        };
        UserActions.prototype.setFilters = function (filters) {
            this.options.filters = filters;
        };
        UserActions.prototype.handleChangeAnalyticsEvents = function (e, args) {
            if (args.actionType == Coveo.analyticsActionCauseList.getUserHistory.type ||
                args.actionType == Coveo.analyticsActionCauseList.userActionDocumentClick.type) {
                args.originLevel2 = UserActions.ID;
            }
        };
        UserActions.prototype.render = function () {
            var _this = this;
            if (this.options.showButton) {
                var button = this.renderButton().appendTo(this.element).click(function () {
                    _this.toggle();
                });
            }
            this.loadingBox = $(Coveo.DomUtils.getBasicLoadingAnimation()).hide().appendTo(this.element);
            this.eventListBox = $("<div>").addClass("coveo-useractions-events-list").hide().appendTo(this.element);
        };
        UserActions.prototype.open = function () {
            var _this = this;
            if (this.eventListBox.is(':empty') && this.handler != null) {
                this.loadingBox.show();
                this.usageAnalytics.logCustomEvent(Coveo.analyticsActionCauseList.getUserHistory, null, this.element);
                this.handler.getDataFromUA(function (sessions) {
                    _this.renderEvents(sessions);
                });
            }
            else {
                this.eventListBox.slideDown();
            }
        };
        UserActions.prototype.toggle = function () {
            if (this.eventListBox.is(':visible')) {
                this.close();
            }
            else {
                this.open();
            }
        };
        UserActions.prototype.close = function () {
            if (this.eventListBox.is(':visible')) {
                this.eventListBox.slideUp();
            }
        };
        UserActions.prototype.renderEvents = function (visits) {
            var _this = this;
            this.eventListBox.empty();
            if (visits.message != null) {
                if (visits.type == "NoVisitIdError") {
                    this.logger.info(visits.message, visits.type, visits);
                    $("<span>").text(Coveo.l("UserActionsNoVisitId")).addClass("coveo-useractions-nodata").appendTo(this.eventListBox);
                }
                else {
                    this.logger.error(visits.message, visits.type, visits);
                    $("<span>").text(Coveo.l("UserActionsErrorOccured")).addClass("coveo-useractions-nodata").appendTo(this.eventListBox);
                }
            }
            else if (visits.totalNumberOfVisits > 0) {
                if (visits.visits[0].numberOfEvents > 0) {
                    this.renderHeaderBox(visits.visits[0]).appendTo(this.eventListBox);
                    _.each(visits.visits[0].events, function (event) {
                        if (_.contains(_this.options.filters, event.eventMetadata.actionCause) ||
                            _.contains(_this.options.filters, event.eventMetadata.customEventValue)) {
                            _this.renderEvent(event).appendTo(_this.eventListBox);
                        }
                    });
                }
            }
            else {
                $("<span>").text(Coveo.l("NoData")).addClass("coveo-useractions-nodata").appendTo(this.eventListBox);
            }
            this.loadingBox.hide();
            this.eventListBox.slideToggle();
        };
        UserActions.prototype.renderEvent = function (event) {
            var box = $("<div>").addClass("coveo-useractions-event");
            var rightBox = $("<div>").addClass("coveo-useractions-event-right").appendTo(box);
            var leftBox = $("<div>").addClass("coveo-useractions-event-left").appendTo(box);
            this.renderField(Coveo.l("Time"), new Date(event.dateTime).toLocaleTimeString()).appendTo(leftBox);
            if (event.eventMetadata.documentTitle && event.eventMetadata.documentURL) {
                this.renderLinkField(Coveo.l("Document"), event.eventMetadata.documentTitle, event.eventMetadata.documentURL).appendTo(rightBox);
            }
            if (event.eventMetadata.queryExpression) {
                this.renderField(Coveo.l("UserQuery"), event.eventMetadata.queryExpression).appendTo(rightBox);
            }
            if (event.eventMetadata.customEventValue == "pageView") {
                this.renderLinkField(event.type, event.eventMetadata.originLevel3, event.eventMetadata.originLevel3).appendTo(rightBox);
            }
            else if (event.eventMetadata.customEventValue) {
                this.renderField(event.type, event.eventMetadata.customEventValue).appendTo(rightBox);
            }
            if (rightBox.is(':empty')) {
                this.renderField(Coveo.l("EventType"), event.type + (event.eventMetadata.actionCause ? ", " + event.eventMetadata.actionCause : "")).appendTo(rightBox);
            }
            return box;
        };
        UserActions.prototype.renderField = function (fieldTitle, fieldValue) {
            var fieldBox = $("<div>");
            if (fieldValue) {
                $("<span>").addClass("coveo-useractions-event-title").text(fieldTitle).appendTo(fieldBox);
                $("<span>").addClass("coveo-useractions-event-value-expand").text(fieldValue).appendTo(fieldBox);
            }
            return fieldBox;
        };
        UserActions.prototype.renderLinkField = function (fieldTitle, fieldValue, fieldLink) {
            var _this = this;
            var fieldBox = $("<div>");
            if (fieldValue) {
                $("<span>").addClass("coveo-useractions-event-title").text(fieldTitle).appendTo(fieldBox);
                $("<a>").addClass("coveo-useractions-event-value-expand CoveoResultLink")
                    .text(fieldValue).attr("href", fieldLink)
                    .attr("target", "_blanc").appendTo(fieldBox)
                    .click(function () {
                    _this.usageAnalytics.logCustomEvent(Coveo.analyticsActionCauseList.userActionDocumentClick, {
                        author: null,
                        documentTitle: fieldValue,
                        documentURL: fieldLink
                    }, _this.element);
                });
            }
            return fieldBox;
        };
        UserActions.prototype.renderHeaderBox = function (session) {
            var box = $("<div>").addClass("coveo-useractions-event").addClass("coveo-useractions-event-header");
            var rightBox = $("<div>").addClass("coveo-useractions-event-right").appendTo(box);
            var leftBox = $("<div>").addClass("coveo-useractions-event-left").appendTo(box);
            var startDate = new Date(session.events[0].dateTime).toDateString();
            var startTime = new Date(session.events[0].dateTime).toLocaleTimeString();
            var duration = Coveo.DateUtils.timeBetween(new Date(session.events[0].dateTime), new Date(session.events[session.numberOfEvents - 1].dateTime));
            this.renderField(Coveo.l("StartDate"), startDate).appendTo(leftBox);
            this.renderField(Coveo.l("StartTime"), startTime).css("float", "left").appendTo(rightBox);
            this.renderField(Coveo.l("DurationTitle"), duration).css("float", "right").appendTo(rightBox);
            return box;
        };
        UserActions.prototype.renderButton = function () {
            return $("<div>").addClass("coveo-useractions-button").append($("<span>").text(Coveo.l("ShowUserActions").toUpperCase()));
        };
        UserActions.ID = 'UserActions';
        UserActions.DEFAULT_FILTERS = ['searchboxSubmit', 'documentOpen', 'documentQuickview', 'pageVisit', 'pageView', 'createCase'];
        UserActions.options = {
            showButton: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: false }),
            enableBindOnBox: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true }),
            filters: Coveo.ComponentOptions.buildListOption({ defaultValue: UserActions.DEFAULT_FILTERS })
        };
        return UserActions;
    }(Coveo.Component));
    Coveo.UserActions = UserActions;
    Coveo.Initialization.registerAutoCreateComponent(UserActions);
})(Coveo || (Coveo = {}));
/// <reference path="../../../../node_modules/coveo-search-ui/bin/ts/CoveoJsSearch.d.ts" />
var Coveo;
(function (Coveo) {
    var UserActionEvents = (function () {
        function UserActionEvents() {
        }
        UserActionEvents.enterOnSearchbox = "enterOnSearchbox";
        UserActionEvents.quickviewLoaded = "quickviewLoaded";
        UserActionEvents.openQuickview = "openQuickview";
        UserActionEvents.attachToCase = "attachToCase";
        UserActionEvents.detachFromCase = "detachFromCase";
        UserActionEvents.attachToCaseStateChanged = "attachToCaseStateChanged";
        return UserActionEvents;
    }());
    Coveo.UserActionEvents = UserActionEvents;
})(Coveo || (Coveo = {}));
/// <reference path="../../../../node_modules/coveo-search-ui/bin/ts/CoveoJsSearch.d.ts" />
/// <reference path="../UserActions/UserActions.ts" />
/// <reference path="../Events/UserActionEvents.ts" />
var Coveo;
(function (Coveo) {
    var AttachToCase = (function (_super) {
        __extends(AttachToCase, _super);
        function AttachToCase(element, options, bindings, result) {
            _super.call(this, element, AttachToCase.ID);
            this.element = element;
            this.options = options;
            this.bindings = bindings;
            this.result = result;
            this.options = Coveo.ComponentOptions.initComponentOptions(element, AttachToCase, options);
            this.result = this.result || this.resolveResult();
            this.searchInterface = this.searchInterface || this.resolveSearchInterface();
            this.attached = false;
            this.loading = false;
            this.initialized = false;
            if (typeof (attachToCaseEndpoint) != "undefined" && attachToCaseEndpoint != null) {
                this.setAttachToCaseEndpoint(attachToCaseEndpoint);
            }
            else {
                this.logger.warn("No endpoint detected, make sure to set one using the SetAttachToCaseEndpoint method.");
            }
        }
        AttachToCase.prototype.initialize = function () {
            var _this = this;
            if (this.attachToCaseEndpoint != null) {
                if (this.attachToCaseEndpoint.data.succeeded) {
                    this.handleData(this.attachToCaseEndpoint.data);
                    $(this.root).on(Coveo.UserActionEvents.attachToCaseStateChanged, function (e, arg) { return _this.handleStateChanged(arg); });
                    this.renderButton();
                    this.initialized = true;
                }
                else {
                    this.logger.error("An error occured while getting attached results", attachToCaseEndpoint.data.message);
                }
            }
            else {
                this.logger.warn("No endpoint detected, make sure to set one using the SetAttachToCaseEndpoint method.");
            }
        };
        AttachToCase.prototype.attach = function () {
            var _this = this;
            if (this.isAttached() && this.initialized && !this.loading) {
                return;
            }
            this.loading = true;
            this.updateButton();
            var resultToAttach = {
                resultUrl: this.result.clickUri,
                source: this.result.raw.source,
                title: Coveo.StringAndHoles.shortenString(this.result.title, 250, '...').value,
                name: Coveo.StringAndHoles.shortenString(this.result.title, 80, '...').value,
                uriHash: this.result.raw.urihash,
                knowledgeArticleId: this.result.raw.sfkbid,
                articleLanguage: this.result.raw.sflanguage,
                articleVersionNumber: this.result.raw.sfkbversionnumber,
                customs: {}
            };
            var args = {
                result: this.result,
                dataToAttach: resultToAttach
            };
            $(this.root).trigger(Coveo.UserActionEvents.attachToCase, args);
            this.logger.info("Attaching result to case", args);
            this.attachToCaseEndpoint.attachToCase(args.dataToAttach, function (arg) { return _this.handleAttachCallback(arg); });
        };
        AttachToCase.prototype.detach = function () {
            var _this = this;
            if (!this.isAttached() && this.initialized && !this.loading) {
                return false;
            }
            this.loading = true;
            this.updateButton();
            var args = {
                result: this.result
            };
            $(this.root).trigger(Coveo.UserActionEvents.detachFromCase, args);
            this.logger.info("Detaching result from case", args);
            this.attachToCaseEndpoint.detachFromCase(this.result.raw.urihash, this.result.raw.sfkbid, function (arg) { return _this.handleDetachCallback(arg); });
        };
        AttachToCase.prototype.setAttachToCaseEndpoint = function (endpoint) {
            if (endpoint != null) {
                this.attachToCaseEndpoint = endpoint;
                this.initialize();
            }
        };
        AttachToCase.prototype.isAttached = function () {
            return this.attached;
        };
        AttachToCase.prototype.handleClick = function () {
            this.isAttached() ? this.detach() : this.attach();
        };
        AttachToCase.prototype.handleData = function (arg) {
            this.attachedResults = arg.attachedResults;
            this.attached = _.contains(arg.attachedResults, this.result.raw.urihash) || (Coveo.Utils.isNullOrEmptyString(this.result.raw.sfkbid) ? false :
                _.contains(arg.attachedResults, this.result.raw.sfkbid));
        };
        AttachToCase.prototype.handleAttachCallback = function (arg) {
            if (arg != null) {
                if (arg.succeeded) {
                    this.attached = true;
                    this.attachedResults.push(this.result.raw.urihash);
                    if (!Coveo.Utils.isNullOrEmptyString(this.result.raw.sfkbid)) {
                        this.attachedResults.push(this.result.raw.sfkbid);
                    }
                    var customData = {
                        articleID: this.result.raw.sfkbid,
                        caseID: this.attachToCaseEndpoint.caseId,
                        resultUriHash: this.result.raw.urihash,
                        author: this.result.raw.author
                    };
                    this.usageAnalytics.logClickEvent(Coveo.analyticsActionCauseList.caseAttach, {
                        documentTitle: this.result.title,
                        documentURL: this.result.clickUri,
                        author: this.result.raw.author
                    }, this.result, this.root);
                    this.usageAnalytics.logCustomEvent(Coveo.analyticsActionCauseList.caseAttach, customData, this.root);
                }
                else {
                    this.logger.error("Attach failed", arg.message);
                }
            }
            this.loading = false;
            this.updateButton();
        };
        AttachToCase.prototype.handleDetachCallback = function (arg) {
            if (arg != null) {
                if (arg.succeeded) {
                    this.attached = false;
                    delete this.attachedResults[this.attachedResults.indexOf(this.result.raw.urihash)];
                    if (!Coveo.Utils.isNullOrEmptyString(this.result.raw.sfkbid)) {
                        delete this.attachedResults[this.attachedResults.indexOf(this.result.raw.sfkbid)];
                    }
                    var customData = {
                        articleID: this.result.raw.sfkbid,
                        caseID: this.attachToCaseEndpoint.caseId,
                        resultUriHash: this.result.raw.urihash,
                        author: this.result.raw.author
                    };
                    this.usageAnalytics.logCustomEvent(Coveo.analyticsActionCauseList.caseDetach, customData, this.root);
                }
                else {
                    this.logger.error("Detach failed", arg.message);
                }
            }
            this.loading = false;
            this.updateButton();
        };
        AttachToCase.prototype.handleStateChanged = function (arg) {
            if (arg.target != this.element && arg.urihash == this.result.raw.urihash) {
                this.attached = _.contains(this.attachedResults, this.result.raw.urihash) || (Coveo.Utils.isNullOrEmptyString(this.result.raw.sfkbid) ? false :
                    _.contains(this.attachedResults, this.result.raw.sfkbid));
                this.loading = arg.loading;
                this.updateButton(false);
            }
        };
        AttachToCase.prototype.renderButton = function () {
            var _this = this;
            $(this.element).empty();
            this.buttonElement = $(document.createElement("span")).appendTo(this.element);
            if (this.options.displayText) {
                this.textElement = $(document.createElement("span")).appendTo(this.buttonElement);
            }
            if (!this.options.readonly) {
                $(this.element).click(function () { return _this.handleClick(); });
                $(this.element).hover(function () { return _this.handleHover(true); }, function () { return _this.handleHover(false); });
            }
            this.updateButton();
        };
        AttachToCase.prototype.handleHover = function (isIn) {
            if (this.isAttached() && this.options.displayText) {
                this.textElement.text(isIn ? Coveo.l('Detach') : Coveo.l('Attached'));
            }
        };
        AttachToCase.prototype.sendStateChangedEvent = function () {
            var arg = {
                target: this.element,
                urihash: this.result.raw.urihash,
                loading: this.loading
            };
            $(this.root).trigger(Coveo.UserActionEvents.attachToCaseStateChanged, arg);
        };
        AttachToCase.prototype.updateButton = function (sendEvent) {
            if (sendEvent === void 0) { sendEvent = true; }
            this.buttonElement.removeClass();
            if (this.loading) {
                this.buttonElement.addClass("coveo-attach-to-case-loading");
            }
            else if (this.isAttached()) {
                this.buttonElement.addClass("coveo-attach-to-case-attached");
            }
            else {
                this.buttonElement.addClass("coveo-attach-to-case-attach");
            }
            if (this.options.readonly) {
                this.buttonElement.addClass("coveo-attach-to-case-readonly");
            }
            if (this.options.displayText) {
                this.textElement.text(this.isAttached() ? Coveo.l('Attached') : Coveo.l('Attach'));
            }
            if (sendEvent) {
                this.sendStateChangedEvent();
            }
        };
        AttachToCase.ID = 'AttachToCase';
        AttachToCase.options = {
            displayText: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true }),
            readonly: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: false })
        };
        return AttachToCase;
    }(Coveo.Component));
    Coveo.AttachToCase = AttachToCase;
    Coveo.Initialization.registerAutoCreateComponent(AttachToCase);
})(Coveo || (Coveo = {}));
/// <reference path="../../../../node_modules/coveo-search-ui/bin/ts/CoveoJsSearch.d.ts" />
/// <reference path="AttachToCase.ts" />
var Coveo;
(function (Coveo) {
    var AttachedResultsTab = (function (_super) {
        __extends(AttachedResultsTab, _super);
        function AttachedResultsTab(element, options, bindings) {
            _super.call(this, element, options, bindings);
            this.element = element;
            this.options = options;
            $(this.root).on(Coveo.QueryEvents.buildingQuery, $.proxy(this.handleBuildingQueryForAttachedResults, this));
            if (typeof (attachToCaseEndpoint) != "undefined" && attachToCaseEndpoint != null) {
                this.setAttachToCaseEndpoint(attachToCaseEndpoint);
            }
        }
        AttachedResultsTab.prototype.setAttachToCaseEndpoint = function (endpoint) {
            if (endpoint != null) {
                this.attachToCaseEndpoint = endpoint;
            }
        };
        AttachedResultsTab.prototype.handleBuildingQueryForAttachedResults = function (e, data) {
            if (!this.disabled && this.isSelected()) {
                if (this.attachToCaseEndpoint != null && this.attachToCaseEndpoint.data.succeeded) {
                    if (this.options.constant) {
                        data.queryBuilder.constantExpression.add(this.getExpressions());
                    }
                    else {
                        data.queryBuilder.advancedExpression.add(this.getExpressions());
                    }
                }
            }
        };
        AttachedResultsTab.prototype.getExpressions = function () {
            var builder = new Coveo.ExpressionBuilder();
            var sfkbids = [];
            var sysurihashs = [];
            this.attachToCaseEndpoint.data.attachedResults.forEach(function (result) {
                result.indexOf("ka0") == 0 ? sfkbids.push(result) : sysurihashs.push(result);
            });
            if (sysurihashs.length > 0) {
                builder.addFieldExpression("@urihash", "=", sysurihashs);
            }
            if (sfkbids.length > 0) {
                builder.addFieldExpression("@sfkbid", "=", sfkbids);
            }
            // In case we don't have any attached results
            if (sfkbids.length + sysurihashs.length == 0) {
                builder.add("NOT @uri");
            }
            return builder.build(" OR ");
        };
        AttachedResultsTab.ID = 'AttachedResultsTab';
        return AttachedResultsTab;
    }(Coveo.Tab));
    Coveo.AttachedResultsTab = AttachedResultsTab;
    Coveo.Initialization.registerAutoCreateComponent(AttachedResultsTab);
})(Coveo || (Coveo = {}));
// JS UI
/// <reference path="../../node_modules/coveo-search-ui/bin/ts/CoveoJsSearch.d.ts" />
// Components
/// <reference path="./components/SalesforceResultLink/SalesforceResultLink.ts" />
/// <reference path="./components/AttachToCase/AttachToCase.ts" />
/// <reference path="./components/AttachToCase/AttachedResultsTab.ts" />
/// <reference path="./components/UserActions/UserActions.ts" />
