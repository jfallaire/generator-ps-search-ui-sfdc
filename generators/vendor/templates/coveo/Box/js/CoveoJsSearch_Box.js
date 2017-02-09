var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../SalesforceBox.ts" />
var Coveo;
(function (Coveo) {
    var BoxStateModel = (function (_super) {
        __extends(BoxStateModel, _super);
        function BoxStateModel(element, attributes, bindings) {
            var merged = _.extend({}, BoxStateModel.defaultAttributes, attributes);
            _super.call(this, element, BoxStateModel.ID, merged);
        }
        BoxStateModel.prototype.getSimpleEvent = function (name) {
            return this.getEventName(Coveo.Model.eventTypes.changeOne + name);
        };
        BoxStateModel.ID = "boxstate";
        BoxStateModel.defaultAttributes = {
            enableNonContextualSearch: false,
            t: ""
        };
        BoxStateModel.attributesEnum = {
            enableNonContextualSearch: "enableNonContextualSearch",
            t: "t"
        };
        return BoxStateModel;
    }(Coveo.Model));
    Coveo.BoxStateModel = BoxStateModel;
    Coveo.Initialization.registerNamedMethod('boxstate', function (element) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        Coveo.Assert.exists(element);
        var model = Coveo.Component.resolveBinding(element, BoxStateModel);
        return Coveo.setState(model, args);
    });
})(Coveo || (Coveo = {}));
/// <reference path="Container.ts" />
/// <reference path="Container.ts" />
var Coveo;
(function (Coveo) {
    var ContainerInjection = (function () {
        function ContainerInjection() {
            this.editableAttributes = {};
            this.logger = new Coveo.Logger(this);
        }
        ContainerInjection.prototype.withHeader = function (headerKlass) {
            if (this.headerKlass) {
                this.loggerInfo("ContainerHeader", headerKlass, this.headerKlass);
            }
            this.headerKlass = headerKlass;
            var toSetAsEditable = this.fromComponentOptionsToContainerInjectionEditable(headerKlass.options);
            if (toSetAsEditable) {
                if (this.editableAttributes["header"]) {
                    this.loggerInfo("ContainerHeaderEditAttribute", this.editableAttributes["header"], toSetAsEditable);
                }
                this.editableAttributes["header"] = toSetAsEditable;
            }
            return this;
        };
        ContainerInjection.prototype.withBody = function (bodyKlass) {
            if (this.bodyKlass) {
                this.loggerInfo("ContainerBody", bodyKlass, this.bodyKlass);
            }
            this.bodyKlass = bodyKlass;
            var toSetAsEditable = this.fromComponentOptionsToContainerInjectionEditable(bodyKlass.options);
            if (toSetAsEditable) {
                if (this.editableAttributes["body"]) {
                    this.loggerInfo("ContainerBodyEditAttribute", this.editableAttributes["body"], toSetAsEditable);
                }
                this.editableAttributes["body"] = toSetAsEditable;
            }
            return this;
        };
        ContainerInjection.prototype.withFooter = function (footerKlass) {
            if (this.footerKlass) {
                this.loggerInfo("ContainerFooter", footerKlass, this.footerKlass);
            }
            this.footerKlass = footerKlass;
            var toSetAsEditable = this.fromComponentOptionsToContainerInjectionEditable(footerKlass.options);
            if (toSetAsEditable) {
                if (this.editableAttributes["footer"]) {
                    this.loggerInfo("ContainerFooterEditAttribute", this.editableAttributes["footer"], toSetAsEditable);
                }
                this.editableAttributes["footer"] = toSetAsEditable;
            }
            return this;
        };
        ContainerInjection.prototype.withQuery = function (queryKlass) {
            if (this.queryKlass) {
                this.loggerInfo("ContainerQuery", queryKlass, this.queryKlass);
            }
            this.queryKlass = queryKlass;
            var toSetAsEditable = this.fromComponentOptionsToContainerInjectionEditable(queryKlass.options);
            if (toSetAsEditable) {
                if (this.editableAttributes["query"]) {
                    this.loggerInfo("ContainerQueryEditAttribute", this.editableAttributes["query"], toSetAsEditable);
                }
                this.editableAttributes["query"] = toSetAsEditable;
            }
            return this;
        };
        ContainerInjection.prototype.withOptions = function (options) {
            var toSet = this.fromComponentOptionsToContainerInjectionEditable(options);
            if (this.editableAttributes["options"]) {
                this.loggerInfo("ContainerEditAttribute", this.editableAttributes["options"], toSet);
            }
            this.editableAttributes["options"] = toSet;
            return this;
        };
        ContainerInjection.prototype.withContext = function (contextKlass) {
            if (this.contextKlass) {
                this.loggerInfo("ContainerFooter", contextKlass, this.contextKlass);
            }
            this.contextKlass = contextKlass;
            var toSetAsEditable = this.fromComponentOptionsToContainerInjectionEditable(contextKlass.options);
            if (toSetAsEditable) {
                if (this.editableAttributes["context"]) {
                    this.loggerInfo("ContainerContextEditAttribute", this.editableAttributes["context"], toSetAsEditable);
                }
                this.editableAttributes["context"] = toSetAsEditable;
            }
            return this;
        };
        ContainerInjection.prototype.getAttributes = function () {
            return _.chain(this.editableAttributes)
                .map(function (v) {
                return _.map(v, function (attr) {
                    return attr;
                });
            })
                .flatten()
                .value();
        };
        ContainerInjection.prototype.loggerInfo = function (part, oldPart, newPart) {
            this.logger.info(part + " is already added for this container. Overwriting current one.", oldPart, newPart);
        };
        ContainerInjection.prototype.fromComponentOptionsToContainerInjectionEditable = function (options) {
            var ret = {};
            _.each(options, function (v, k) {
                ret[k] = { name: k, defaultValue: v.defaultValue };
            });
            if (_.isEmpty(ret)) {
                return undefined;
            }
            return ret;
        };
        return ContainerInjection;
    }());
    Coveo.ContainerInjection = ContainerInjection;
})(Coveo || (Coveo = {}));
var Coveo;
(function (Coveo) {
    var Salesforce;
    (function (Salesforce) {
    })(Salesforce = Coveo.Salesforce || (Coveo.Salesforce = {}));
})(Coveo || (Coveo = {}));
/// <reference path="ContainerInterfaces.ts" />
/// <reference path="ContainerInjection.ts" />
/// <reference path="SalesforceContext.ts" />
/// <reference path="../../../../node_modules/coveo-search-ui/bin/ts/CoveoJsSearch.d.ts" />
var Coveo;
(function (Coveo) {
    var Container = (function (_super) {
        __extends(Container, _super);
        function Container(element, options, analyticsOptions, injectionFunction, originalOptionsObject) {
            _super.call(this, element, Coveo.ComponentOptions.initComponentOptions(element, Container, options), analyticsOptions, window);
            this.element = element;
            this.injectionFunction = injectionFunction;
            this.originalOptionsObject = originalOptionsObject;
            if (injectionFunction != undefined) {
                var injection = injectionFunction();
                if (injection != undefined) {
                    this.injectContainerSidePanel(injection);
                    this.injectContainerHeader(injection);
                    this.injectContainerBody(injection);
                    this.injectContainerFooter(injection);
                    this.injectContainerQuery(injection);
                    this.injectContainerContext(injection);
                }
            }
        }
        Container.prototype.addGlobalContext = function (key, context) {
            if (this.context[key] != undefined) {
                this.logger.info("Context for " + key + " is already set. Replacing", context);
            }
            this.context[key] = context;
        };
        Container.prototype.getGlobalContext = function (key) {
            Coveo.Assert.isNotUndefined(this.context[key]);
            return this.context[key];
        };
        Container.prototype.injectContainerHeader = function (injection) {
            if (injection.headerKlass) {
                var markup = injection.headerKlass.getMarkup();
                markup.addClass('coveo-container-header');
                $(this.element).append(markup);
            }
        };
        Container.prototype.injectContainerBody = function (injection) {
            if (injection.bodyKlass) {
                var markup = injection.bodyKlass.getMarkup();
                markup.addClass('coveo-container-body');
                $(this.element).append(markup);
            }
        };
        Container.prototype.injectContainerFooter = function (injection) {
            if (injection.footerKlass) {
                var markup = injection.footerKlass.getMarkup();
                markup.addClass('coveo-container-footer');
                $(this.element).append(markup);
            }
        };
        Container.prototype.injectContainerQuery = function (injection) {
            if (injection.queryKlass) {
                var markup = injection.queryKlass.getMarkup();
                $(this.element).append(markup);
            }
        };
        Container.prototype.injectContainerContext = function (injection) {
            if (injection.contextKlass) {
                var markup = injection.contextKlass.getMarkup();
                $(this.element).append(markup);
            }
        };
        Container.prototype.injectContainerSidePanel = function (injection) {
            if (injection.sidePanelKlass) {
                var markup = injection.sidePanelKlass.getMarkup();
                $(this.element).append(markup);
            }
        };
        Container.prototype.getBindings = function () {
            return _.extend(_super.prototype.getBindings.call(this), {
                container: this
            });
        };
        Container.options = _.extend({}, Coveo.SearchInterface.options);
        return Container;
    }(Coveo.SearchInterface));
    Coveo.Container = Container;
})(Coveo || (Coveo = {}));
/// <reference path="Box.ts" />
var Coveo;
(function (Coveo) {
    var BoxExpandLink = (function (_super) {
        __extends(BoxExpandLink, _super);
        function BoxExpandLink(element, options, bindings) {
            var _this = this;
            _super.call(this, element, BoxExpandLink.ID, bindings);
            this.element = element;
            this.options = options;
            this.bindings = bindings;
            this.options = Coveo.ComponentOptions.initComponentOptions(element, BoxExpandLink, options);
            if (Coveo.Utils.isNonEmptyString(this.options.uri)) {
                this.bindAnalyticsEvent();
                this.setBaseHref();
                this.bind.onRootElement(Coveo.QueryEvents.doneBuildingQuery, function (args) {
                    _this.setNewHref(args);
                });
                if (Coveo.SalesforceUtilities.isInSalesforceConsole()) {
                    $(this.element).click(function (e) {
                        e.preventDefault();
                        Coveo.SalesforceUtilities.focusOrOpenTab(_this.currentHref, _this.options.title, _this.options.toPrimaryTab);
                    });
                }
                this.appendIcon();
            }
            else {
                this.logger.warn('Cannot initialized Box Expand Link : uri is undefined ');
                this.logger.warn('Inside salesforce ? Configure the search page inside the package');
            }
        }
        BoxExpandLink.getMarkup = function () {
            return $('<a class="CoveoBoxExpandLink" target="_blank"></a>');
        };
        BoxExpandLink.prototype.appendIcon = function () {
            $(this.element).append('<span class="' + this.options.icon + '"></span><span>' + this.options.text + '</span>');
        };
        BoxExpandLink.prototype.getHd = function () {
            var hd = "";
            if (this.options.hd && !this.bindings.isWaitingForRecord) {
                var box = this.bindings.container;
                if (box.options.record) {
                    hd = Coveo.SalesforceUtilities.expandStringUsingRecord(Coveo.Utils.decodeHTMLEntities(this.options.hd), box.options.record);
                }
            }
            return hd;
        };
        BoxExpandLink.prototype.getHq = function (q, args) {
            var hq = '';
            if (!this.bindings.isWaitingForRecord) {
                if (Coveo.Utils.isNonEmptyString(q)) {
                    hq = args.queryBuilder.computeCompleteExpressionPartsExcept(q).withoutConstant;
                }
                else {
                    hq = args.queryBuilder.computeCompleteExpressionParts().withoutConstant;
                }
            }
            return hq;
        };
        BoxExpandLink.prototype.setBaseHref = function () {
            var href = this.buildHrefFromArguments(this.options.uri, { t: this.getTargetTab(), hd: this.getHd() });
            $(this.element).attr('href', href);
            this.baseHref = this.options.uri;
            if (!this.bindings.isWaitingForRecord && Coveo.Salesforce.record.id.substr(0, 3) == '500') {
                var indexOfQuestionMark = this.baseHref.indexOf("?");
                var indexOfHash = this.baseHref.indexOf("#");
                if (this.baseHref.indexOf('?caseId=') == -1) {
                    if (indexOfQuestionMark >= 0) {
                        this.baseHref = this.baseHref.replace("?", '?caseId=' + encodeURI(Coveo.Salesforce.record.id) + '&');
                    }
                    else if (indexOfHash >= 0) {
                        this.baseHref = this.baseHref.replace("#", '?caseId=' + encodeURI(Coveo.Salesforce.record.id) + '#');
                    }
                    else {
                        this.baseHref += '?caseId=' + encodeURI(Coveo.Salesforce.record.id);
                    }
                }
            }
            this.currentHref = href;
        };
        BoxExpandLink.prototype.setNewHref = function (args) {
            var q = this.bindings.queryStateModel.get(Coveo.QueryStateModel.attributesEnum.q);
            var href = this.buildHrefFromArguments(this.baseHref, {
                q: q,
                hq: this.getHq(q, args),
                t: this.getTargetTab(),
                hd: this.getHd()
            });
            this.currentHref = href;
            $(this.element).attr('href', href);
        };
        BoxExpandLink.prototype.extractBaseHrefFromBaseUri = function (baseHref, hashArguments) {
            var keysFromBase = [], valuesFromBase = [], baseSplit = baseHref.split("#");
            if (baseSplit[1] != undefined) {
                var baseHashSplit = baseSplit[1].split("&");
                _.each(baseHashSplit, function (onePair) {
                    var pairSplit = onePair.split("=");
                    keysFromBase.push(pairSplit[0]);
                    valuesFromBase.push(pairSplit[1]);
                });
            }
            var toMerge = _.object(keysFromBase, valuesFromBase);
            var merged = _.extend({}, toMerge, hashArguments);
            return {
                base: baseSplit[0],
                hashArguments: merged
            };
        };
        BoxExpandLink.prototype.buildHrefFromArguments = function (baseHref, hashArguments) {
            var extracted = this.extractBaseHrefFromBaseUri(baseHref, hashArguments);
            return [extracted.base, _.chain(extracted.hashArguments)
                    .map(function (v, k) {
                    if (v == undefined || v == "" || v == "undefined") {
                        return undefined;
                    }
                    else {
                        return [k, encodeURIComponent(v)].join("=");
                    }
                })
                    .compact()
                    .value()
                    .join("&")]
                .join("#")
                .replace(/#$/, '');
        };
        BoxExpandLink.prototype.bindAnalyticsEvent = function () {
            var _this = this;
            $(this.element).click(function () {
                _this.bindings.usageAnalytics.logCustomEvent(Coveo.analyticsActionCauseList.expandToFullUI, {}, _this.element);
                return true;
            });
        };
        BoxExpandLink.prototype.getTargetTab = function () {
            if (this.options.targetTab) {
                return this.options.targetTab;
            }
            return this.queryStateModel.get(Coveo.QueryStateModel.attributesEnum.t) || '';
        };
        BoxExpandLink.ID = "BoxExpandLink";
        BoxExpandLink.options = {
            uri: Coveo.ComponentOptions.buildStringOption(),
            title: Coveo.ComponentOptions.buildLocalizedStringOption({ defaultValue: Coveo.l('Coveo Search') }),
            hd: Coveo.ComponentOptions.buildLocalizedStringOption({ defaultValue: Coveo.l('Context') }),
            targetTab: Coveo.ComponentOptions.buildStringOption(),
            icon: Coveo.ComponentOptions.buildIconOption({ defaultValue: 'coveo-icon coveo-sprites-box-icon_external' }),
            text: Coveo.ComponentOptions.buildLocalizedStringOption({ defaultValue: Coveo.l('GoToFullSearch') }),
            toPrimaryTab: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true })
        };
        return BoxExpandLink;
    }(Coveo.Component));
    Coveo.BoxExpandLink = BoxExpandLink;
    Coveo.Initialization.registerAutoCreateComponent(BoxExpandLink);
})(Coveo || (Coveo = {}));
/// <reference path="Box.ts" />
var Coveo;
(function (Coveo) {
    var BoxEditLink = (function (_super) {
        __extends(BoxEditLink, _super);
        function BoxEditLink(element, options, bindings) {
            _super.call(this, element, BoxEditLink.ID, bindings);
            this.element = element;
            this.options = options;
            this.bindings = bindings;
            this.options = Coveo.ComponentOptions.initComponentOptions(element, BoxEditLink, options);
            if (bindings.isWaitingForRecord) {
                this.logger.info('Disabling component : No record found to expand query', this);
                return;
            }
            if (Coveo.Utils.isNonEmptyString(this.options.uri)) {
                this.bindAnalyticsEvent();
                this.setBaseHref();
                this.appendIcon();
            }
            else {
                this.logger.warn('No url set for the edition. Inside salesforce ? Current user probably does not have the modifyAllData permission needed to edit the page');
                $(this.element).remove();
            }
        }
        BoxEditLink.getMarkup = function () {
            return $('<a class="CoveoBoxEditLink"></a>');
        };
        BoxEditLink.prototype.setBaseHref = function () {
            if (Coveo.Utils.isNonEmptyString(this.options.uri)) {
                var box = this.bindings.container;
                var queryString = _.chain(this.options.queryStringParams)
                    .map(function (value, key) {
                    if (value == '' || value == null) {
                        return null;
                    }
                    return [encodeURIComponent(key), encodeURIComponent(value)].join("=");
                })
                    .compact()
                    .value()
                    .join("&");
                var href = [this.options.uri, queryString].join("?");
                $(this.element).attr('href', href);
            }
        };
        BoxEditLink.prototype.bindAnalyticsEvent = function () {
            var _this = this;
            $(this.element).click(function () {
                _this.bindings.usageAnalytics.logCustomEvent({ name: 'boxEdit', type: 'box' }, {}, _this.element);
            });
        };
        BoxEditLink.prototype.appendIcon = function () {
            $(this.element).append('<span class="coveo-icon ' + this.options.icon + '"></span><span>' + this.options.text + '</span>');
        };
        BoxEditLink.ID = "BoxEditLink";
        BoxEditLink.options = {
            uri: Coveo.ComponentOptions.buildStringOption(),
            icon: Coveo.ComponentOptions.buildIconOption({ defaultValue: "coveo-sprites-box-settings_gray" }),
            text: Coveo.ComponentOptions.buildLocalizedStringOption({ defaultValue: Coveo.l('GoToEdition') })
        };
        return BoxEditLink;
    }(Coveo.Component));
    Coveo.BoxEditLink = BoxEditLink;
    Coveo.Initialization.registerAutoCreateComponent(BoxEditLink);
})(Coveo || (Coveo = {}));
/// <reference path="Box.ts" />
var Coveo;
(function (Coveo) {
    /**
     * BoxCreateArticle
     * Displays a link to create a Knowledge Article from a Salesforce Case
     */
    var BoxCreateArticle = (function (_super) {
        __extends(BoxCreateArticle, _super);
        function BoxCreateArticle(element, options, bindings) {
            var _this = this;
            _super.call(this, element, BoxCreateArticle.ID, bindings);
            this.element = element;
            this.options = options;
            this.bindings = bindings;
            this.createArticlePage = "/knowledge/publishing/articleEdit.apexp";
            this.options = Coveo.ComponentOptions.initComponentOptions(element, BoxCreateArticle, options);
            if (bindings.isWaitingForRecord) {
                this.logger.info('Disabling component : No record found', this);
                this.element.remove();
                return;
            }
            if (Coveo.Salesforce.knowledgeArticleInfos.isKnowledgeEnabled) {
                if (this.options.articleTypeFilter.length == 0)
                    this.articleTypes = Coveo.Salesforce.knowledgeArticleInfos.types;
                else
                    this.articleTypes = Coveo.Salesforce.knowledgeArticleInfos.types.filter(function (type) { return _.contains(_this.options.articleTypeFilter, type.type); });
                this.renderElement();
            }
            else {
                this.element.remove();
            }
        }
        BoxCreateArticle.prototype.bindAction = function (element, articleType) {
            var _this = this;
            this.bindAnalyticsEvent(element);
            if (Coveo.SalesforceUtilities.isInSalesforceConsole()) {
                element.click(function (e) {
                    e.preventDefault();
                    Coveo.SalesforceUtilities.focusOrOpenTab(_this.buildHref(articleType), Coveo.l('BoxCreateArticle'), _this.options.openInPrimaryTab);
                });
            }
        };
        BoxCreateArticle.prototype.bindAnalyticsEvent = function (element) {
            var _this = this;
            element.click(function () {
                _this.bindings.usageAnalytics.logCustomEvent({ name: 'createArticle', type: 'box' }, {}, _this.element);
            });
        };
        BoxCreateArticle.prototype.renderElement = function () {
            var _this = this;
            var title = $('<span>').text(Coveo.l('BoxCreateArticle')).appendTo(this.element);
            var icon = $('<span class="coveo-icon coveo-sprites-checkbox-more-values"></span>').appendTo(this.element);
            if (this.articleTypes.length == 0) {
                $(this.element).addClass("coveo-box-create-article-disabled");
                $(this.element).click(function (e) {
                    e.preventDefault();
                    _this.logger.error("No ArticleTypes provided");
                });
                return;
            }
            if (this.articleTypes.length == 1) {
                $(this.element).attr("href", this.buildHref(this.articleTypes[0].type));
                this.bindAction($(this.element), this.articleTypes[0].type);
            }
            else {
                var container = $('<div class="coveo-box-create-article-container"></div>').appendTo(this.element);
                var closeTimeout;
                $(this.element).mouseenter(function () {
                    if (closeTimeout) {
                        clearTimeout(closeTimeout);
                    }
                    container.addClass("coveo-box-create-article-container-open");
                });
                $(this.element).mouseleave(function () {
                    closeTimeout = setTimeout(function () {
                        container.removeClass("coveo-box-create-article-container-open");
                    }, 100);
                });
                _.each(this.articleTypes, function (articleType, key) {
                    var el = $('<a class="coveo-box-create-article-container-link" target="_blank">')
                        .text(articleType.label).attr("href", _this.buildHref(articleType.type)).appendTo(container);
                    _this.bindAction(el, articleType.type);
                });
                var leftValue = ($(this.element).width() + 5 - container.width()) / 2;
                container.css("left", leftValue);
            }
            if (this.options.hidden) {
                $(this.element).addClass("coveo-hidden");
            }
        };
        BoxCreateArticle.prototype.buildHref = function (articleType) {
            return this.createArticlePage + '?retURL=' + Coveo.Salesforce.record.id +
                '&sourceId=' + Coveo.Salesforce.record.id + '&sfdc.override=1&type=' + articleType;
        };
        /**
         * Changes the default CreateArticle page
         * @param page The page URL
        */
        BoxCreateArticle.prototype.setCreateArticlePage = function (page) {
            this.createArticlePage = page;
        };
        BoxCreateArticle.ID = "BoxCreateArticle";
        BoxCreateArticle.options = {
            articleTypeFilter: Coveo.ComponentOptions.buildListOption({ defaultValue: [] }),
            hidden: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true }),
            openInPrimaryTab: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true })
        };
        return BoxCreateArticle;
    }(Coveo.Component));
    Coveo.BoxCreateArticle = BoxCreateArticle;
    Coveo.Initialization.registerAutoCreateComponent(BoxCreateArticle);
})(Coveo || (Coveo = {}));
/// <reference path="Box.ts" />
/// <reference path="BoxExpandLink.ts" />
/// <reference path="BoxEditLink.ts" />
/// <reference path="BoxCreateArticle.ts" />
var Coveo;
(function (Coveo) {
    var BoxHeader = (function (_super) {
        __extends(BoxHeader, _super);
        function BoxHeader(element, options, bindings, id) {
            var _this = this;
            if (id === void 0) { id = BoxHeader.ID; }
            _super.call(this, element, id, bindings);
            this.element = element;
            this.options = options;
            this.bindings = bindings;
            this.id = id;
            this.options = Coveo.ComponentOptions.initComponentOptions(element, BoxHeader, options);
            this.buildSubSection();
            if (this.options.allowNonContextualSearch) {
                this.buildContextualSearchInput();
            }
            // We need to preprocess the non contextual search attribute
            // Here is the desired behavior :
            // On page load, the state of the non contextual search is loaded from local storage
            // BUT : We only want to apply it if the search box is empty
            // If it's enabled at page load and the query is empty, we set it to false, but execute the swap
            // the next time that a query is performed in the search box
            var bindOnce = _.once(function () {
                var eventOnNextQChange = _this.queryStateModel.getEventName(Coveo.Model.eventTypes.changeOne + Coveo.QueryStateModel.attributesEnum.q);
                _this.bind.onRootElement(eventOnNextQChange, function (args) {
                    if (args.value) {
                        _this.bindings.boxStateModel.set(Coveo.BoxStateModel.attributesEnum.enableNonContextualSearch, true);
                    }
                });
            });
            var preprocessContextualSearch = this.bindings.boxStateModel.getEventName(Coveo.Model.eventTypes.preprocess);
            this.bind.onRootElement(preprocessContextualSearch, function (args) {
                if (!_this.options.allowNonContextualSearch) {
                    args.enableNonContextualSearch = false;
                }
                else if (args.enableNonContextualSearch && _this.queryStateModel.get(Coveo.QueryStateModel.attributesEnum.q) == '') {
                    args.enableNonContextualSearch = false;
                    bindOnce();
                }
            });
            this.buildSearchBoxSection();
        }
        BoxHeader.getMarkup = function () {
            var expandLink = Coveo.BoxExpandLink.getMarkup();
            var editLink = Coveo.BoxEditLink.getMarkup();
            var ret = $("<div class='CoveoBoxHeader'></div>");
            ret.append(editLink);
            ret.append(expandLink);
            return ret;
        };
        BoxHeader.prototype.buildContextualSearchInput = function () {
            var _this = this;
            var querySummary = this.subSection.find(Coveo.Component.computeSelectorForType(Coveo.BoxQuerySummary.ID));
            this.nonContextualSearchToggle = $('<div class="coveo-contextual-results-toggle"><label>' + Coveo.l('RemoveContext') + '<input type="checkbox" /><div class="coveo-switch"></div></label></div>')
                .addClass('coveo-hidden');
            if (querySummary.length != 0) {
                this.nonContextualSearchToggle.insertAfter(querySummary);
            }
            else {
                this.nonContextualSearchToggle.appendTo(this.subSection);
            }
            this.bind.onRootElement(this.queryStateModel.getEventName(Coveo.Model.eventTypes.changeOne + Coveo.QueryStateModel.attributesEnum.q), function (args) {
                if (args.value) {
                    _this.nonContextualSearchToggle.removeClass('coveo-hidden');
                }
                else {
                    _this.nonContextualSearchToggle.addClass('coveo-hidden');
                }
            });
            this.bind.onRootElement(this.bindings.boxStateModel.getSimpleEvent(Coveo.BoxStateModel.attributesEnum.enableNonContextualSearch), function (args) {
                _this.nonContextualSearchToggle.find('input:checkbox').prop('checked', args.value);
                _this.toggleFancySwitch(args.value);
            });
            this.nonContextualSearchToggle.find('input:checkbox').change(function (e) {
                var checked = $(e.target).prop('checked');
                _this.bindings.boxStateModel.set(Coveo.BoxStateModel.attributesEnum.enableNonContextualSearch, checked);
                if (checked) {
                    _this.usageAnalytics.logSearchEvent(Coveo.analyticsActionCauseList.casecontextAdd, { caseID: Coveo.Salesforce.record.id });
                }
                else {
                    _this.usageAnalytics.logSearchEvent(Coveo.analyticsActionCauseList.casecontextRemove, { caseID: Coveo.Salesforce.record.id });
                }
                _this.toggleFancySwitch(checked);
                _this.queryController.executeQuery();
            });
        };
        BoxHeader.prototype.toggleFancySwitch = function (activate) {
            this.nonContextualSearchToggle.find('.coveo-switch').toggleClass('coveo-active', activate);
        };
        BoxHeader.prototype.buildSubSection = function () {
            var subSectionWrapper = $('<div></div>')
                .addClass('coveo-box-header-sub-section-wrapper');
            this.subSection = $('<div></div>')
                .addClass('coveo-box-header-sub-section');
            $(this.element).children().appendTo(this.subSection);
            subSectionWrapper.append(this.subSection);
            $(this.element).append(subSectionWrapper);
        };
        BoxHeader.prototype.buildSearchbox = function (container) {
            var searchboxDiv = $('<div class="' + Coveo.Component.computeCssClassNameForType(Coveo.Searchbox.ID) + '"></div>');
            $(container).append(searchboxDiv);
            var searchboxOptions = _.extend({}, this.options, this.bindings.container.originalOptionsObject.Searchbox);
            if (searchboxOptions == undefined) {
                searchboxOptions = {};
            }
            if (searchboxOptions.enableSearchAsYouType == undefined) {
                searchboxOptions.enableSearchAsYouType = true;
            }
            if (searchboxOptions.autoFocus == undefined) {
                searchboxOptions.autoFocus = false;
            }
            if (searchboxOptions.enableOmnibox == undefined) {
                searchboxOptions.enableOmnibox = false;
            }
            var searchbox = new Coveo.Searchbox(searchboxDiv.get(0), searchboxOptions, this.bindings);
            $(searchbox.element).find('input').attr('placeholder', this.options.placeholder);
            return searchbox;
        };
        BoxHeader.prototype.buildSettings = function (container) {
            var settingsDiv = document.createElement('div');
            $(container).append(settingsDiv);
            var settingsOptions = _.extend({}, this.options, this.bindings.container.originalOptionsObject.Settings);
            var settings = new Coveo.Settings(settingsDiv, settingsOptions, this.bindings);
            return settings;
        };
        BoxHeader.prototype.buildSearchBoxSection = function () {
            var sectionDiv = document.createElement('div');
            sectionDiv.className = "coveo-box-header-searchbox-section-wrapper";
            if (this.options.includeSearchbox) {
                this.searchbox = this.buildSearchbox(sectionDiv);
            }
            if (this.options.includeSettings) {
                var settingsContainer = document.createElement('div');
                settingsContainer.className = "coveo-box-header-settings-section-wrapper";
                this.settings = this.buildSettings(settingsContainer);
                $(sectionDiv).append(settingsContainer);
            }
            $(this.element).prepend(sectionDiv);
        };
        BoxHeader.ID = "BoxHeader";
        BoxHeader.options = _.extend({}, Coveo.Searchbox.options, {
            includeSearchbox: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true }),
            includeSettings: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: false }),
            enableSearchAsYouType: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true }),
            autoFocus: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: false }),
            placeholder: Coveo.ComponentOptions.buildLocalizedStringOption({ defaultValue: 'Search'.toLocaleString() }),
            allowNonContextualSearch: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: false }),
            searchAsYouTypeDelay: Coveo.ComponentOptions.buildNumberOption({ defaultValue: 300, min: 0 })
        });
        return BoxHeader;
    }(Coveo.Component));
    Coveo.BoxHeader = BoxHeader;
    Coveo.Initialization.registerAutoCreateComponent(BoxHeader);
})(Coveo || (Coveo = {}));
/// <reference path="Box.ts" />
var Coveo;
(function (Coveo) {
    var BoxBody = (function (_super) {
        __extends(BoxBody, _super);
        function BoxBody(element, options, bindings) {
            var _this = this;
            _super.call(this, element, BoxBody.ID, bindings);
            this.element = element;
            this.options = options;
            this.bindings = bindings;
            this.options = Coveo.ComponentOptions.initComponentOptions(element, BoxBody, options);
            this.appendResultList();
            // To get a simple to use scrollable result list, we need
            // to set a max height on the body whenever a query arrives.
            // This is because there can be elements in the page that appear or dissapear depending on what the query returns
            // eg: Did you mean, error report, or any custom components
            this.bind.onRootElement(Coveo.QueryEvents.deferredQuerySuccess, function () { return _this.resize(); });
            this.resizeHandler = function () { return _this.resize(); };
            $(window).resize(this.resizeHandler);
            this.bind.onRootElement(Coveo.InitializationEvents.nuke, this.handleNuke);
            this.resize();
        }
        BoxBody.getMarkup = function () {
            return $("<div class='CoveoBoxBody'></div>");
        };
        BoxBody.prototype.getHeight = function () {
            var _this = this;
            var otherHeight = _.chain($(this.root).children())
                .reject(function (elem) {
                return $(elem).get(0) == $(_this.element).get(0);
            })
                .reduce(function (memo, elem) {
                if ($(elem).css('display') == 'none') {
                    return memo + 0;
                }
                else {
                    return memo + $(elem).outerHeight();
                }
            }, 0)
                .value();
            return otherHeight;
        };
        BoxBody.prototype.resize = function () {
            $(this.element).height($(window).height() - parseInt(this.getHeight().toString()));
        };
        BoxBody.prototype.appendResultList = function () {
            var resultListDiv = $('<div class="' + Coveo.Component.computeCssClassNameForType(Coveo.ResultList.ID) + '"></div>');
            $(this.element).append(resultListDiv);
            var resultListOptions = _.extend({}, this.options, this.bindings.container.options.originalOptionsObject.ResultList);
            if (resultListOptions == undefined) {
                resultListOptions = {};
            }
            if (resultListOptions.enableInfiniteScroll == undefined) {
                resultListOptions.enableInfiniteScroll = true;
            }
            new Coveo.ResultList(resultListDiv.get(0), resultListOptions, this.bindings);
        };
        BoxBody.prototype.handleNuke = function () {
            $(window).off('resize', this.resizeHandler);
        };
        BoxBody.ID = "BoxBody";
        BoxBody.options = _.extend({}, Coveo.ResultList.options, {
            enableInfiniteScroll: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true })
        });
        return BoxBody;
    }(Coveo.Component));
    Coveo.BoxBody = BoxBody;
    Coveo.Initialization.registerAutoCreateComponent(BoxBody);
})(Coveo || (Coveo = {}));
/// <reference path="Box.ts" />
var Coveo;
(function (Coveo) {
    var BoxPopup = (function (_super) {
        __extends(BoxPopup, _super);
        function BoxPopup(element, options, bindings, id) {
            var _this = this;
            if (id === void 0) { id = BoxPopup.ID; }
            _super.call(this, element, id, bindings);
            this.element = element;
            this.options = options;
            this.bindings = bindings;
            this.id = id;
            this.isOpen = false;
            this.options = Coveo.ComponentOptions.initComponentOptions(element, BoxPopup, options);
            this.popupWrapper = $('<div></div>')
                .addClass('coveo-box-popup-wrapper')
                .appendTo(this.element);
            $(this.element).children().appendTo(this.popupWrapper);
            this.buildToggleButton();
            this.close();
            if (this.options.hidden) {
                this.toggleButton.addClass('coveo-hidden');
            }
            $(this.root).on('click', function (e) {
                if (!_this.disabled && e.target != _this.element && $(_this.element).find($(e.target)).length == 0) {
                    _this.close();
                }
            });
            this.bind.onRootElement(Coveo.QueryEvents.querySuccess, function () {
                _this.setTopPosition();
                _this.setToggleHeight();
                _this.setToggleWidth();
            });
        }
        BoxPopup.getMarkup = function () {
            return $("<div class='CoveoBoxPopup'></div>");
        };
        BoxPopup.prototype.setTitle = function (title) {
            this.logger.trace('Setting title', title);
            var toSet = $('<span></span>');
            if (_.isString(title)) {
                toSet.text(title);
            }
            else {
                toSet.append($(title));
            }
            this.buildTitle(toSet);
        };
        BoxPopup.prototype.getTopPosition = function () {
            var header = $(this.root).find('.' + Coveo.Component.computeCssClassNameForType(Coveo.BoxHeader.ID));
            if (header.length != 0) {
                this.top = header.position().top + header.outerHeight();
            }
            else {
                this.top = 0;
            }
            return this.top;
        };
        BoxPopup.prototype.setTopPosition = function () {
            this.top = this.getTopPosition();
        };
        BoxPopup.prototype.setToggleHeight = function () {
            if (this.options.fullHeight) {
                this.popupWrapper.css({
                    'bottom': 0,
                    'top': $(this.element).offset().top + $(this.element).outerHeight() - 5,
                    'position': 'fixed',
                    'height': 'auto',
                    'max-height': 'inherit'
                });
            }
            else {
                this.popupWrapper.css({
                    'top': $(this.element).offset().top + $(this.element).outerHeight() - 5,
                    'position': 'fixed'
                });
            }
        };
        BoxPopup.prototype.setToggleWidth = function () {
            if (this.options.fullWidth) {
                this.popupWrapper.css({
                    'right': 0,
                    'left': 0,
                    'position': 'fixed',
                    'width': 'auto',
                    'max-width': 'inherit'
                });
            }
        };
        BoxPopup.prototype.open = function () {
            this.setTopPosition();
            this.setToggleWidth();
            this.setToggleHeight();
            $(this.element).trigger("onPopupOpen");
            this.logger.trace('Opening popup');
            this.isOpen = true;
            if (this.top == undefined) {
                this.setTopPosition();
            }
            this.setClasses();
            $(window).trigger('resize');
        };
        BoxPopup.prototype.close = function () {
            this.logger.trace('Closing popup');
            this.isOpen = false;
            this.setClasses();
        };
        BoxPopup.prototype.toggle = function () {
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                this.open();
            }
            else {
                this.close();
            }
        };
        BoxPopup.prototype.setClasses = function () {
            $(this.element).toggleClass('coveo-opened', this.isOpen);
            if (this.options.withAnimation) {
                $(this.element).addClass('coveo-with-animation');
            }
        };
        BoxPopup.prototype.buildTitle = function (title) {
            if (title === void 0) { title = this.buildBasicTitle(); }
            if (this.titleElement) {
                this.titleElement.remove();
            }
            this.titleElement = title
                .addClass('coveo-box-popup-title')
                .appendTo(this.toggleButton);
        };
        BoxPopup.prototype.buildBasicTitle = function () {
            var element = $('<span></span>');
            var title = $('<span></span>').text(this.options.title).appendTo(element);
            if (this.options.icon !== undefined && this.options.icon != "") {
                $("<span></span>").addClass("coveo-icon").addClass(this.options.icon).prependTo(element);
            }
            return element;
        };
        BoxPopup.prototype.buildToggleButton = function () {
            var _this = this;
            this.toggleButton = $('<div class="coveo-box-popup-toggle"></div>');
            this.buildTitle();
            $(this.element).prepend(this.toggleButton);
            this.toggleButton.click(function () { return _this.toggle(); });
        };
        BoxPopup.ID = "BoxPopup";
        BoxPopup.options = {
            title: Coveo.ComponentOptions.buildStringOption({ defaultValue: 'Click here to open' }),
            icon: Coveo.ComponentOptions.buildIconOption(),
            withAnimation: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: false }),
            fullWidth: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: false }),
            fullHeight: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: false }),
            hidden: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: false })
        };
        return BoxPopup;
    }(Coveo.Component));
    Coveo.BoxPopup = BoxPopup;
    Coveo.Initialization.registerAutoCreateComponent(BoxPopup);
})(Coveo || (Coveo = {}));
var Coveo;
(function (Coveo) {
    var BoxCurrentTab = (function (_super) {
        __extends(BoxCurrentTab, _super);
        function BoxCurrentTab(element, options, bindings) {
            var _this = this;
            _super.call(this, element, BoxCurrentTab.ID, bindings);
            this.element = element;
            this.options = options;
            this.bindings = bindings;
            var eventName = this.queryStateModel.getEventName(Coveo.Model.eventTypes.changeOne + Coveo.QueryStateModel.attributesEnum.t);
            var foundNearestBoxSidePanel = $(this.element).parentsUntil('.' + Coveo.Component.computeCssClassNameForType(Coveo.BoxPopup.ID)).parent();
            this.bind.onRootElement(Coveo.InitializationEvents.afterComponentsInitialization, function () {
                if (foundNearestBoxSidePanel.length == 1) {
                    _this.nearestBoxSidePanel = Coveo.get(foundNearestBoxSidePanel.get(0));
                    _this.bind.onRootElement(eventName, function (args) { return _this.handleTabChange(args); });
                }
            });
        }
        BoxCurrentTab.prototype.handleTabChange = function (args) {
            var _this = this;
            var selectedTabId = args.value;
            if (Coveo.Utils.isNonEmptyString(selectedTabId)) {
                $(this.root).find(Coveo.Component.computeSelectorForType(Coveo.Tab.ID)).each(function (index, elem) {
                    var tab = Coveo.Component.get(elem, Coveo.Tab);
                    if (tab.options.id == selectedTabId) {
                        if (_this.searchInterface.isNewDesign()) {
                            _this.nearestBoxSidePanel.setTitle($(tab.element).text());
                        }
                        else {
                            _this.nearestBoxSidePanel.setTitle($($(tab.element).html()));
                        }
                        _this.nearestBoxSidePanel.close();
                    }
                });
            }
        };
        BoxCurrentTab.ID = 'BoxCurrentTab';
        return BoxCurrentTab;
    }(Coveo.Component));
    Coveo.BoxCurrentTab = BoxCurrentTab;
    Coveo.Initialization.registerAutoCreateComponent(BoxCurrentTab);
})(Coveo || (Coveo = {}));
var Coveo;
(function (Coveo) {
    var BoxCurrentSort = (function (_super) {
        __extends(BoxCurrentSort, _super);
        function BoxCurrentSort(element, options, bindings) {
            var _this = this;
            _super.call(this, element, BoxCurrentSort.ID, bindings);
            this.element = element;
            this.options = options;
            this.bindings = bindings;
            var eventName = this.queryStateModel.getEventName(Coveo.Model.eventTypes.changeOne + Coveo.QueryStateModel.attributesEnum.sort);
            var foundNearestBoxSidePanel = $(this.element).parentsUntil('.' + Coveo.Component.computeCssClassNameForType(Coveo.BoxPopup.ID)).parent();
            this.bind.onRootElement(Coveo.InitializationEvents.afterComponentsInitialization, function () {
                if (foundNearestBoxSidePanel.length != 0) {
                    _this.nearestBoxSidePanel = Coveo.get(foundNearestBoxSidePanel.get(0));
                    _this.bind.onRootElement(eventName, function (args) { return _this.handleSortChange(args); });
                }
            });
        }
        BoxCurrentSort.prototype.handleSortChange = function (args) {
            var _this = this;
            var selectedSort = args.value;
            if (Coveo.Utils.isNonEmptyString(selectedSort)) {
                $(this.root).find(Coveo.Component.computeSelectorForType(Coveo.Sort.ID)).each(function (index, elem) {
                    var sort = Coveo.Component.get(elem, Coveo.Sort);
                    if (sort && sort.options.sortCriteria.toString().indexOf(selectedSort) != -1) {
                        _this.nearestBoxSidePanel.setTitle($(sort.element.outerHTML)
                            .clone(false, false)
                            .removeClass(Coveo.Component.computeCssClassNameForType(Coveo.Sort.ID))
                            .addClass('CoveoDisplayedSortInContainer')
                            .show());
                        _this.nearestBoxSidePanel.close();
                    }
                });
            }
        };
        BoxCurrentSort.ID = 'BoxCurrentSort';
        return BoxCurrentSort;
    }(Coveo.Component));
    Coveo.BoxCurrentSort = BoxCurrentSort;
    Coveo.Initialization.registerAutoCreateComponent(BoxCurrentSort);
})(Coveo || (Coveo = {}));
/// <reference path="Box.ts" />
var Coveo;
(function (Coveo) {
    var BoxResultAction = (function (_super) {
        __extends(BoxResultAction, _super);
        function BoxResultAction(element, options, bindings, result) {
            var _this = this;
            _super.call(this, element, BoxResultAction.ID, bindings);
            this.element = element;
            this.options = options;
            this.bindings = bindings;
            this.result = result;
            this.options = Coveo.ComponentOptions.initComponentOptions(element, BoxResultAction, options);
            this.menu = $('<div></div>').addClass('coveo-box-result-action-menu').appendTo(this.element);
            this.container = $('<div></div>').addClass('coveo-box-result-action-container').appendTo(this.element);
            if (!this.options.displayInline) {
                $(this.element).addClass('coveo-displayed-in-menu');
                var closeTimeout;
                $(this.element).mouseenter(function () {
                    if (closeTimeout) {
                        clearTimeout(closeTimeout);
                    }
                    _this.menu.addClass('coveo-opened');
                });
                $(this.element).mouseleave(function () {
                    closeTimeout = setTimeout(function () {
                        _this.menu.removeClass('coveo-opened');
                    }, _this.options.menuDelay);
                });
            }
            else {
                $(this.element).addClass('coveo-displayed-inline');
            }
            var replaceElementsOnce = _.once(function () {
                var toMove = [];
                _.each(_this.element.children, function (child) {
                    if (_this.doesImplementIncludedInterface(child)) {
                        toMove.push(child);
                    }
                });
                if (_.isEmpty(toMove)) {
                    _this.logger.warn('BoxResultAction is empty or has no inner elements with which it can populate... removing the component', result, _this);
                    $(_this.element).remove();
                }
                else {
                    _.each(toMove, function (elem) {
                        var menuItem = $('<div></div>').addClass('coveo-box-result-action-menu-item').appendTo(_this.menu);
                        $(Coveo.get(elem)['getTitle'](_this.options.displayInline)).appendTo(menuItem);
                        $(elem).appendTo(_this.container);
                    });
                }
            });
            this.bind.onRootElement(Coveo.ResultListEvents.newResultsDisplayed, function () { return replaceElementsOnce(); });
        }
        BoxResultAction.getMarkup = function () {
            return $("<div class='CoveoBoxResultAction'></div>");
        };
        BoxResultAction.prototype.doesImplementIncludedInterface = function (elem) {
            var elemAsComponent = Coveo.get(elem);
            return elemAsComponent && elemAsComponent['getTitle'];
        };
        BoxResultAction.ID = "BoxResultAction";
        BoxResultAction.options = {
            menuDelay: Coveo.ComponentOptions.buildNumberOption({ defaultValue: 300, min: 0 }),
            displayInline: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: false })
        };
        return BoxResultAction;
    }(Coveo.Component));
    Coveo.BoxResultAction = BoxResultAction;
    Coveo.Initialization.registerAutoCreateComponent(BoxResultAction);
})(Coveo || (Coveo = {}));
/// <reference path="Box.ts" />
var Coveo;
(function (Coveo) {
    var BoxAttachToCase = (function (_super) {
        __extends(BoxAttachToCase, _super);
        function BoxAttachToCase(element, options, bindings, result) {
            _super.call(this, element, options, bindings, result);
            this.element = element;
            this.options = options;
            this.result = result;
            $(element).removeClass(Coveo.Component.computeCssClassNameForType(Coveo.AttachToCase.ID));
        }
        BoxAttachToCase.getMarkup = function () {
            return $('<div class="CoveoBoxAttachToCase"></div>');
        };
        BoxAttachToCase.prototype.getTitle = function (displayedInline) {
            this.displayedInline = displayedInline;
            this.renderButton();
            if (this.buttonElement != null) {
                return this.buttonElement.get(0);
            }
        };
        BoxAttachToCase.prototype.renderButton = function () {
            var _this = this;
            $(this.element).empty();
            this.buttonElement = $('<div class="coveo-box-attachToCase-view-in-menu"></div>');
            this.textElement = $('<div class="coveo-caption"></div>').appendTo(this.buttonElement);
            this.iconElement = $('<div class="coveo-icon"></div>').appendTo(this.buttonElement);
            this.buttonElement.click(function () { return _this.handleClick(); });
            this.updateButton();
        };
        BoxAttachToCase.prototype.updateButton = function (sendEvent) {
            if (sendEvent === void 0) { sendEvent = true; }
            this.iconElement.removeClass();
            if (this.loading) {
                this.iconElement.addClass("coveo-icon coveo-attach-to-case-loading");
            }
            else {
                this.iconElement.addClass("coveo-icon coveo-sprites-attach");
            }
            if (this.displayedInline && !this.loading) {
                if (this.isAttached()) {
                    this.iconElement.removeClass("coveo-sprites-attach");
                    this.iconElement.addClass("coveo-sprites-attached");
                }
                else {
                    this.iconElement.removeClass("coveo-sprites-attached");
                    this.iconElement.addClass("coveo-sprites-attach");
                }
                this.textElement.empty();
            }
            else if (!this.displayedInline) {
                this.textElement.text(this.isAttached() ? Coveo.l('Detach') : Coveo.l('Attach'));
                this.iconElement.removeClass("coveo-sprites-attach");
                this.iconElement.removeClass("coveo-sprites-attached");
            }
            if (sendEvent) {
                this.sendStateChangedEvent();
            }
        };
        BoxAttachToCase.ID = 'BoxAttachToCase';
        return BoxAttachToCase;
    }(Coveo.AttachToCase));
    Coveo.BoxAttachToCase = BoxAttachToCase;
    Coveo.Initialization.registerAutoCreateComponent(BoxAttachToCase);
})(Coveo || (Coveo = {}));
/// <reference path="Box.ts" />
var Coveo;
(function (Coveo) {
    var BoxQuickview = (function (_super) {
        __extends(BoxQuickview, _super);
        function BoxQuickview(element, options, bindings, result) {
            _super.call(this, element, options, bindings, result);
            this.element = element;
            this.options = options;
            this.result = result;
            $(element).removeClass(Coveo.Component.computeCssClassNameForType(Coveo.Quickview.ID));
            if (!Coveo.QueryUtils.hasHTMLVersion(result)) {
                this.logger.warn('Result has no html version... removing Quickview', result, this);
                $(this.element).remove();
            }
        }
        BoxQuickview.getMarkup = function () {
            return $('<div class="CoveoBoxQuickview"></div>');
        };
        BoxQuickview.prototype.getTitle = function (displayedInline) {
            var _this = this;
            var menuDiv;
            if (displayedInline) {
                menuDiv = $('<div title="Quickview" class="coveo-box-quick-view-in-menu"><div class="coveo-icon"></div></div>');
            }
            else {
                menuDiv = $('<div title="Quickview" class="coveo-box-quick-view-in-menu"><div class="coveo-caption">' + Coveo.l('Quickview') + '</div></div>');
            }
            menuDiv.click(function () {
                _this.open();
            });
            return menuDiv.get(0);
        };
        BoxQuickview.ID = 'BoxQuickview';
        return BoxQuickview;
    }(Coveo.Quickview));
    Coveo.BoxQuickview = BoxQuickview;
    Coveo.Initialization.registerAutoCreateComponent(BoxQuickview);
})(Coveo || (Coveo = {}));
/// <reference path="Box.ts" />
var Coveo;
(function (Coveo) {
    var BoxQuerySummary = (function (_super) {
        __extends(BoxQuerySummary, _super);
        function BoxQuerySummary(element, options, bindings) {
            var _this = this;
            _super.call(this, element, BoxQuerySummary.ID, bindings);
            this.element = element;
            this.options = options;
            this.bindings = bindings;
            this.options = Coveo.ComponentOptions.initComponentOptions(element, BoxQuerySummary, options);
            var renderThrottle = _.throttle(function () { return _this.render(); }, 500, { leading: false, trailing: true });
            this.bind.onRootElement(Coveo.InitializationEvents.afterComponentsInitialization, function () {
                var resultListElem = $(_this.root).find(Coveo.Component.computeSelectorForType(Coveo.ResultList.ID));
                _this.resultList = Coveo.get(resultListElem.get(0));
                if (_this.resultList.options.enableInfiniteScroll && _this.resultList.options.infiniteScrollContainer) {
                    $(_this.resultList.options.infiniteScrollContainer).scroll(function () {
                        renderThrottle();
                    });
                }
            });
            this.bind.onRootElement(Coveo.ResultListEvents.newResultsDisplayed, function () {
                renderThrottle();
            });
            this.bind.onRootElement(Coveo.QueryEvents.querySuccess, function (args) {
                _this.totalNumberOfResults = args.results.totalCount;
                _this.render();
            });
        }
        BoxQuerySummary.prototype.render = function () {
            if (this.totalNumberOfResults > 0) {
                if (this.bindings.queryStateModel.get(Coveo.QueryStateModel.attributesEnum.q) == '') {
                    this.element.innerHTML = '';
                    $(this.element).addClass('coveo-hidden');
                }
                else {
                    this.renderWithResults();
                    $(this.element).removeClass('coveo-hidden');
                }
            }
            else {
                this.renderNoResults();
                $(this.element).removeClass('coveo-hidden');
            }
        };
        BoxQuerySummary.prototype.renderWithResults = function () {
            var _this = this;
            $(this.element).removeClass('coveo-displaying-no-results');
            var allResults = $(this.resultList.options.resultContainer).find('.CoveoResult');
            var visibleResults = _.filter(allResults, function (resElement) {
                return $(resElement).position().top + ($(resElement).height() * .75) > 0 && $(resElement).position().top + ($(resElement).height() / 3) < $(_this.resultList.options.infiniteScrollContainer).height();
            });
            if (visibleResults && visibleResults[0]) {
                var first = _.indexOf(allResults, visibleResults[0]) + 1;
                var last = _.indexOf(allResults, visibleResults[visibleResults.length - 1]) + 1;
            }
            if (first != undefined && last != undefined && this.totalNumberOfResults != undefined) {
                $(this.element).html(Coveo.l("ShowingResultsOf", first, last, this.totalNumberOfResults, this.totalNumberOfResults > 1));
            }
        };
        BoxQuerySummary.prototype.renderNoResults = function () {
            $(this.element).addClass('coveo-displaying-no-results');
            var queryEscaped = $('<span></span>').text(this.queryStateModel.get(Coveo.QueryStateModel.attributesEnum.q)).text();
            var strToDisplay = $('<div class="coveo-no-results-string"></div>');
            if (queryEscaped != '') {
                strToDisplay = strToDisplay.html(Coveo.l("noResultFor", "<span class='coveo-highlight'>" + queryEscaped + "</span>"));
            }
            else {
                strToDisplay = strToDisplay.html(Coveo.l('No results'));
            }
            strToDisplay.append(this.getSearchTips());
            $(this.element).empty();
            $(this.element).append(strToDisplay);
        };
        BoxQuerySummary.prototype.getSearchTips = function () {
            var searchTips = $('<ul></ul>');
            $('<li></li>').text(Coveo.l("CheckSpelling")).appendTo(searchTips);
            $('<li></li>').text(Coveo.l("TryUsingFewerKeywords")).appendTo(searchTips);
            if (this.queryStateModel.atLeastOneFacetIsActive()) {
                $('<li></li>').text(Coveo.l("SelectFewerFilters")).appendTo(searchTips);
            }
            var element = $(this.root).find(Coveo.Component.computeSelectorForType(Coveo.BoxHeader.ID));
            var boxHeader = Coveo.get(element.get(0));
            if (boxHeader) {
                if (boxHeader.options.allowNonContextualSearch && !this.bindings.boxStateModel.get(Coveo.BoxStateModel.attributesEnum.enableNonContextualSearch)) {
                    $('<li></li>').text("SelectNonContextualSearch".toLocaleString()).appendTo(searchTips);
                }
            }
            return searchTips;
        };
        BoxQuerySummary.ID = 'BoxQuerySummary';
        BoxQuerySummary.options = {};
        return BoxQuerySummary;
    }(Coveo.Component));
    Coveo.BoxQuerySummary = BoxQuerySummary;
    Coveo.Initialization.registerAutoCreateComponent(BoxQuerySummary);
})(Coveo || (Coveo = {}));
/// <reference path="Box.ts" />
var Coveo;
(function (Coveo) {
    var BoxFieldTable = (function (_super) {
        __extends(BoxFieldTable, _super);
        function BoxFieldTable(element, options, bindings, result) {
            _super.call(this, element, options, bindings, result);
            this.element = element;
            this.options = options;
            $(this.element).addClass(Coveo.Component.computeCssClassNameForType(Coveo.FieldTable.ID));
        }
        BoxFieldTable.prototype.isTogglable = function () {
            return this.options.allowMinimization;
        };
        BoxFieldTable.ID = 'BoxFieldTable';
        return BoxFieldTable;
    }(Coveo.FieldTable));
    Coveo.BoxFieldTable = BoxFieldTable;
    Coveo.Initialization.registerAutoCreateComponent(BoxFieldTable);
})(Coveo || (Coveo = {}));
/// <reference path="Box.ts" />
var Coveo;
(function (Coveo) {
    var BoxResultLink = (function (_super) {
        __extends(BoxResultLink, _super);
        function BoxResultLink() {
            _super.apply(this, arguments);
        }
        BoxResultLink.ID = 'BoxResultLink';
        return BoxResultLink;
    }(Coveo.SalesforceResultLink));
    Coveo.BoxResultLink = BoxResultLink;
    Coveo.Initialization.registerAutoCreateComponent(BoxResultLink);
})(Coveo || (Coveo = {}));
/// <reference path="Box.ts" />
var Coveo;
(function (Coveo) {
    var BoxFollowItem = (function (_super) {
        __extends(BoxFollowItem, _super);
        function BoxFollowItem(element, options, bindings, result) {
            _super.call(this, element, options, bindings, result);
            this.element = element;
            this.options = options;
            this.result = result;
        }
        BoxFollowItem.getMarkup = function () {
            return $('<div class="CoveoBoxFollowItem"></div>');
        };
        BoxFollowItem.prototype.getTitle = function (displayedInline) {
            var _this = this;
            this.menuDiv = $('<div class="coveo-box-follow-item-in-menu">' + this.getText() + '</div>').get(0);
            $(this.menuDiv).click(function () {
                _this.toggleFollow();
            });
            return this.menuDiv;
        };
        BoxFollowItem.prototype.setFollowed = function (subscription) {
            _super.prototype.setFollowed.call(this, subscription);
            this.menuDiv.innerText = this.getText();
        };
        BoxFollowItem.prototype.setNotFollowed = function () {
            _super.prototype.setNotFollowed.call(this);
            this.menuDiv.innerText = this.getText();
        };
        BoxFollowItem.ID = 'BoxFollowItem';
        return BoxFollowItem;
    }(Coveo.FollowItem));
    Coveo.BoxFollowItem = BoxFollowItem;
    Coveo.Initialization.registerAutoCreateComponent(BoxFollowItem);
})(Coveo || (Coveo = {}));
/// <reference path="Box.ts" />
var Coveo;
(function (Coveo) {
    var BoxSearchAlerts = (function (_super) {
        __extends(BoxSearchAlerts, _super);
        function BoxSearchAlerts(element, options, bindings) {
            _super.call(this, element, Coveo.ComponentOptions.initComponentOptions(element, BoxSearchAlerts, options), bindings);
            this.element = element;
            this.options = options;
            $(this.root).find('.coveo-box-header-sub-section-wrapper').css('margin-top', '40px');
        }
        BoxSearchAlerts.getMarkup = function () {
            return $('<div class="CoveoBoxSearchAlerts"></div>');
        };
        BoxSearchAlerts.prototype.openPanel = function () {
            var _this = this;
            return this.queryController.getEndpoint().listSubscriptions().then(function (subscriptions) {
                if (subscriptions.length > 0) {
                    _this.redirectToManageAlertsPage(subscriptions[0].user);
                }
                else {
                    _this.message.showMessage(Coveo.$$(_this.findQueryBoxDom()), Coveo.l("SearchAlerts_PanelNoSearchAlerts"), true);
                }
                return subscriptions[0];
            });
        };
        BoxSearchAlerts.prototype.redirectToManageAlertsPage = function (subscriptionUser) {
            var url = this.queryController.getEndpoint().getBaseAlertsUri() + '/subscriptions/email?email=' + encodeURIComponent(subscriptionUser.email) + '&manageToken=' + encodeURIComponent(subscriptionUser.manageToken);
            // Todo : It would be nice to try to open this in a console subtab, but unfortunately the coveo platform set X-frame option : Deny.
            window.open(url);
        };
        BoxSearchAlerts.ID = 'BoxSearchAlerts';
        return BoxSearchAlerts;
    }(Coveo.SearchAlerts));
    Coveo.BoxSearchAlerts = BoxSearchAlerts;
    Coveo.Initialization.registerAutoCreateComponent(BoxSearchAlerts);
})(Coveo || (Coveo = {}));
/// <reference path="../../SalesforceBox.ts" />
/// <reference path="../Container/Container.ts" />
/// <reference path="BoxInterface.ts" />
/// <reference path="BoxHeader.ts" />
/// <reference path="BoxBody.ts" />
/// <reference path="BoxPopup.ts" />
/// <reference path="BoxCurrentTab.ts" />
/// <reference path="BoxCurrentSort.ts" />
/// <reference path="BoxResultAction.ts" />
/// <reference path="BoxAttachToCase.ts" />
/// <reference path="BoxQuickview.ts" />
/// <reference path="BoxQuerySummary.ts" />
/// <reference path="BoxFieldTable.ts" />
/// <reference path="BoxResultLink.ts" />
/// <reference path="BoxFollowItem.ts" />
/// <reference path="BoxSearchAlerts.ts" />
var Coveo;
(function (Coveo) {
    var Box = (function (_super) {
        __extends(Box, _super);
        function Box(element, options, analyticsOptions, injection, originalOptionsObject) {
            var _this = this;
            if (injection === void 0) { injection = Box.getInjection; }
            _super.call(this, element, Coveo.ComponentOptions.initComponentOptions(element, Box, options), analyticsOptions, injection, originalOptionsObject);
            this.element = element;
            this.options = options;
            this.options = Coveo.ComponentOptions.initComponentOptions(element, Box, options);
            if (!this.options.record) {
                //Coveo.record will be populated when inside Salesforce, or by a mock variable in a dev/test environment
                if (Coveo.Salesforce.record != undefined) {
                    this.options.record = Coveo.Salesforce.record;
                }
            }
            if (!this.options.type) {
                //Coveo.type will be populated when inside Salesforce, or by a mock variable in a dev/test environment
                if (Coveo.Salesforce.type != undefined) {
                    this.options.type = Coveo.Salesforce.type;
                }
            }
            this.boxStateModel = new Coveo.BoxStateModel(element);
            if (this.options.enableBoxStateHistory) {
                if (this.options.useLocalStorageForBoxState) {
                    new Coveo.LocalStorageHistoryController(element, window, this.boxStateModel, this.queryController);
                }
                else {
                    new Coveo.HistoryController(element, window, this.boxStateModel, this.queryController);
                }
                var eventFromQueryState = this.queryStateModel.getEventName(Coveo.Model.eventTypes.changeOne + Coveo.QueryStateModel.attributesEnum.t);
                var eventFromBoxState = this.boxStateModel.getSimpleEvent(Coveo.BoxStateModel.attributesEnum.t);
                $(this.element).on(Coveo.InitializationEvents.restoreHistoryState, function () {
                    $(_this.element).on(eventFromQueryState, function (e, args) {
                        _this.boxStateModel.set(Coveo.BoxStateModel.attributesEnum.t, args.value);
                    });
                });
                $(this.element).on(eventFromBoxState, function (e, args) {
                    _this.queryStateModel.set(Coveo.QueryStateModel.attributesEnum.t, args.value);
                });
            }
            this.resize();
            this.resizeHandler = function () { return _this.resize(); };
            $(window).resize(this.resizeHandler);
            $(this.element).on(Coveo.InitializationEvents.nuke, function () { return _this.handleNuke(); });
            Coveo.Assert.exists(this.options.type);
            $(this.element).addClass(Coveo.Component.computeCssClassNameForType(Box.ID));
        }
        Box.getInjection = function () {
            return new Coveo.ContainerInjection()
                .withOptions(Box.options)
                .withHeader(Coveo.BoxHeader)
                .withBody(Coveo.BoxBody);
        };
        Box.prototype.resize = function () {
            $(this.element).outerHeight($(window).height() - 10);
        };
        Box.prototype.initializeAnalytics = function () {
            var analyticsClass = Coveo.Component.computeCssClassNameForType(Coveo.Analytics.ID);
            if (this.options.withAnalytics && $(this.element).find('.' + analyticsClass).length == 0) {
                $('<div/>').addClass(analyticsClass).appendTo(this.element);
            }
            else if (!this.options.withAnalytics) {
                $(this.element).find('.' + analyticsClass).remove();
            }
            return _super.prototype.initializeAnalytics.call(this);
        };
        Box.prototype.getBindings = function () {
            return _.extend(_super.prototype.getBindings.call(this), {
                boxStateModel: this.boxStateModel,
                isWaitingForRecord: this.options.record == undefined
            });
        };
        Box.prototype.handleNuke = function () {
            $(window).off('resize', this.resizeHandler);
        };
        Box.ID = "Box";
        Box.options = _.extend({}, Coveo.Container.options, {
            type: Coveo.ComponentOptions.buildStringOption(),
            withAnalytics: Coveo.ComponentOptions.buildBooleanOption({
                defaultValue: true
            }),
            useLocalStorageForBoxState: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true }),
            enableBoxStateHistory: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true }),
            excerptLength: Coveo.ComponentOptions.buildNumberOption({ defaultValue: 80, min: 0 }),
            resultsPerPage: Coveo.ComponentOptions.buildNumberOption({ defaultValue: 20, min: 0 }),
            // Change after Box can support the automatic responsive mode correctly
            enableAutomaticResponsiveMode: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: false })
        });
        return Box;
    }(Coveo.Container));
    Coveo.Box = Box;
})(Coveo || (Coveo = {}));
/// <reference path="../Container/Container.ts" />
var Coveo;
(function (Coveo) {
    var ExtensionQRE = (function (_super) {
        __extends(ExtensionQRE, _super);
        function ExtensionQRE(element, options, bindings) {
            var _this = this;
            _super.call(this, element, ExtensionQRE.ID, bindings);
            this.element = element;
            this.options = options;
            this.options = Coveo.ComponentOptions.initComponentOptions(element, ExtensionQRE, options);
            if (!_.isUndefined(this.options.expression) && !_.isUndefined(this.options.modifier) && this.options.bindOnQuery) {
                this.bind.onRootElement(Coveo.QueryEvents.buildingQuery, function (args) { return _this.handleBuildingQuery(args); });
            }
        }
        ExtensionQRE.prototype.getBuilder = function () {
            return new Coveo.ExtensionBuilder('qre', this.options.quotedExpression)
                .withParam('expression', this.options.expression)
                .withParam('modifier', this.options.modifier);
        };
        ExtensionQRE.prototype.handleBuildingQuery = function (args) {
            args.queryBuilder.advancedExpression.add(this.getBuilder().build());
        };
        ExtensionQRE.ID = "ExtensionQRE";
        ExtensionQRE.options = {
            expression: Coveo.ComponentOptions.buildStringOption(),
            modifier: Coveo.ComponentOptions.buildNumberOption(),
            bindOnQuery: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true }),
            quotedExpression: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true })
        };
        return ExtensionQRE;
    }(Coveo.Component));
    Coveo.ExtensionQRE = ExtensionQRE;
    Coveo.Initialization.registerAutoCreateComponent(ExtensionQRE);
})(Coveo || (Coveo = {}));
/// <reference path="../Container/Container.ts" />
var Coveo;
(function (Coveo) {
    var ExtensionQRF = (function (_super) {
        __extends(ExtensionQRF, _super);
        function ExtensionQRF(element, options, bindings) {
            var _this = this;
            _super.call(this, element, ExtensionQRF.ID, bindings);
            this.element = element;
            this.options = options;
            this.options = Coveo.ComponentOptions.initComponentOptions(element, ExtensionQRF, options);
            if (!_.isUndefined(this.options.expression)) {
                this.bind.onRootElement(Coveo.QueryEvents.buildingQuery, function (args) { return _this.handleBuildingQuery(args); });
            }
        }
        ExtensionQRF.prototype.handleBuildingQuery = function (args) {
            var expression = new Coveo.ExtensionBuilder('qrf')
                .withParam('expression', this.options.expression)
                .withParam('normalizeWeight', this.options.normalizeWeight)
                .build();
            args.queryBuilder.advancedExpression.add(expression);
        };
        ExtensionQRF.ID = "ExtensionQRF";
        ExtensionQRF.options = {
            expression: Coveo.ComponentOptions.buildStringOption(),
            normalizeWeight: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true })
        };
        return ExtensionQRF;
    }(Coveo.Component));
    Coveo.ExtensionQRF = ExtensionQRF;
    Coveo.Initialization.registerAutoCreateComponent(ExtensionQRF);
})(Coveo || (Coveo = {}));
/// <reference path="../Container/Container.ts" />
var Coveo;
(function (Coveo) {
    var ExtensionQF = (function (_super) {
        __extends(ExtensionQF, _super);
        function ExtensionQF(element, options, bindings) {
            var _this = this;
            _super.call(this, element, ExtensionQF.ID, bindings);
            this.element = element;
            this.options = options;
            this.options = Coveo.ComponentOptions.initComponentOptions(element, ExtensionQF, options);
            if (!_.isUndefined(this.options.func && !_.isUndefined(this.options.fieldName))) {
                this.bind.onRootElement(Coveo.QueryEvents.buildingQuery, function (args) { return _this.handleBuildingQuery(args); });
            }
        }
        ExtensionQF.prototype.handleBuildingQuery = function (args) {
            var expression = new Coveo.ExtensionBuilder('qf')
                .withParam('function', this.options.func)
                .withParam('fieldName', this.options.fieldName)
                .build();
            args.queryBuilder.advancedExpression.add(expression);
        };
        ExtensionQF.ID = "ExtensionQF";
        ExtensionQF.options = {
            func: Coveo.ComponentOptions.buildStringOption(),
            fieldName: Coveo.ComponentOptions.buildStringOption()
        };
        return ExtensionQF;
    }(Coveo.Component));
    Coveo.ExtensionQF = ExtensionQF;
    Coveo.Initialization.registerAutoCreateComponent(ExtensionQF);
})(Coveo || (Coveo = {}));
/// <reference path="../Box/Box.ts" />
/// <reference path="../StandardQueryExtensions/ExtensionQRE.ts" />
/// <reference path="../StandardQueryExtensions/ExtensionQRF.ts" />
/// <reference path="../StandardQueryExtensions/ExtensionQF.ts" />
var Coveo;
(function (Coveo) {
    (function (SupportedBoxQueryExtension) {
        SupportedBoxQueryExtension[SupportedBoxQueryExtension["QRE"] = 0] = "QRE";
        SupportedBoxQueryExtension[SupportedBoxQueryExtension["QRF"] = 1] = "QRF";
        SupportedBoxQueryExtension[SupportedBoxQueryExtension["QF"] = 2] = "QF";
    })(Coveo.SupportedBoxQueryExtension || (Coveo.SupportedBoxQueryExtension = {}));
    var SupportedBoxQueryExtension = Coveo.SupportedBoxQueryExtension;
    var BoxQueryExtensions = (function (_super) {
        __extends(BoxQueryExtensions, _super);
        function BoxQueryExtensions(element, options, bindings) {
            var _this = this;
            _super.call(this, element, BoxQueryExtensions.ID, bindings);
            this.element = element;
            this.options = options;
            this.bindings = bindings;
            this.extensions = [];
            this.isDisabledFromContextualQuery = false;
            if (bindings.isWaitingForRecord) {
                this.logger.info('Disabling component : No record found to expand query', this);
                return;
            }
            this.options = Coveo.ComponentOptions.initComponentOptions(element, BoxQueryExtensions, options);
            this.options.configurations = _.extend({}, options.configurations, BoxQueryExtensions.getConfigFromContent(this.element));
            _.each(this.options.configurations, function (configuration) {
                if (configuration.extension == SupportedBoxQueryExtension.QRE) {
                    _this.buildQREExtension(configuration.definition);
                }
                else if (configuration.extension == SupportedBoxQueryExtension.QRF) {
                    _this.buildQRFExtension(configuration.definition);
                }
                else if (configuration.extension == SupportedBoxQueryExtension.QF) {
                    _this.buildQFExtension(configuration.definition);
                }
            });
            if (this.options.disableOnNonContextualSearch) {
                this.bind.onRootElement(this.bindings.boxStateModel.getSimpleEvent(Coveo.BoxStateModel.attributesEnum.enableNonContextualSearch), function (args) {
                    _this.isDisabledFromContextualQuery = args.value;
                    if (args.value) {
                        _.each(_this.extensions, function (e) { return e.disable(); });
                    }
                    else if (!_this.disabled) {
                        _.each(_this.extensions, function (e) { return e.enable(); });
                    }
                });
            }
        }
        BoxQueryExtensions.getMarkup = function () {
            return $("<script class='CoveoBoxQueryExtensions' type='text/x-query-configuration' ></script>");
        };
        BoxQueryExtensions.getConfigFromContent = function (content) {
            if (content instanceof HTMLElement) {
                content = content.innerHTML;
            }
            var configFromJson = [];
            if (content != "") {
                try {
                    // Can be HTML Encoded to escape special char is SF
                    configFromJson = JSON.parse(Coveo.Utils.decodeHTMLEntities(content));
                }
                catch (e) {
                    try {
                        configFromJson = JSON.parse(content);
                    }
                    catch (e) {
                        configFromJson = [];
                    }
                }
            }
            return configFromJson;
        };
        BoxQueryExtensions.prototype.buildQREExtension = function (qreConfiguration) {
            this.extensions.push(new Coveo.ExtensionQRE($('<div />').get(0), {
                expression: Coveo.SalesforceUtilities.expandStringUsingRecord(qreConfiguration.expression, Coveo.Salesforce.record),
                modifier: qreConfiguration.modifier
            }, this.bindings));
        };
        BoxQueryExtensions.prototype.buildQRFExtension = function (qrfConfiguration) {
            this.extensions.push(new Coveo.ExtensionQRF($('<div />').get(0), {
                expression: Coveo.SalesforceUtilities.expandStringUsingRecord(qrfConfiguration.expression, Coveo.Salesforce.record),
                normalizeWeight: qrfConfiguration.normalizeWeight
            }, this.bindings));
        };
        BoxQueryExtensions.prototype.buildQFExtension = function (qfConfiguration) {
            this.extensions.push(new Coveo.ExtensionQF($('<div />').get(0), {
                func: Coveo.SalesforceUtilities.expandStringUsingRecord(qfConfiguration.func, Coveo.Salesforce.record),
                fieldName: qfConfiguration.fieldName
            }, this.bindings));
        };
        BoxQueryExtensions.prototype.enable = function () {
            if (!this.isDisabledFromContextualQuery) {
                _.each(this.extensions, function (e) { return e.enable(); });
            }
            _super.prototype.enable.call(this);
        };
        BoxQueryExtensions.prototype.disable = function () {
            _.each(this.extensions, function (e) { return e.disable(); });
            _super.prototype.disable.call(this);
        };
        BoxQueryExtensions.ID = "BoxQueryExtensions";
        BoxQueryExtensions.options = {
            disableOnNonContextualSearch: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true })
        };
        return BoxQueryExtensions;
    }(Coveo.Component));
    Coveo.BoxQueryExtensions = BoxQueryExtensions;
    Coveo.Initialization.registerAutoCreateComponent(BoxQueryExtensions);
})(Coveo || (Coveo = {}));
var Coveo;
(function (Coveo) {
    var ExtensionBuilder = (function () {
        function ExtensionBuilder(name, withQuote) {
            if (withQuote === void 0) { withQuote = true; }
            this.name = name;
            this.withQuote = withQuote;
            this.params = [];
        }
        ExtensionBuilder.prototype.withParam = function (key, value) {
            this.params.push({ key: key, value: value });
            return this;
        };
        ExtensionBuilder.prototype.build = function () {
            var possiblyQuoted = this.withQuote ? '\'' : '';
            return '$' + this.name + '(' + _.map(this.params, function (param) {
                if (param.value.replace != undefined) {
                    param.value = param.value.replace(/\'/g, '');
                }
                return param.key + ': ' + possiblyQuoted + param.value + possiblyQuoted;
            }).join(', ') + ')';
        };
        return ExtensionBuilder;
    }());
    Coveo.ExtensionBuilder = ExtensionBuilder;
})(Coveo || (Coveo = {}));
/// <reference path="ExtensionBuilder.ts" />
var Coveo;
(function (Coveo) {
    var ExtensionSome = (function (_super) {
        __extends(ExtensionSome, _super);
        function ExtensionSome(element, options, bindings) {
            var _this = this;
            _super.call(this, element, ExtensionSome.ID, bindings);
            this.element = element;
            this.options = options;
            this.options = Coveo.ComponentOptions.initComponentOptions(element, ExtensionSome, options);
            if (!_.isUndefined(this.options.keywords) && this.options.bindOnQuery) {
                this.bind.onRootElement(Coveo.QueryEvents.buildingQuery, function (args) { return _this.handleBuildingQuery(args); });
            }
        }
        ExtensionSome.fromStringArrayToStringKeywords = function (array, bindings) {
            return _.chain(array)
                .map(function (includeInQuery) {
                return bindings.container.options.record[includeInQuery.toLowerCase()];
            })
                .compact()
                .value()
                .join(' ');
        };
        ExtensionSome.prototype.getBuilder = function () {
            var builder = new Coveo.ExtensionBuilder('some')
                .withParam('keywords', this.options.keywords);
            if (!_.isUndefined(this.options.best)) {
                builder.withParam('best', this.options.best);
            }
            if (!_.isUndefined(this.options.match)) {
                builder.withParam('match', this.options.match);
            }
            if (!_.isUndefined(this.options.removeStopWords)) {
                builder.withParam('removeStopWords', this.options.removeStopWords);
            }
            if (!_.isUndefined(this.options.maximum)) {
                builder.withParam('maximum', this.options.maximum);
            }
            return builder;
        };
        ExtensionSome.prototype.handleBuildingQuery = function (args) {
            args.queryBuilder.advancedExpression.add(this.getBuilder().build());
        };
        ExtensionSome.ID = "ExtensionSome";
        ExtensionSome.options = {
            keywords: Coveo.ComponentOptions.buildStringOption(),
            best: Coveo.ComponentOptions.buildNumberOption({ defaultValue: 5 }),
            match: Coveo.ComponentOptions.buildNumberOption({ defaultValue: 5 }),
            removeStopWords: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true }),
            maximum: Coveo.ComponentOptions.buildNumberOption(),
            bindOnQuery: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true })
        };
        return ExtensionSome;
    }(Coveo.Component));
    Coveo.ExtensionSome = ExtensionSome;
    Coveo.Initialization.registerAutoCreateComponent(ExtensionSome);
})(Coveo || (Coveo = {}));
/// <reference path="../Box/Box.ts" />
/// <reference path="../StandardQueryExtensions/ExtensionQRE.ts" />
/// <reference path="../StandardQueryExtensions/ExtensionSome.ts" />
var Coveo;
(function (Coveo) {
    (function (BoxRelatedContextImportance) {
        BoxRelatedContextImportance[BoxRelatedContextImportance["LOWEST"] = 0] = "LOWEST";
        BoxRelatedContextImportance[BoxRelatedContextImportance["LOW"] = 1] = "LOW";
        BoxRelatedContextImportance[BoxRelatedContextImportance["AVERAGE"] = 2] = "AVERAGE";
        BoxRelatedContextImportance[BoxRelatedContextImportance["HIGH"] = 3] = "HIGH";
        BoxRelatedContextImportance[BoxRelatedContextImportance["HIGHEST"] = 4] = "HIGHEST";
        BoxRelatedContextImportance[BoxRelatedContextImportance["MANDATORY"] = 5] = "MANDATORY";
    })(Coveo.BoxRelatedContextImportance || (Coveo.BoxRelatedContextImportance = {}));
    var BoxRelatedContextImportance = Coveo.BoxRelatedContextImportance;
    var BoxRelatedContext = (function (_super) {
        __extends(BoxRelatedContext, _super);
        function BoxRelatedContext(element, options, bindings) {
            var _this = this;
            _super.call(this, element, BoxRelatedContext.ID, bindings);
            this.element = element;
            this.options = options;
            this.bindings = bindings;
            this.importanceDescription = [
                {
                    importance: BoxRelatedContextImportance.LOWEST,
                    modifier: 10,
                    match: '10%'
                },
                {
                    importance: BoxRelatedContextImportance.LOW,
                    modifier: 30,
                    match: '30%'
                },
                {
                    importance: BoxRelatedContextImportance.AVERAGE,
                    modifier: 50,
                    match: '50%'
                },
                {
                    importance: BoxRelatedContextImportance.HIGH,
                    modifier: 70,
                    match: '70%'
                },
                {
                    importance: BoxRelatedContextImportance.HIGHEST,
                    modifier: 100,
                    match: '100%'
                },
                {
                    importance: BoxRelatedContextImportance.MANDATORY,
                    modifier: 100,
                    match: '100%'
                }
            ];
            if (bindings.isWaitingForRecord) {
                this.logger.info('Disabling component : No record found to expand query', this);
                return;
            }
            this.options.configurations = _.extend({}, options.configurations, BoxRelatedContext.getConfigFromContent(this.element));
            var expressions = [];
            _.each(this.options.configurations, function (config) {
                if (config.include) {
                    var modifierDescription = _.findWhere(_this.importanceDescription, { importance: config.importance });
                    if (!_.isUndefined(modifierDescription)) {
                        // First , get a $some expression with the provided context field
                        // The match parameters depends on the importance of the field configured
                        // This is not added 'directly' to the query, but serves for other part
                        // of the expression
                        var someExpression = new Coveo.ExtensionSome(element, {
                            keywords: Coveo.ExtensionSome.fromStringArrayToStringKeywords(config.include, bindings),
                            best: BoxRelatedContext.BestKeywordsToMatch,
                            bindOnQuery: false,
                            match: modifierDescription.match
                        }, bindings).getBuilder().build();
                        // The first expression we add is a $some paired with @uri if it's not mandatory
                        // (so basically : ($some of the keywords OR anything) if it's not mandatory)
                        var firstExpression;
                        if (modifierDescription.importance != BoxRelatedContextImportance.MANDATORY) {
                            firstExpression = '( ' + someExpression + 'OR @uri )';
                        }
                        else {
                            firstExpression = '( ' + someExpression + ')';
                        }
                        // The second expression is a $qre for $some of the keywords
                        // Will boost document with $some keywords according to the configured importance/modifier
                        var secondExpression = new Coveo.ExtensionQRE(element, {
                            expression: someExpression,
                            modifier: modifierDescription.modifier,
                            bindOnQuery: false,
                            quotedExpression: false
                        }, bindings).getBuilder().build();
                        // At the end we get something like :
                        // ($some(keywords, 70%) OR @uri) $qre($some(keywords, 70%)) -> non mandatory context field
                        // ($some(keywords, 70%)) $qre($some(keywords, 70%)) -> mandatory context field with 70% match
                        expressions.push('(' + firstExpression + ' ' + secondExpression + ')');
                    }
                }
            });
            if (!_.isEmpty(expressions)) {
                this.bind.onRootElement(Coveo.QueryEvents.buildingQuery, function (args) {
                    _this.handleBuildingQuery(args, expressions.join(' '));
                });
            }
        }
        BoxRelatedContext.getMarkup = function () {
            return $("<script class='CoveoBoxRelatedContext' type='text/x-query-related-object' ></script>");
        };
        BoxRelatedContext.getConfigFromContent = function (content) {
            if (content instanceof HTMLElement) {
                content = content.innerHTML;
            }
            var configFromJson;
            try {
                configFromJson = JSON.parse(content);
            }
            catch (e) {
                configFromJson = [];
            }
            return configFromJson;
        };
        BoxRelatedContext.prototype.handleBuildingQuery = function (args, expression) {
            args.queryBuilder.advancedExpression.add(expression);
        };
        BoxRelatedContext.ID = "BoxRelatedContext";
        // This number has been chosen after a 5 year PHD thesis analysis
        BoxRelatedContext.BestKeywordsToMatch = 5;
        return BoxRelatedContext;
    }(Coveo.Component));
    Coveo.BoxRelatedContext = BoxRelatedContext;
    Coveo.Initialization.registerAutoCreateComponent(BoxRelatedContext);
})(Coveo || (Coveo = {}));
/// <reference path="../Box/Box.ts" />
/// <reference path="../StandardQueryExtensions/ExtensionSome.ts" />
var Coveo;
(function (Coveo) {
    var BoxQueryGeneric = (function (_super) {
        __extends(BoxQueryGeneric, _super);
        function BoxQueryGeneric(element, options, bindings) {
            var _this = this;
            _super.call(this, element, BoxQueryGeneric.ID, bindings);
            this.element = element;
            this.options = options;
            this.bindings = bindings;
            this.isDisabledFromContextualQuery = false;
            if (bindings.isWaitingForRecord) {
                this.logger.info('Disabling component : No record found to expand query', this);
                return;
            }
            if ($(this.element).is('script')) {
                this.options = Coveo.ComponentOptions.initComponentOptions(element, BoxQueryGeneric, options);
                try {
                    this.content = Coveo.Utils.decodeHTMLEntities($(this.element).text());
                }
                catch (e) {
                    return;
                }
                if (!_.isUndefined(this.content) && this.content != '') {
                    this.bind.onRootElement(Coveo.QueryEvents.buildingQuery, function (args) { return _this.handleBuildingQuery(args); });
                }
            }
            if (this.options.disableOnNonContextualSearch) {
                $(this.root).on(this.bindings.boxStateModel.getSimpleEvent(Coveo.BoxStateModel.attributesEnum.enableNonContextualSearch), function (e, args) {
                    _this.isDisabledFromContextualQuery = args.value;
                });
            }
        }
        BoxQueryGeneric.getMarkup = function () {
            return $("<script class='CoveoBoxQueryGeneric' type='text/x-query-generic'></script>");
        };
        BoxQueryGeneric.prototype.handleBuildingQuery = function (args) {
            if (!this.isDisabledFromContextualQuery) {
                var query = Coveo.SalesforceUtilities.expandStringUsingRecord(this.content, Coveo.Salesforce.record);
                if (!Coveo.Utils.isEmptyString(query)) {
                    args.queryBuilder.advancedExpression.add(query);
                }
            }
        };
        BoxQueryGeneric.ID = "BoxQueryGeneric";
        BoxQueryGeneric.options = {
            disableOnNonContextualSearch: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true })
        };
        return BoxQueryGeneric;
    }(Coveo.Component));
    Coveo.BoxQueryGeneric = BoxQueryGeneric;
    Coveo.Initialization.registerAutoCreateComponent(BoxQueryGeneric);
})(Coveo || (Coveo = {}));
/// <reference path="../Box/Box.ts" />
/// <reference path="../StandardQueryExtensions/ExtensionSome.ts" />
var Coveo;
(function (Coveo) {
    var BoxPipelineContext = (function (_super) {
        __extends(BoxPipelineContext, _super);
        function BoxPipelineContext(element, options, bindings) {
            _super.call(this, element, BoxPipelineContext.ID, bindings);
            this.element = element;
            this.options = options;
            this.bindings = bindings;
        }
        BoxPipelineContext.getMarkup = function () {
            return $("<script class='CoveoBoxPipelineContext' type='text/x-context'>{}</script>");
        };
        BoxPipelineContext.ID = "BoxPipelineContext";
        return BoxPipelineContext;
    }(Coveo.PipelineContext));
    Coveo.BoxPipelineContext = BoxPipelineContext;
    Coveo.Initialization.registerAutoCreateComponent(BoxPipelineContext);
})(Coveo || (Coveo = {}));
/// <reference path="../Box/Box.ts" />
/// <reference path="../StandardQueryExtensions/ExtensionSome.ts" />
var Coveo;
(function (Coveo) {
    var BoxQuerySome = (function (_super) {
        __extends(BoxQuerySome, _super);
        function BoxQuerySome(element, options, bindings) {
            var _this = this;
            _super.call(this, element, BoxQuerySome.ID, bindings);
            this.element = element;
            this.options = options;
            this.bindings = bindings;
            this.isDisabledFromContextualQuery = false;
            if (bindings.isWaitingForRecord) {
                this.logger.info('Disabling component : No record found to expand query', this);
                return;
            }
            this.options = Coveo.ComponentOptions.initComponentOptions(element, BoxQuerySome, options);
            if (!_.isUndefined(this.options.include) && !_.isEmpty(this.options.include)) {
                this.fromIncludeOptionToKeywords();
            }
            if (!_.isUndefined(this.keywordsForQuery) && !_.isEmpty(this.keywordsForQuery)) {
                var elementForSome = $('<div />');
                this.extensionSome = new Coveo.ExtensionSome(elementForSome.get(0), _.extend({}, { keywords: this.keywordsForQuery }, this.options), bindings);
            }
            if (!this.options.includeCurrentRecord) {
                this.bind.onRootElement(Coveo.QueryEvents.buildingQuery, function (args) {
                    if (!_this.isDisabledFromContextualQuery) {
                        args.queryBuilder.advancedExpression.addFieldNotEqualExpression('@sfid', [Coveo.Salesforce.record.id]);
                    }
                });
            }
            if (this.options.disableOnNonContextualSearch) {
                $(this.root).on(this.bindings.boxStateModel.getSimpleEvent(Coveo.BoxStateModel.attributesEnum.enableNonContextualSearch), function (e, args) {
                    _this.isDisabledFromContextualQuery = args.value;
                    if (_this.extensionSome) {
                        if (args.value) {
                            _this.extensionSome.disable();
                        }
                        else if (!_this.disabled) {
                            _this.extensionSome.enable();
                        }
                    }
                });
            }
        }
        BoxQuerySome.prototype.enable = function () {
            if (!this.isDisabledFromContextualQuery) {
                if (this.extensionSome) {
                    this.extensionSome.enable();
                }
            }
            _super.prototype.enable.call(this);
        };
        BoxQuerySome.prototype.disable = function () {
            if (this.extensionSome) {
                this.extensionSome.disable();
            }
            _super.prototype.disable.call(this);
        };
        BoxQuerySome.prototype.fromIncludeOptionToKeywords = function () {
            this.keywordsForQuery = Coveo.ExtensionSome.fromStringArrayToStringKeywords(this.options.include, this.bindings);
        };
        BoxQuerySome.ID = "BoxQuerySome";
        BoxQuerySome.options = _.extend({}, {
            include: Coveo.ComponentOptions.buildListOption(),
            includeCurrentRecord: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: false }),
            disableOnNonContextualSearch: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true })
        }, _.omit(Coveo.ExtensionSome.options, ['keywords', 'maximum']));
        return BoxQuerySome;
    }(Coveo.Component));
    Coveo.BoxQuerySome = BoxQuerySome;
    Coveo.Initialization.registerAutoCreateComponent(BoxQuerySome);
})(Coveo || (Coveo = {}));
/// <reference path="../../node_modules/coveo-search-ui/bin/ts/CoveoJsSearch.d.ts" />
/// <reference path="../../resources/js/components.d.ts" />
/// <reference path="components/Models/BoxStateModel.ts" />
/// <reference path="components/Box/Box.ts" />
/// <reference path="components/BoxQueryExtensions/BoxQueryExtensions.ts" />
/// <reference path="components/BoxRelatedContext/BoxRelatedContext.ts" />
/// <reference path="components/BoxQueryGeneric/BoxQueryGeneric.ts" />
/// <reference path="components/BoxPipelineContext/BoxPipelineContext.ts" />
/// <reference path="components/BoxQuerySome/BoxQuerySome.ts" />
