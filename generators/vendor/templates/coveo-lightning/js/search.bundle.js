var Coveo_tmp_SF = window.Coveo || {};window.Coveo =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 70);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = window.Coveo;

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var coveo_search_ui_1 = __webpack_require__(0);
var SalesforceUtilities = /** @class */ (function () {
    function SalesforceUtilities() {
    }
    SalesforceUtilities.isInSalesforce = function () {
        return window.sforce != undefined;
    };
    SalesforceUtilities.isInLightning = function () {
        // Check if the aura framework is loaded.
        return window['$A'] !== undefined;
    };
    SalesforceUtilities.isInSalesforceConsole = function () {
        return SalesforceUtilities.isInSalesforce() && window.sforce.console != undefined && window.sforce.console.isInConsole();
    };
    SalesforceUtilities.focusOrOpenTab = function (url, tabText, openInPrimaryTab) {
        if (openInPrimaryTab === void 0) { openInPrimaryTab = false; }
        url = typeof url !== 'undefined' ? url : '';
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
        // For helper message
        var outputConsoleDomainErrorMessage = function () {
            console.log("Unexpected Behaviour? Please check your Domain is set in your Salesforce App's 'Whitelist Domains' section.");
            console.log('Settings are located in Build > Apps > ‘App Name’ (edit) > Whitelist Domains');
        };
        // Open in subtab
        var subtabCount = 0;
        var tabFocused = false;
        var subtabIndex = 0;
        var focusedPrimaryTabId = null;
        var openSubtab = function (primaryTabId, url) {
            window.sforce.console.openSubtab(primaryTabId, originalUrl, true, tabText, null, function openSuccess(result) {
                // `result.success` comes from the window.sforce.console object and will be set to FALSE when `openSubtab` fails
                if (!result.success) {
                    window.open(originalUrl);
                    outputConsoleDomainErrorMessage();
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
                    if (tabUrlId == urlId || (endsWith(url, tabUrl) || endsWith(tabUrl, url))) {
                        window.sforce.console.focusSubtabById(id);
                        tabFocused = true;
                    }
                    subtabCount--;
                    if (!tabFocused && subtabCount == 0) {
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
                // `result.success` comes from the window.sforce.console object and will be set to FALSE when `openPrimaryTab` fails
                if (!result.success) {
                    window.open(originalUrl);
                    outputConsoleDomainErrorMessage();
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
                    if (tabUrlId == urlId || (endsWith(url, tabUrl) || endsWith(tabUrl, url))) {
                        window.sforce.console.focusPrimaryTabById(id);
                        tabFocused = true;
                    }
                    primaryTabCount--;
                    if (!tabFocused && primaryTabCount == 0) {
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
        var id = url.substr(url.lastIndexOf('/') + 1, 18);
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
                    var fieldValue = coveo_search_ui_1.Utils.getFieldValue(expert, fieldName);
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
    // Allow to parse a template an inject the fields.
    // This is based of https://github.com/coveo/search-ui/blob/984d014639f09c61aca77b57bcc7ec804e30dbb2/src/ui/ResultLink/ResultLink.ts#L501
    SalesforceUtilities.parseStringTemplate = function (template, result) {
        var _this = this;
        if (!template) {
            return '';
        }
        return template.replace(/\$\{(.*?)\}/g, function (value) {
            var key = value.substring(2, value.length - 1);
            var newValue = _this.readFromObject(result, key);
            if (!newValue) {
                newValue = _this.readFromObject(window, key);
            }
            return newValue || '';
        });
    };
    // Allow to parse a template an inject the fields.
    // This is based of https://github.com/coveo/search-ui/blob/984d014639f09c61aca77b57bcc7ec804e30dbb2/src/ui/ResultLink/ResultLink.ts#L501
    SalesforceUtilities.readFromObject = function (object, key) {
        if (object && key.indexOf('.') !== -1) {
            var newKey = key.substring(key.indexOf('.') + 1);
            key = key.substring(0, key.indexOf('.'));
            return this.readFromObject(object[key], newKey);
        }
        return object ? object[key] : undefined;
    };
    return SalesforceUtilities;
}());
exports.SalesforceUtilities = SalesforceUtilities;


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UserActionEvents = /** @class */ (function () {
    function UserActionEvents() {
    }
    UserActionEvents.enterOnSearchbox = 'enterOnSearchbox';
    UserActionEvents.quickviewLoaded = 'quickviewLoaded';
    UserActionEvents.openQuickview = 'openQuickview';
    UserActionEvents.attachToCase = 'attachToCase';
    UserActionEvents.detachFromCase = 'detachFromCase';
    UserActionEvents.attachedResultChange = 'attachedResultChange';
    UserActionEvents.attachToCaseStateChanged = 'attachToCaseStateChanged';
    UserActionEvents.sendAsEmail = 'sendAsEmail';
    UserActionEvents.postToFeed = 'postToFeed';
    UserActionEvents.sendToLiveAgent = "sendToLiveAgent";
    return UserActionEvents;
}());
exports.UserActionEvents = UserActionEvents;
var UserActionCause = /** @class */ (function () {
    function UserActionCause() {
    }
    UserActionCause.sendAsEmail = {
        name: UserActionEvents.sendAsEmail,
        type: 'resultAction'
    };
    UserActionCause.postToFeed = {
        name: UserActionEvents.postToFeed,
        type: 'resultAction'
    };
    UserActionCause.sendToLiveAgent = {
        name: UserActionEvents.sendToLiveAgent,
        type: 'resultAction'
    };
    return UserActionCause;
}());
exports.UserActionCause = UserActionCause;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var coveo_search_ui_1 = __webpack_require__(0);
var SalesforceUtils_1 = __webpack_require__(3);
// This class is, as it's name implied, used only in the salesforce integration to handle
// results link that can be opened in the console correctly.
// When the page is created in salesforce (interface editor) all CoveoResultLink are replaced with CoveoSalesforceResultLink.
/**
 * The _SalesforceResultLink_ component is used to open result links as Salesforce tabs.
 *
 * It inherits from the [ResultLink Component](https://coveo.github.io/search-ui/components/resultlink.html).
 *
 * ```html
 * <a class='CoveoSalesforceResultLink'></a>
 * ```
 */
var SalesforceResultLink = /** @class */ (function (_super) {
    __extends(SalesforceResultLink, _super);
    function SalesforceResultLink(element, options, bindings, result) {
        var _this = _super.call(this, element, coveo_search_ui_1.ComponentOptions.initComponentOptions(element, SalesforceResultLink, options), bindings, result) || this;
        _this.element = element;
        _this.options = options;
        _this.result = result;
        return _this;
    }
    SalesforceResultLink.prototype.bindEventToOpen = function () {
        var _this = this;
        if (SalesforceUtils_1.SalesforceUtilities.isInSalesforceConsole()) {
            var eventWasBinded = false;
            // Note: For Salesforce Tabs to work, check that your Domains are whitelisted in your App's "Whitelist Domains" section.
            if (this.options.openInPrimaryTab) {
                $(this.element).click(function () {
                    SalesforceUtils_1.SalesforceUtilities.focusOrOpenTab(decodeURIComponent(_this.result.clickUri), _this.result.title, true);
                });
                eventWasBinded = true;
            }
            else if (this.options.openInSubTab) {
                $(this.element).click(function () {
                    SalesforceUtils_1.SalesforceUtilities.focusOrOpenTab(decodeURIComponent(_this.result.clickUri), _this.result.title, false);
                });
                eventWasBinded = true;
            }
            if (!eventWasBinded) {
                eventWasBinded = _super.prototype.bindEventToOpen.call(this);
            }
            return eventWasBinded;
            // Bind lightning aura actions instead of redirecting to another URL.
            // If we want to open in a new window, it will use the ResultLink logic to open it.
        }
        else if (SalesforceUtils_1.SalesforceUtilities.isInLightning() && this.areOptionsSupportedInLightning()) {
            this.bindEventToOpenInLightning();
        }
        else {
            // Fallback on the result link logic.
            return _super.prototype.bindEventToOpen.call(this);
        }
    };
    SalesforceResultLink.prototype.areOptionsSupportedInLightning = function () {
        // Those options are not supported in lightning. Fallback on the ResultLink.
        return !this.options.alwaysOpenInNewWindow && !this.options.openInOutlook && !this.options.openQuickview;
    };
    SalesforceResultLink.prototype.bindEventToOpenInLightning = function () {
        var _this = this;
        $(this.element).on('click', function () {
            // Create the lightning event.
            var auraClickEvent = _this.createLightningClickEvent();
            coveo_search_ui_1.Assert.isNotNull(auraClickEvent);
            // Fire the aura event.
            auraClickEvent.fire();
        });
    };
    SalesforceResultLink.prototype.createLightningClickEvent = function () {
        var auraClickEvent;
        // If the result is a Salesforce object, we'll use the navigateToSObject action.
        if (this.result.raw.sfid !== undefined) {
            // is any other Salesforce objects.
            auraClickEvent = $A.get('e.force:navigateToSObject');
            auraClickEvent.setParams({
                recordId: this.getIdForNavigateToSObject()
            });
        }
        else {
            // is non salesforce items.
            auraClickEvent = $A.get('e.force:navigateToURL');
            auraClickEvent.setParams({
                url: this.result.clickUri
            });
        }
        return auraClickEvent;
    };
    SalesforceResultLink.prototype.getIdForNavigateToSObject = function () {
        var idToUse = this.result.raw.sfid;
        // Knowledge article uses the knowledge article version id to navigate.
        if (this.result.raw.sfkbid !== undefined && this.result.raw.sfkavid !== undefined) {
            idToUse = this.result.raw.sfkavid;
        }
        return idToUse;
    };
    SalesforceResultLink.ID = 'SalesforceResultLink';
    /**
     * The possible options for SalesforceResultLink
     * @componentOptions
     */
    SalesforceResultLink.options = {
        /**
         * Specifies that the result link should try to open as a primary console tab. If it fails, it instead opens in a new browser tab.
         *
         * Default is `true`.
         *
         * ```html
         * <a class='CoveoSalesforceResultLink' data-open-in-primary-tab='true'/>
         * ```
         */
        openInPrimaryTab: coveo_search_ui_1.ComponentOptions.buildBooleanOption({ defaultValue: true }),
        /**
         * Specifies that the result link should try to open as a secondary console tab. If it fails, it instead opens in a new browser tab.
         *
         * Default is `false`.
         *
         * ```html
         * <a class='CoveoSalesforceResultLink' data-open-in-sub-tab='true'/>
         * ```
         */
        openInSubTab: coveo_search_ui_1.ComponentOptions.buildBooleanOption({ defaultValue: false })
    };
    return SalesforceResultLink;
}(coveo_search_ui_1.ResultLink));
exports.SalesforceResultLink = SalesforceResultLink;
// The options are extended here to ensure TypeDoc builds the documentation properly.
SalesforceResultLink.options = _.extend({}, coveo_search_ui_1.ResultLink.options, SalesforceResultLink.options);
coveo_search_ui_1.Initialization.registerAutoCreateComponent(SalesforceResultLink);
coveo_search_ui_1.Initialization.registerComponentFields(SalesforceResultLink.ID, coveo_search_ui_1.Initialization.getRegisteredFieldsComponentForQuery(coveo_search_ui_1.ResultLink.ID).concat(['sfid', 'sfkbid', 'sfkavid']));


/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var coveo_search_ui_1 = __webpack_require__(0);
/**
 * The _SalesforceThumbnail_ component is used in result templates to display a thumbnail preview for Salesforce content documents.
 *
 * It is included by default in the Document result template.
 *
 * **NOTE:**
 * > Objects without attachments may fail to render a preview. You should only use it for Salesforce Content documents.
 *
 * ```html
 * <span class="CoveoSalesforceThumbnail"></span>
 * ```
 */
var SalesforceThumbnail = /** @class */ (function (_super) {
    __extends(SalesforceThumbnail, _super);
    function SalesforceThumbnail(element, options, bindings, result) {
        var _this = _super.call(this, element, SalesforceThumbnail.ID, coveo_search_ui_1.ComponentOptions.initComponentOptions(element, SalesforceThumbnail, options)) || this;
        _this.element = element;
        _this.options = options;
        _this.bindings = bindings;
        _this.result = result;
        _this.result = _this.result || _this.resolveResult();
        coveo_search_ui_1.Assert.exists(_this.result);
        var thumbnailDiv = coveo_search_ui_1.$$('div'); // Create a div container
        thumbnailDiv.addClass('coveo-salesforce-thumbnail-container');
        var img = coveo_search_ui_1.$$('img'); // Create the image to hold the thumbnail
        img.el.setAttribute('width', _this.options.width);
        img.el.setAttribute('height', _this.options.height);
        img.setAttribute('src', _this.getSalesforceThumbnailURI());
        img.addClass('coveo-salesforce-thumbnail-img');
        thumbnailDiv.append(img.el); // Add the image to the div.
        coveo_search_ui_1.$$(_this.element).append(thumbnailDiv.el);
        // If the thumbnail image fails to load, it is either a bad url or the user cannot access the thumbnail url,
        // Replace the thumbnail with a generic File icon to serve as placeholder
        img.one('error', function () {
            var placeholder = coveo_search_ui_1.$$('span');
            placeholder.addClass(SalesforceThumbnail.SEARCHUI_SALESFORCE_FILE_ICON_CLASS);
            thumbnailDiv.addClass(SalesforceThumbnail.PLACEHOLDER_CLASS);
            thumbnailDiv.append(placeholder.el);
            img.el.style.display = "none";
        });
        return _this;
    }
    // This returns the salesforce API url to the thumbnail image or undefined if it cannot find the versionId.
    SalesforceThumbnail.prototype.getSalesforceThumbnailURI = function () {
        if (!this.result.raw.sflatestpublishedversionid) {
            return undefined;
        }
        return SalesforceThumbnail.SALESFORCE_THUMBNAIL_URI + "?" + SalesforceThumbnail.RENDITION_SIZE + "&versionId=" + this.result.raw.sflatestpublishedversionid;
    };
    SalesforceThumbnail.ID = 'SalesforceThumbnail';
    SalesforceThumbnail.SALESFORCE_THUMBNAIL_URI = '/sfc/servlet.shepherd/version/renditionDownload';
    SalesforceThumbnail.RENDITION_SIZE = 'rendition=THUMB720BY480';
    SalesforceThumbnail.SEARCHUI_SALESFORCE_FILE_ICON_CLASS = 'coveo-filetype-salesforce-standard-file';
    SalesforceThumbnail.PLACEHOLDER_CLASS = 'coveo-salesforce-thumbnail-placeholder';
    /**
     * The possible options for the Salesforce Thumbnail
     * @componentOptions
     */
    SalesforceThumbnail.options = {
        /**
         * Specifies the width of the thumbnail.
         *
         * Default value is `120px`.
         *
         * ```html
         * <span data-width='120px'></span>
         * ```
         */
        width: coveo_search_ui_1.ComponentOptions.buildStringOption({ defaultValue: '120px' }),
        /**
         * Specifies the height of the thumbnail.
         *
         * Default is `auto`, meaning that it scales with the given width.
         *
         * ```html
         * <span data-height='auto'></span>
         * ```
         */
        height: coveo_search_ui_1.ComponentOptions.buildStringOption({ defaultValue: 'auto' })
    };
    SalesforceThumbnail.fields = ['sflatestpublishedversionid'];
    return SalesforceThumbnail;
}(coveo_search_ui_1.Component));
exports.SalesforceThumbnail = SalesforceThumbnail;
coveo_search_ui_1.Initialization.registerComponentFields(SalesforceThumbnail.ID, SalesforceThumbnail.fields);
coveo_search_ui_1.Initialization.registerAutoCreateComponent(SalesforceThumbnail);


/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var closeIcon = __webpack_require__(22);
var attachIcon = __webpack_require__(23);
var waitIcon = __webpack_require__(24);
/*
 * Underscore template options containing all SVGs
 */
exports.Icons = {
    closeIcon: closeIcon,
    attachIcon: attachIcon,
    waitIcon: waitIcon
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ResultActionsEvents = /** @class */ (function () {
    function ResultActionsEvents() {
    }
    ResultActionsEvents.onPostToFeed = 'ResultActionsEvents.onPostToFeed';
    ResultActionsEvents.onSendAsEmail = 'ResultActionsEvents.onSendAsEmail';
    ResultActionsEvents.onSendToLiveAgent = 'ResultActionsEvents.onSendToLiveAgent';
    ResultActionsEvents.onChatEnded = 'ResultActionsEvents.onChatEnded';
    return ResultActionsEvents;
}());
exports.ResultActionsEvents = ResultActionsEvents;


/***/ }),
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\"><path d=\"M.818 2.232L2.232.818l19.02 19.02-1.413 1.415z\"></path><path d=\"M.818 19.768L19.838.748l1.415 1.413L2.232 21.182z\"></path></svg>"

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<svg xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" viewBox=\"0 0 78.905 77.861\" enable-background=\"new 0 0 78.905 77.861\">\n  <g transform=\"translate(0,-952.36218)\" id=\"g4\">\n\t  <path d=\"m 71.828,957.626 c 8.674,7.675 9.487,20.969 1.813,29.643 l -37.107,41.941 c -1.098,1.241 -2.994,1.357 -4.235,0.259 -1.241,-1.098 -1.357,-2.994 -0.259,-4.235 l 37.107,-41.941 c 5.541,-6.263 4.968,-15.633 -1.295,-21.174 -6.263,-5.541 -15.633,-4.968 -21.174,1.295 l -38.433,43.439 c -3.338,3.773 -2.996,9.366 0.777,12.704 3.773,3.338 9.366,2.996 12.704,-0.777 l 29.100468,-33.05767 c 1.13279,-1.28683 0.800246,-3.29785 -0.259,-4.235 -1.059246,-0.93715 -3.099,-1.025 -4.235,0.259 0,0 -9.944868,9.86376 -18.793868,20.71177 -1.04,1.275 -3.505,4.666 -6.064,2.563 -2.657,-2.184 0.427,-5.30501 1.57,-6.53801 9.517,-10.268 18.793868,-20.71176 18.793868,-20.71176 3.269,-3.695 9.009,-4.046 12.704,-0.777 3.695,3.27 4.046,9.009 0.777,12.704 L 26.219,1022.756 c -5.472,6.185 -14.989,6.767 -21.174,1.295 -6.185,-5.472 -6.767,-14.989 -1.295,-21.174 l 38.432,-43.439 c 7.678,-8.673 20.972,-9.486 29.646,-1.812 z\"/>\n  </g>\n</svg>\n"

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = "<svg enable-background=\"new 0 0 18 18\" viewBox=\"0 0 18 18\" xmlns=\"http://www.w3.org/2000/svg\">\n  <g>\n    <path d=\"m16.76 8.051c-.448 0-.855-.303-.969-.757-.78-3.117-3.573-5.294-6.791-5.294s-6.01 2.177-6.79 5.294c-.134.537-.679.861-1.213.727-.536-.134-.861-.677-.728-1.212 1.004-4.009 4.594-6.809 8.731-6.809 4.138 0 7.728 2.8 8.73 6.809.135.536-.191 1.079-.727 1.213-.081.02-.162.029-.243.029z\"/>\n    <path d=\"m9 18c-4.238 0-7.943-3.007-8.809-7.149-.113-.541.234-1.071.774-1.184.541-.112 1.071.232 1.184.773.674 3.222 3.555 5.56 6.851 5.56s6.178-2.338 6.852-5.56c.113-.539.634-.892 1.184-.773.54.112.887.643.773 1.184-.866 4.142-4.57 7.149-8.809 7.149z\"/>\n  </g>\n</svg>\n"

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var coveo_search_ui_1 = __webpack_require__(0);
var UserActionEvents_1 = __webpack_require__(6);
var Icons_1 = __webpack_require__(18);
/**
 * The _AttachToCase_ component is a Result Templates component that allows you to link a result to a Salesforce case.
 *
 * **Note:**
 * > When wanting to attach Knowledge articles, ensure that the `sfkbid`, `sfkbversionnumber` (legacy), `sfversionnumber` (express), and `sflanguage` fields are properly populated on the article
 * (see [Add/Edit Mapping](http://www.coveo.com/go?dest=cloudhelp&lcid=9&context=285) for Cloud V2 and [Managing Fields for a Source](http://www.coveo.com/go?dest=cloudhelp&lcid=9&context=190) for Cloud V1).
 *
 * ```html
 * <div class="CoveoAttachToCase"></div>
 * ```
 */
var AttachToCase = /** @class */ (function (_super) {
    __extends(AttachToCase, _super);
    function AttachToCase(element, options, bindings, result) {
        var _this = _super.call(this, element, AttachToCase.ID, bindings) || this;
        _this.element = element;
        _this.options = options;
        _this.bindings = bindings;
        _this.result = result;
        _this.options = coveo_search_ui_1.ComponentOptions.initComponentOptions(element, AttachToCase, options);
        _this.result = _this.result || _this.resolveResult();
        _this.searchInterface = _this.searchInterface || _this.resolveSearchInterface();
        _this.attached = false;
        _this.loading = false;
        _this.initialized = false;
        var attachToCaseEndpoint = _this.options.attachToCaseEndpoint();
        if (attachToCaseEndpoint != null) {
            _this.setAttachToCaseEndpoint(attachToCaseEndpoint);
        }
        else {
            _this.logger.warn('No endpoint detected, make sure to set one using the SetAttachToCaseEndpoint method.');
            _this.element.remove();
        }
        return _this;
    }
    AttachToCase.prototype.initialize = function () {
        var _this = this;
        if (this.attachToCaseEndpoint != null) {
            // AttachToCaseEndpoint.data can either be a promise or just the data.
            var attachToCaseEndpointPromise = this.attachToCaseEndpoint.data;
            if (attachToCaseEndpointPromise.then) {
                // If the data is a promise, set state to loading, render button and wait for Promise competion.
                this.loading = true;
                attachToCaseEndpointPromise
                    .then(function (data) {
                    _this.attachToCaseEndpoint.data = data;
                    _this.handleData(_this.attachToCaseEndpoint.data);
                    _this.initialized = true;
                    _this.loading = false;
                    _this.updateButton();
                })
                    .catch(function (error) {
                    _this.logger.error('An error occured while getting attached results', error.message);
                });
            }
            else {
                this.attachToCaseEndpoint.data = this.attachToCaseEndpoint.data;
                if (this.attachToCaseEndpoint.data.succeeded) {
                    this.handleData(this.attachToCaseEndpoint.data);
                    this.initialized = true;
                }
                else {
                    this.logger.error('An error occured while getting attached results', this.attachToCaseEndpoint.data.message);
                }
            }
            this.bind.on(window, UserActionEvents_1.UserActionEvents.attachedResultChange, function (args) {
                return _this.handleAttachedResultChangeEvent(args);
            });
            $(this.root).on(UserActionEvents_1.UserActionEvents.attachToCaseStateChanged, function (e, arg) { return _this.handleStateChanged(arg); });
            this.renderButton();
        }
        else {
            this.logger.warn('No endpoint detected, make sure to set one using the SetAttachToCaseEndpoint method.');
        }
    };
    /**
     * Attaches the result to the current Case.
     *
     * ```js
     * $('#myAttachToCase').coveo('attach')
     * ```
     */
    AttachToCase.prototype.attach = function () {
        var _this = this;
        if (this.isAttached() && this.initialized && !this.loading) {
            return;
        }
        this.loading = true;
        this.updateButton();
        // Check for empty *attachedResultRecord* fields ( Note: caseId comes from !{caseId} in AttachToCase.component )
        var requiredFields = ['uriHash', 'resultUrl', 'source', 'title', 'name'];
        var requiredFieldsMissing = [];
        // Temporary variable so we don’t modify *this.result.raw.sfkbversionnumber*
        var actualSfkbVersionNumber = this.result.raw.sfkbversionnumber;
        // If we have an article ... also check articleLanguage and articleVersionNumber
        if (this.result.raw.sfkbid && actualSfkbVersionNumber) {
            requiredFields.push('articleLanguage');
            // Make sure *sfkbversionnumber* is a Number
            actualSfkbVersionNumber = Number(actualSfkbVersionNumber);
            if (_.isNaN(actualSfkbVersionNumber)) {
                var errorMessage = 'The field sfkbversionnumber is not a valid Number.';
                this.logger.error(errorMessage);
                this.displayModalBoxHelper(errorMessage);
                return;
            }
        }
        var resultToAttach = {
            resultUrl: coveo_search_ui_1.StringAndHoles.shortenString(this.result.clickUri, 250, '...').value,
            source: this.result.raw.source,
            title: coveo_search_ui_1.StringAndHoles.shortenString(this.result.title, 250, '...').value,
            name: coveo_search_ui_1.StringAndHoles.shortenString(this.result.title, 80, '...').value,
            uriHash: this.result.raw.urihash,
            knowledgeArticleId: this.result.raw.sfkbid,
            articleLanguage: this.result.raw.sflanguage,
            articleVersionNumber: actualSfkbVersionNumber,
            articlePublishStatus: this.result.raw.sfpublishstatus,
            caseId: this.attachToCaseEndpoint.caseId,
            customs: {}
        };
        // Check fields for empty values
        requiredFields.forEach(function (field) {
            if (_.isEmpty(resultToAttach[field])) {
                requiredFieldsMissing.push(field);
            }
        });
        // If we have missing fields, show error + abort attach()
        if (requiredFieldsMissing.length > 0) {
            var errorMessage = "You're missing the " + requiredFieldsMissing.join(', ') + ' field(s).';
            this.logger.error(errorMessage);
            this.displayModalBoxHelper(errorMessage);
            return;
        }
        var args = {
            result: this.result,
            dataToAttach: resultToAttach
        };
        $(window).trigger(UserActionEvents_1.UserActionEvents.attachToCase, args);
        this.logger.info('Attaching result to case', args);
        this.attachToCaseEndpoint.attachToCase(args.dataToAttach, function (arg) { return _this.handleAttachCallback(arg); });
    };
    /**
     * Detaches the result from the current Case.
     *
     * ```js
     * $('#myAttachToCase').coveo('detach')
     * ```
     */
    AttachToCase.prototype.detach = function () {
        var _this = this;
        if (!this.isAttached() && this.initialized && !this.loading) {
            return false;
        }
        this.loading = true;
        this.updateButton();
        var args = {
            result: this.result,
            caseId: this.attachToCaseEndpoint.caseId
        };
        $(window).trigger(UserActionEvents_1.UserActionEvents.detachFromCase, args);
        this.logger.info('Detaching result from case', args);
        this.attachToCaseEndpoint.detachFromCase(this.result.raw.urihash, this.result.raw.sfkbid, this.attachToCaseEndpoint.caseId, function (arg) { return _this.handleDetachCallback(arg); });
    };
    AttachToCase.prototype.setAttachToCaseEndpoint = function (endpoint) {
        if (endpoint != null) {
            this.attachToCaseEndpoint = endpoint;
            this.initialize();
        }
    };
    /**
     * Returns whether or not the result is attached.
     *
     * ```js
     * $('#myAttachToCase').coveo('isAttached')
     * ```
     */
    AttachToCase.prototype.isAttached = function () {
        return this.attached;
    };
    AttachToCase.prototype.handleClick = function () {
        if (!this.loading) {
            this.isAttached() ? this.detach() : this.attach();
        }
    };
    AttachToCase.prototype.handleData = function (arg) {
        this.attachedResults = arg.attachedResults;
        this.attached =
            _.contains(arg.attachedResults, this.result.raw.urihash) ||
                (coveo_search_ui_1.Utils.isNullOrEmptyString(this.result.raw.sfkbid) ? false : _.contains(arg.attachedResults, this.result.raw.sfkbid));
    };
    AttachToCase.prototype.handleAttachCallback = function (arg) {
        if (arg != null) {
            if (arg.succeeded) {
                this.attached = true;
                if (arg.message) {
                    this.logger.warn(arg.message);
                }
                this.attachedResults.push(this.result.raw.urihash);
                if (!coveo_search_ui_1.Utils.isNullOrEmptyString(this.result.raw.sfkbid)) {
                    this.attachedResults.push(this.result.raw.sfkbid);
                }
                $(window).trigger('attachedResultChange', {
                    attachedResults: this.attachedResults.slice(0),
                    caseId: this.attachToCaseEndpoint.caseId
                });
                var customData = {
                    articleID: this.result.raw.sfkbid,
                    caseID: this.attachToCaseEndpoint.caseId,
                    resultUriHash: this.result.raw.urihash,
                    author: this.result.raw.author
                };
                this.usageAnalytics.logClickEvent(coveo_search_ui_1.analyticsActionCauseList.caseAttach, {
                    documentTitle: this.result.title,
                    documentURL: this.result.clickUri,
                    author: this.result.raw.author
                }, this.result, this.root);
                this.usageAnalytics.logCustomEvent(coveo_search_ui_1.analyticsActionCauseList.caseAttach, customData, this.root);
            }
            else {
                // Display errors ...
                this.logger.error('Attach failed', arg.message);
                this.displayModalBoxHelper(arg.message);
            }
        }
        this.loading = false;
        this.updateButton();
    };
    AttachToCase.prototype.handleDetachCallback = function (arg) {
        if (arg != null) {
            if (arg.succeeded) {
                this.attached = false;
                if (arg.message) {
                    this.logger.warn(arg.message);
                }
                this.logger.debug('Array before delete', this.attachedResults.concat());
                this.deleteFromResults(this.result.raw.urihash);
                if (!coveo_search_ui_1.Utils.isNullOrEmptyString(this.result.raw.sfkbid)) {
                    this.deleteFromResults(this.result.raw.sfkbid);
                }
                this.logger.debug('Array after delete', this.attachedResults);
                $(window).trigger('attachedResultChange', {
                    attachedResults: this.attachedResults.slice(0),
                    caseId: this.attachToCaseEndpoint.caseId
                });
                var customData = {
                    articleID: this.result.raw.sfkbid,
                    caseID: this.attachToCaseEndpoint.caseId,
                    resultUriHash: this.result.raw.urihash,
                    author: this.result.raw.author
                };
                this.usageAnalytics.logCustomEvent(coveo_search_ui_1.analyticsActionCauseList.caseDetach, customData, this.root);
            }
            else {
                this.logger.error('Detach failed', arg.message);
            }
        }
        this.loading = false;
        this.updateButton();
    };
    AttachToCase.prototype.deleteFromResults = function (obj) {
        // `delete` statement sets the element to `null|undefined`
        // If you perform a delete on an element of an array, the length of the array doesn't change. The element index is preserved and the value is set to 'undefined';
        // ie. [a, b, c] delete `b` yields [a, undefined, c]
        this.attachedResults.splice(this.attachedResults.indexOf(obj), 1);
    };
    AttachToCase.prototype.computeIsAttached = function () {
        return (_.contains(this.attachedResults, this.result.raw.urihash) ||
            (coveo_search_ui_1.Utils.isNullOrEmptyString(this.result.raw.sfkbid) ? false : _.contains(this.attachedResults, this.result.raw.sfkbid)));
    };
    AttachToCase.prototype.handleStateChanged = function (arg) {
        if (arg.target != this.element && arg.urihash == this.result.raw.urihash) {
            this.attached = this.computeIsAttached();
            this.loading = arg.loading;
            this.updateButton(false);
        }
    };
    AttachToCase.prototype.handleAttachedResultChangeEvent = function (args) {
        if (this.attachToCaseEndpoint.caseId == args.caseId) {
            var data = this.attachToCaseEndpoint.data;
            this.attachedResults = args.attachedResults;
            data.attachedResults = this.attachedResults;
            this.attached = this.computeIsAttached();
            this.updateButton(false);
        }
    };
    AttachToCase.prototype.displayModalBoxHelper = function (message) {
        Coveo.ModalBox.open($('<p>')
            .text(message)
            .get(0), {
            title: 'An error occured',
            overlayClose: true,
            buttons: Coveo.ModalBox.BUTTON.OK
        });
    };
    AttachToCase.prototype.renderButton = function () {
        var _this = this;
        $(this.element).empty();
        this.buttonElement = $(document.createElement('div')).appendTo(this.element);
        // Add svg
        $(Icons_1.Icons.attachIcon).addClass('coveo-attach-icon').appendTo(this.buttonElement);
        $(Icons_1.Icons.waitIcon).addClass('coveo-loading-icon').appendTo(this.buttonElement);
        if (this.options.displayTooltip) {
            this.tooltipElement = $(document.createElement('div'))
                .addClass('coveo-caption-for-icon')
                .appendTo(this.element);
        }
        if (this.options.displayText) {
            this.textElement = $(document.createElement('span')).appendTo(this.buttonElement);
            this.textElement.addClass('coveo-attach-to-case-text');
        }
        if (!this.options.readonly) {
            $(this.element).click(function () { return _this.handleClick(); });
            $(this.element).hover(function () { return _this.handleHover(true); }, function () { return _this.handleHover(false); });
        }
        this.updateButton();
    };
    AttachToCase.prototype.handleHover = function (isIn) {
        if (this.isAttached() && this.options.displayText) {
            var label = isIn ? coveo_search_ui_1.l('Detach') : coveo_search_ui_1.l('Attached');
            this.textElement.text(label);
        }
    };
    AttachToCase.prototype.sendStateChangedEvent = function () {
        var arg = {
            target: this.element,
            urihash: this.result.raw.urihash,
            loading: this.loading
        };
        $(this.root).trigger(UserActionEvents_1.UserActionEvents.attachToCaseStateChanged, arg);
    };
    AttachToCase.prototype.updateButton = function (sendEvent) {
        if (sendEvent === void 0) { sendEvent = true; }
        this.buttonElement.removeClass();
        if (this.loading) {
            this.buttonElement.addClass('coveo-loading');
        }
        else if (this.isAttached()) {
            this.buttonElement.addClass('coveo-attached');
        }
        else if (!this.options.readonly) {
            this.buttonElement.addClass('coveo-attach');
        }
        if (this.options.readonly) {
            this.buttonElement.addClass('coveo-readonly');
        }
        if (this.options.displayText) {
            this.textElement.text(this.isAttached() ? coveo_search_ui_1.l('Attached') : coveo_search_ui_1.l('Attach'));
        }
        if (this.options.displayTooltip) {
            this.tooltipElement.text(this.isAttached() ? coveo_search_ui_1.l('Attached_tooltip') : coveo_search_ui_1.l('Attach_tooltip'));
        }
        if (sendEvent) {
            this.sendStateChangedEvent();
        }
    };
    AttachToCase.ID = 'AttachToCase';
    AttachToCase.fields = ['sfkbid', 'sfkbversionnumber', 'sfversionnumber', 'sflanguage'];
    /**
     * The possible options for AttachToCase
     * @componentOptions
     */
    AttachToCase.options = {
        /**
         * Specifies if the component should include the Attach/Detach text.
         *
         * Default value is `false`.
         *
         * ```html
         * <div data-display-text='true'/>
         * ```
         */
        displayText: coveo_search_ui_1.ComponentOptions.buildBooleanOption({ defaultValue: false }),
        /**
         * Specifies if the component should include the Attach/Detach tooltip.
         *
         * Default value is `false`.
         *
         * ```html
         * <div data-display-tooltip='true'/>
         * ```
         */
        displayTooltip: coveo_search_ui_1.ComponentOptions.buildBooleanOption({ defaultValue: false }),
        /**
         * Specifies if the component should be in read only mode. When in read only mode, you cannot Attach or Detach results.
         *
         * The default value is `false`.
         *
         * ```html
         * <div data-readonly='true'/>
         * ```
         */
        readonly: coveo_search_ui_1.ComponentOptions.buildBooleanOption({ defaultValue: false }),
        attachToCaseEndpoint: coveo_search_ui_1.ComponentOptions.buildCustomOption(function (name) { return function () { return window[name]; }; }, {
            defaultFunction: function () { return function () { return window['attachToCaseEndpoint']; }; }
        })
    };
    return AttachToCase;
}(coveo_search_ui_1.Component));
exports.AttachToCase = AttachToCase;
coveo_search_ui_1.Initialization.registerComponentFields(AttachToCase.ID, AttachToCase.fields);
coveo_search_ui_1.Initialization.registerAutoCreateComponent(AttachToCase);


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var coveo_search_ui_1 = __webpack_require__(0);
/**
 * Return the filtering expression to show only attached results.
 */
function getExpressions(attachedResults) {
    var builder = new coveo_search_ui_1.ExpressionBuilder();
    var sfkbids = [];
    var sysurihashs = [];
    attachedResults.forEach(function (result) {
        // Each result can either be an urihash or a sfkid
        isKnowledgeArticleId(result) ? sfkbids.push(result) : sysurihashs.push(result);
    });
    if (sysurihashs.length > 0) {
        builder.addFieldExpression('@urihash', '=', sysurihashs);
    }
    if (sfkbids.length > 0) {
        builder.addFieldExpression('@sfkbid', '=', sfkbids);
    }
    // In case we don't have any attached results
    if (sfkbids.length + sysurihashs.length == 0) {
        builder.add('NOT @uri');
    }
    return builder.build(' OR ');
}
exports.getExpressions = getExpressions;
/**
 * Returns true if the Id is from a KnowledeArticle document
 *
 * @param id The id to validate
 */
function isKnowledgeArticleId(id) {
    // A sfkbid should start with "ka" and either be
    // 15 or 18 char long (Salesforce IDs)
    return id.toLowerCase().indexOf('ka') == 0 && (id.length == 15 || id.length == 18);
}
exports.isKnowledgeArticleId = isKnowledgeArticleId;
/**
 * Handle incoming AttachToCase events from other components
 *
 * @param endpoint The local attachToCaseEndpoint
 * @param args The AttachToCase event argument
 * @param onChange A function to be called if the state changed
 */
function handleAttachToCaseEvent(endpoint, args, onChange) {
    if (endpoint && endpoint.caseId == args.dataToAttach.caseId) {
        var data = endpoint.data;
        var hasModification = false;
        if (data.succeeded) {
            // Add the document ID to our list of attached results since it was attached elsewhere.
            if (!_.contains(data.attachedResults, args.result.raw.urihash)) {
                data.attachedResults.push(args.result.raw.urihash);
                hasModification = true;
            }
            // Add the article ID to our list of attached results since it was attached elsewhere.
            var kbid = args.result.raw.sfkbid;
            if (kbid) {
                if (!_.contains(data.attachedResults, kbid)) {
                    data.attachedResults.push(kbid);
                    hasModification = true;
                }
            }
        }
        if (hasModification) {
            onChange(data);
        }
    }
}
exports.handleAttachToCaseEvent = handleAttachToCaseEvent;
/**
 * Handle incoming DetachFromCase events from other components
 *
 * @param endpoint The local attachToCaseEndpoint
 * @param args The DetachFromCase event arguments
 * @param onChange A function to be called if the state changed
 */
function handleDetachFromCase(endpoint, args, onChange) {
    if (endpoint && endpoint.caseId == args.caseId) {
        var data = endpoint.data;
        var hasModification = false;
        if (data.succeeded) {
            // Remove the document ID to our list of attached results since it was detached elsewhere.
            if (_.contains(data.attachedResults, args.result.raw.urihash)) {
                data.attachedResults.splice(data.attachedResults.indexOf(args.result.raw.urihash), 1);
                hasModification = true;
            }
            // Remove the article ID to our list of attached results since it was detached elsewhere.
            var kbid = args.result.raw.sfkbid;
            if (kbid && _.contains(data.attachedResults, kbid)) {
                data.attachedResults.splice(data.attachedResults.indexOf(kbid), 1);
                hasModification = true;
            }
        }
        if (hasModification) {
            onChange(data);
        }
    }
}
exports.handleDetachFromCase = handleDetachFromCase;
/**
 * Handle the data promise resolution.
 *
 * @param endpoint The local endpoint
 */
function handleEndpointDataPromise(endpoint) {
    var dataPromise = endpoint.data;
    var data = endpoint.data;
    if (dataPromise && dataPromise.then) {
        return dataPromise.then(function (d) {
            endpoint.data = d;
            return d;
        });
    }
    else if (data && data.succeeded) {
        return Promise.resolve(data);
    }
}
exports.handleEndpointDataPromise = handleEndpointDataPromise;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var coveo_search_ui_1 = __webpack_require__(0);
/**
 * The _ChatterThumbnail_ component is used in result templates to display the Chatter avatar of users.
 *
 * It is included by default in the User result template.
 *
 * ```html
 * <span class="CoveoChatterThumbnail"></span>
 * ```
 */
var ChatterThumbnail = /** @class */ (function (_super) {
    __extends(ChatterThumbnail, _super);
    function ChatterThumbnail(element, options, bindings, result) {
        var _this = _super.call(this, element, ChatterThumbnail.ID, bindings) || this;
        _this.element = element;
        _this.options = options;
        _this.bindings = bindings;
        _this.result = result;
        _this.options = coveo_search_ui_1.ComponentOptions.initComponentOptions(element, ChatterThumbnail, options);
        _this.result = _this.result || _this.resolveResult();
        coveo_search_ui_1.Assert.exists(_this.result);
        var thumbnailDiv = coveo_search_ui_1.$$('div'); // Create a div container
        var img = coveo_search_ui_1.$$('img'); // Create the image to hold the thumbnail
        img.el.setAttribute('width', _this.options.width);
        img.el.setAttribute('height', _this.options.height);
        img.addClass(ChatterThumbnail.IMG_CLASS);
        thumbnailDiv.append(img.el);
        if (_this.getPhotoUrl()) {
            // If the user doesn't have access to the image or something bad occured.
            img.el.onerror = function () {
                _this.setDefaultImage(img.el);
            };
            img.setAttribute('src', _this.getPhotoUrl());
        }
        else {
            _this.setDefaultImage(img.el);
        }
        // Add the image to the element
        coveo_search_ui_1.$$(_this.element).append(thumbnailDiv.el);
        return _this;
    }
    ChatterThumbnail.prototype.setDefaultImage = function (el) {
        var placeholder = coveo_search_ui_1.$$('span');
        placeholder.addClass(ChatterThumbnail.USER_SVG_CLASS);
        placeholder.addClass(ChatterThumbnail.THUMBNAIL_PLACEHOLDER_CLASS);
        el.parentElement.appendChild(placeholder.el);
        coveo_search_ui_1.$$(el).remove();
    };
    ChatterThumbnail.prototype.getPhotoUrl = function () {
        // Get the smallphotourl (index default field) or sfcreatedbysmallphotourl (express default field)
        return this.result.raw.sfsmallphotourl || this.result.raw.sfcreatedbysmallphotourl || undefined;
    };
    ChatterThumbnail.USER_SVG_CLASS = 'coveo-filetype-salesforce-standard-post';
    ChatterThumbnail.THUMBNAIL_PLACEHOLDER_CLASS = 'coveo-chatter-thumbnail-placeholder';
    ChatterThumbnail.IMG_CLASS = 'coveo-chatter-thumbnail-img';
    ChatterThumbnail.ID = 'ChatterThumbnail';
    /**
     * The possible options for the ChatterThumbnail
     * @componentOptions
     */
    ChatterThumbnail.options = {
        /**
         * Specifies the width of the thumbnail.
         *
         * Defaut value is `45px`.
         *
         * ```html
         * <span width='45px'></span>
         * ```
         */
        width: coveo_search_ui_1.ComponentOptions.buildStringOption({ defaultValue: '45px' }),
        /**
         * Specifies the height of the thumbnail.
         *
         * Default value is `45px`.
         *
         * ```html
         * <span height='45px'></span>
         * ```
         */
        height: coveo_search_ui_1.ComponentOptions.buildStringOption({ defaultValue: '45px' })
    };
    return ChatterThumbnail;
}(coveo_search_ui_1.Component));
exports.ChatterThumbnail = ChatterThumbnail;
coveo_search_ui_1.Initialization.registerComponentFields(ChatterThumbnail.ID, ['sfsmallphotourl', 'sfcreatedbysmallphotourl']);
coveo_search_ui_1.Initialization.registerAutoCreateComponent(ChatterThumbnail);


/***/ }),
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var coveo_search_ui_1 = __webpack_require__(0);
var AttachToCaseUtils = __webpack_require__(26);
var UserActionEvents_1 = __webpack_require__(6);
var AttachedResultsTab = /** @class */ (function (_super) {
    __extends(AttachedResultsTab, _super);
    function AttachedResultsTab(element, options, bindings) {
        var _this = _super.call(this, element, options, bindings) || this;
        _this.element = element;
        _this.options = options;
        $(_this.root).on(coveo_search_ui_1.QueryEvents.doneBuildingQuery, $.proxy(_this.handleDoneBuildingQueryForAttachedResults, _this));
        _this.bind.on(window, UserActionEvents_1.UserActionEvents.attachedResultChange, function (args) {
            return _this.handleAttachedResultChangeEvent(args);
        });
        if (typeof attachToCaseEndpoint != 'undefined' && attachToCaseEndpoint != null) {
            _this.setAttachToCaseEndpoint(attachToCaseEndpoint);
        }
        return _this;
    }
    AttachedResultsTab.prototype.setAttachToCaseEndpoint = function (endpoint) {
        if (endpoint != null) {
            this.attachToCaseEndpoint = endpoint;
        }
    };
    AttachedResultsTab.prototype.handleAttachedResultChangeEvent = function (args) {
        if (this.attachToCaseEndpoint.caseId == args.caseId) {
            var data = this.attachToCaseEndpoint.data;
            data.attachedResults = args.attachedResults;
        }
    };
    AttachedResultsTab.prototype.handleDoneBuildingQueryForAttachedResults = function (e, args) {
        if (!this.disabled && this.isSelected() && this.attachToCaseEndpoint) {
            var data = this.attachToCaseEndpoint.data;
            if (data.succeeded) {
                var expressionBuilder = new coveo_search_ui_1.ExpressionBuilder();
                expressionBuilder.add(AttachToCaseUtils.getExpressions(data.attachedResults));
                if (this.options.expression) {
                    expressionBuilder.add(this.options.expression);
                }
                // We need to clean the constant and advanced expression in
                // order to remove the context and other customizations
                // that would prevent this component from working.
                if (this.options.constant) {
                    args.queryBuilder.constantExpression = expressionBuilder;
                    args.queryBuilder.advancedExpression = new coveo_search_ui_1.ExpressionBuilder();
                }
                else {
                    args.queryBuilder.constantExpression = new coveo_search_ui_1.ExpressionBuilder();
                    args.queryBuilder.advancedExpression = expressionBuilder;
                }
            }
        }
    };
    AttachedResultsTab.ID = 'AttachedResultsTab';
    return AttachedResultsTab;
}(coveo_search_ui_1.Tab));
exports.AttachedResultsTab = AttachedResultsTab;
coveo_search_ui_1.Initialization.registerAutoCreateComponent(AttachedResultsTab);


/***/ }),
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var coveo_search_ui_1 = __webpack_require__(0);
var SalesforceQuickviewDefaultTemplate_1 = __webpack_require__(73);
/**
* The _SalesforceQuickview_ component inherits from the Quickview component, and thus provides all the same options(see [Coveo Component Quickview](https://coveo.github.io/search-ui/components/quickview.html)).
*
* It is made to support LockerService (see [What is LockerService?](https://developer.salesforce.com/docs/atlas.en-us.212.0.lightning.meta/lightning/security_code.htm)).
*
* ```html
* <div class='CoveoSalesforceQuickView'></div>
* ```
*/
var SalesforceQuickview = /** @class */ (function (_super) {
    __extends(SalesforceQuickview, _super);
    /*
     * SalesforceQuickview constructor.
     *
     * @param element The element on which the component will render.
     * @param options The options of the component.
     * @param bindings The component bindings.
     * @param result The current result.
     */
    function SalesforceQuickview(element, options, bindings, result) {
        var _this = _super.call(this, element, SalesforceQuickview.ID, bindings) || this;
        // Search-ui component boilerplate for component option and result initialisation.
        _this.options = coveo_search_ui_1.ComponentOptions.initComponentOptions(element, SalesforceQuickview, options);
        _this.result = result || _this.resolveResult();
        // Override the contentTemplate option if no template exist.
        if (!_this.options.contentTemplate) {
            _this.options.contentTemplate = new SalesforceQuickviewDefaultTemplate_1.SalesforceDefaultQuickviewTemplate();
        }
        _this.quickview = new coveo_search_ui_1.Quickview(element, options, bindings, _this.result);
        return _this;
    }
    /**
    * Opens the `Quickview` modal box.
    */
    SalesforceQuickview.prototype.open = function () {
        this.quickview.open();
    };
    /**
    * Closes the `Quickview` modal box.
    */
    SalesforceQuickview.prototype.close = function () {
        this.quickview.close();
    };
    // Original quickview indirection.
    SalesforceQuickview.prototype.getHashId = function () {
        return this.quickview.getHashId();
    };
    SalesforceQuickview.ID = 'SalesforceQuickview';
    SalesforceQuickview.options = coveo_search_ui_1.Quickview.options;
    return SalesforceQuickview;
}(coveo_search_ui_1.Component));
exports.SalesforceQuickview = SalesforceQuickview;
coveo_search_ui_1.Initialization.registerAutoCreateComponent(SalesforceQuickview);
coveo_search_ui_1.Initialization.registerComponentFields('SalesforceQuickview', ['date']);


/***/ }),
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// Components
__export(__webpack_require__(25));
__export(__webpack_require__(71));
__export(__webpack_require__(35));
__export(__webpack_require__(12));
__export(__webpack_require__(27));
__export(__webpack_require__(7));
__export(__webpack_require__(72));
__export(__webpack_require__(58));
__export(__webpack_require__(75));
__export(__webpack_require__(76));
__export(__webpack_require__(78));
__export(__webpack_require__(80));
__export(__webpack_require__(19));
__export(__webpack_require__(3));
// Load strings
var strings = __webpack_require__(82);
Object.keys(strings).forEach(function (key) {
    String['locales'] = String['locales'] || {};
    String['locales']['en'] = String['locales']['en'] || {};
    String['locales']['en'][key] = strings[key]['en'];
});
String['toLocaleString'].call(this, { en: String['locales']['en'] });


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var coveo_search_ui_1 = __webpack_require__(0);
var AttachToCaseUtils = __webpack_require__(26);
var UserActionEvents_1 = __webpack_require__(6);
var AttachedResultsFilter = /** @class */ (function (_super) {
    __extends(AttachedResultsFilter, _super);
    /**
     * Apply a filter to the current search interface to only show AttachedResults
     *
     * @param element The root element
     * @param options Component options
     * @param bindings Bindings
     */
    function AttachedResultsFilter(element, options, bindings) {
        var _this = _super.call(this, element, AttachedResultsFilter.ID, bindings) || this;
        _this.element = element;
        _this.options = options;
        _this.options = coveo_search_ui_1.ComponentOptions.initComponentOptions(element, AttachedResultsFilter, options);
        _this.attachToCaseEndpoint = _this.options.attachToCaseEndpoint();
        coveo_search_ui_1.Assert.exists(_this.attachToCaseEndpoint);
        _this.bind.onRootElement(coveo_search_ui_1.QueryEvents.doneBuildingQuery, function (arg) {
            return _this.handleDoneBuildingQueryForAttachedResults(arg);
        });
        _this.attachToCaseEndpoint = _this.options.attachToCaseEndpoint();
        // As soon as we have the attached result, execute a query.
        AttachToCaseUtils.handleEndpointDataPromise(_this.attachToCaseEndpoint).then(function () {
            _this.queryController.executeQuery();
        });
        _this.bind.on(window, UserActionEvents_1.UserActionEvents.attachedResultChange, function (args) {
            return _this.handleAttachedResultChangeEvent(args);
        });
        return _this;
    }
    AttachedResultsFilter.prototype.handleAttachedResultChangeEvent = function (args) {
        if (this.attachToCaseEndpoint.caseId == args.caseId) {
            var data = this.attachToCaseEndpoint.data;
            data.attachedResults = args.attachedResults;
            this.queryController.executeQuery();
        }
    };
    AttachedResultsFilter.prototype.handleDoneBuildingQueryForAttachedResults = function (arg) {
        if (!this.disabled) {
            var data = this.attachToCaseEndpoint.data;
            if (this.attachToCaseEndpoint != null && data.succeeded) {
                var expressionBuilder = new coveo_search_ui_1.ExpressionBuilder();
                expressionBuilder.add(AttachToCaseUtils.getExpressions(data.attachedResults));
                arg.queryBuilder.constantExpression = new coveo_search_ui_1.ExpressionBuilder();
                arg.queryBuilder.advancedExpression = expressionBuilder;
            }
        }
    };
    AttachedResultsFilter.ID = 'AttachedResultsFilter';
    /**
     * The possible options for AttachedResultsFilter
     * @componentOptions
     */
    AttachedResultsFilter.options = {
        attachToCaseEndpoint: coveo_search_ui_1.ComponentOptions.buildCustomOption(function () { return window['attachToCaseEndpoint']; }, {
            defaultFunction: function () { return window['attachToCaseEndpoint']; }
        })
    };
    return AttachedResultsFilter;
}(coveo_search_ui_1.Component));
exports.AttachedResultsFilter = AttachedResultsFilter;
coveo_search_ui_1.Initialization.registerAutoCreateComponent(AttachedResultsFilter);


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var coveo_search_ui_1 = __webpack_require__(0);
var ConsoleResultLink = /** @class */ (function (_super) {
    __extends(ConsoleResultLink, _super);
    function ConsoleResultLink(element, options, bindings, result) {
        var _this = _super.call(this, element, coveo_search_ui_1.ComponentOptions.initComponentOptions(element, ConsoleResultLink, options), bindings, result) || this;
        _this.element = element;
        _this.options = options;
        _this.result = result;
        return _this;
    }
    ConsoleResultLink.prototype.bindEventToOpen = function () {
        if (!this.options.workspaceAPI) {
            console.log('ConsoleResultLink: workspaceAPI is null, binding ResultLink open instead.');
            return _super.prototype.bindEventToOpen.call(this);
        }
        return this.bindClickForLightningConsole();
    };
    ConsoleResultLink.prototype.bindClickForLightningConsole = function () {
        // Open the result as a primary tab by default.
        var actionOnClick = (this.options.openInSubTab ? this.openInSubTab : this.openInPrimaryTab).bind(this);
        $(this.element).click(function () {
            actionOnClick().catch(function (err) {
                console.log(err);
            });
        });
        return true;
    };
    ConsoleResultLink.prototype.openInPrimaryTab = function () {
        if (this.options.hrefTemplate) {
            return this.openUrlInPrimaryTab(this.parseStringTemplate(this.options.hrefTemplate));
        }
        return this.openRecordInPrimaryTab(this.getResultSfId());
    };
    ConsoleResultLink.prototype.openInSubTab = function () {
        if (this.options.hrefTemplate) {
            return this.openUrlInSubTab(this.parseStringTemplate(this.options.hrefTemplate));
        }
        return this.openRecordIdInSubTab(this.getResultSfId());
    };
    ConsoleResultLink.prototype.openRecordInPrimaryTab = function (recordId) {
        if (!recordId) {
            console.log('ConsoleResultLink: Could not find a Salesforce ID to navigate to, doing nothing.');
            return Promise.resolve();
        }
        return this.options.workspaceAPI.openTab({
            recordId: recordId,
            focus: true
        });
    };
    ConsoleResultLink.prototype.openUrlInPrimaryTab = function (url) {
        return this.options.workspaceAPI.openTab({
            url: url,
            focus: true
        });
    };
    ConsoleResultLink.prototype.openRecordIdInSubTab = function (recordId) {
        var _this = this;
        if (!recordId) {
            console.log('ConsoleResultLink: Could not find a Salesforce ID to navigate to, doing nothing.');
            return Promise.resolve();
        }
        return this.options.workspaceAPI.getFocusedTabInfo().then(function (response) {
            return _this.options.workspaceAPI.openSubtab({
                parentTabId: response.tabId,
                recordId: recordId,
                focus: true
            });
        });
    };
    ConsoleResultLink.prototype.openUrlInSubTab = function (url) {
        var _this = this;
        return this.options.workspaceAPI.getFocusedTabInfo().then(function (response) {
            return _this.options.workspaceAPI.openSubtab({
                parentTabId: response.tabId,
                url: url,
                focus: true
            });
        });
    };
    ConsoleResultLink.prototype.getResultSfId = function () {
        var idToUse = this.result.raw.sfid;
        // TODO: Make sure this works with Lightning Knowledge...
        // Knowledge article uses the knowledge article version id to navigate.
        if (this.result.raw.sfkbid !== undefined && this.result.raw.sfkavid !== undefined) {
            idToUse = this.result.raw.sfkavid;
        }
        return idToUse || '';
    };
    ConsoleResultLink.ID = 'ConsoleResultLink';
    ConsoleResultLink.fields = ['sfkbid', 'sfkavid', 'sfid'];
    ConsoleResultLink.options = {
        /**
         * Specifies a template literal from which to generate the `ResultLink` `href` attribute value (see
         * [Template literals](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals)).
         *
         * This option overrides the [`field`]{@link ResultLink.options.field} option value.
         *
         * The template literal can reference any number of fields from the parent result. It can also reference global
         * scope properties.
         *
         * **Examples:**
         *
         * - The following markup generates an `href` value such as `http://uri.com?id=itemTitle`:
         *
         * ```html
         * <a class='CoveoResultLink' data-href-template='${clickUri}?id=${raw.title}'></a>
         * ```
         *
         * - The following markup generates an `href` value such as `localhost/fooBar`:
         *
         * ```html
         * <a class='CoveoResultLink' data-href-template='${window.location.hostname}/{Foo.Bar}'></a>
         * ```
         *
         * Default value is `undefined`.
         */
        hrefTemplate: coveo_search_ui_1.ComponentOptions.buildStringOption(),
        /**
         * Specifies a template literal from which to generate the `ResultLink` display title (see
         * [Template literals](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals)).
         *
         * This option overrides the default `ResultLink` display title behavior.
         *
         * The template literal can reference any number of fields from the parent result. However, if the template literal
         * references a key whose value is undefined in the parent result fields, the `ResultLink` title displays the
         * name of this key instead.
         *
         * This option is ignored if the `ResultLink` innerHTML contains any value.
         *
         * **Examples:**
         *
         * - The following markup generates a `ResultLink` display title such as `Case number: 123456` if both the
         * `raw.objecttype` and `raw.objectnumber` keys are defined in the parent result fields:
         *
         * ```html
         * <a class="CoveoResultLink" data-title-template="${raw.objecttype} number: ${raw.objectnumber}"></a>
         * ```
         *
         * - The following markup generates `${myField}` as a `ResultLink` display title if the `myField` key is undefined
         * in the parent result fields:
         *
         * ```html
         * <a class="CoveoResultLink" data-title-template="${myField}"></a>
         * ```
         *
         * - The following markup generates `Foobar` as a `ResultLink` display title, because the `ResultLink` innterHTML is
         * not empty:
         *
         * ```html
         * <a class="CoveoResultLink" data-title-template="${will} ${be} ${ignored}">Foobar</a>
         * ```
         *
         * Default value is `undefined`.
         */
        titleTemplate: coveo_search_ui_1.ComponentOptions.buildStringOption(),
        /**
         * Open links as sub tabs in the Salesforce Console instead of primary tabs.
         *
         * **Examples:**
         *
         * `<a class="CoveoConsoleResultLink" data-open-in-sub-tab="true"></a>
         *
         * Default value is `false`.
         */
        openInSubTab: coveo_search_ui_1.ComponentOptions.buildBooleanOption({ defaultValue: false }),
        workspaceAPI: coveo_search_ui_1.ComponentOptions.buildCustomOption(function () { return null; }, { defaultValue: null, required: true })
    };
    return ConsoleResultLink;
}(coveo_search_ui_1.ResultLink));
exports.ConsoleResultLink = ConsoleResultLink;
coveo_search_ui_1.Initialization.registerComponentFields(ConsoleResultLink.ID, ConsoleResultLink.fields);
coveo_search_ui_1.Initialization.registerAutoCreateComponent(ConsoleResultLink);


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var coveo_search_ui_1 = __webpack_require__(0);
var SalesforceQuickviewDocument_1 = __webpack_require__(74);
/*
 * Default template for the SalesforceQuickview component.
 */
var SalesforceDefaultQuickviewTemplate = /** @class */ (function (_super) {
    __extends(SalesforceDefaultQuickviewTemplate, _super);
    /*
     * The SalesforceDefaultQuickviewTemplate class constructor.
     */
    function SalesforceDefaultQuickviewTemplate() {
        return _super.call(this) || this;
    }
    /*
     * Override of the instantiateToString method of the Template class.
     *
     * @param queryResult The current result in the result list.
     */
    SalesforceDefaultQuickviewTemplate.prototype.instantiateToString = function (queryResult) {
        return "<div class=\"coveo-quick-view-full-height\">\n      <div class=\"" + coveo_search_ui_1.Component.computeCssClassName(SalesforceQuickviewDocument_1.SalesforceQuickviewDocument) + "\" style=\"height: 100%;\">\n      </div>\n    </div>";
    };
    return SalesforceDefaultQuickviewTemplate;
}(coveo_search_ui_1.Template));
exports.SalesforceDefaultQuickviewTemplate = SalesforceDefaultQuickviewTemplate;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var coveo_search_ui_1 = __webpack_require__(0);
/*
 * LockerService compliant version of the Quickview component.
 */
var SalesforceQuickviewDocument = /** @class */ (function (_super) {
    __extends(SalesforceQuickviewDocument, _super);
    /*
     * SalesforceQuickviewDocument constructor.
     * Build an iframe with an html view of the document.
     *
     * @param element The element on which the component will render.
     * @param options The options of the component.
     * @param bindings The component bindings.
     * @param result The current result.
     */
    function SalesforceQuickviewDocument(element, options, bindings, result) {
        var _this = _super.call(this, element, SalesforceQuickviewDocument.ID, bindings) || this;
        _this.result = result || _this.resolveResult();
        _this.buildIFrame();
        return _this;
    }
    // Build the iframe that will show the document preview.
    SalesforceQuickviewDocument.prototype.buildIFrame = function () {
        var iframe = document.createElement('iframe');
        var callOptions = {
            queryObject: this.queryController.getLastQuery()
        };
        iframe.src = this.queryController.getEndpoint().getViewAsHtmlUri(this.result.uniqueId, callOptions);
        this.element.appendChild(iframe);
    };
    SalesforceQuickviewDocument.ID = 'SalesforceQuickviewDocument';
    return SalesforceQuickviewDocument;
}(coveo_search_ui_1.Component));
exports.SalesforceQuickviewDocument = SalesforceQuickviewDocument;
coveo_search_ui_1.Initialization.registerAutoCreateComponent(SalesforceQuickviewDocument);


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var coveo_search_ui_1 = __webpack_require__(0);
/**
 * The _ResultActionsMenu_ component adds a floating result action menu, meant to be used inside result templates (see [Result Templates](https://docs.coveo.com/en/413/javascript-search-framework/result-templates)).
 *
 * It is designed to contain other components that can execute actions related to the result,
 * typically the [Quickview](https://coveo.github.io/search-ui/components/quickview.html) and [AttachToCase]{@link AttachedToCase} components.
 *
 * ```html
 * <script type="text/html" class="result-template" [...]
 *   <div class="coveo-result-frame">
 *     <div class="CoveoResultActionsMenu">
 *       <div class="CoveoAttachToCase" data-display-text="false"></div>
 *       <div class="CoveoQuickview"></div>
 *     </div>
 *   [...]
 * </script>
 * ```
 */
var ResultActionsMenu = /** @class */ (function (_super) {
    __extends(ResultActionsMenu, _super);
    function ResultActionsMenu(element, options, bindings, result) {
        var _this = _super.call(this, element, ResultActionsMenu.ID, bindings) || this;
        _this.element = element;
        _this.options = options;
        _this.bindings = bindings;
        _this.result = result;
        _this.options = coveo_search_ui_1.ComponentOptions.initComponentOptions(element, ResultActionsMenu, options);
        // Find the result containing this ResultActionsMenu
        _this.parentResult = coveo_search_ui_1.$$(_this.element).closest('CoveoResult');
        coveo_search_ui_1.Assert.check(_this.parentResult !== undefined, 'ResultActionsMenu needs to be a child of a Result');
        coveo_search_ui_1.$$(_this.parentResult).addClass('coveo-clickable');
        _this.bindEvents();
        _this.buildMenuItems();
        return _this;
    }
    ResultActionsMenu.prototype.bindEvents = function () {
        var _this = this;
        coveo_search_ui_1.$$(this.parentResult).on('click', function () { return _this.show(); });
        coveo_search_ui_1.$$(this.parentResult).on('mouseleave', function () { return _this.hide(); });
        if (this.options.openOnMouseOver) {
            coveo_search_ui_1.$$(this.parentResult).on('mouseenter', function () { return _this.show(); });
        }
    };
    ResultActionsMenu.prototype.buildMenuItems = function () {
        var _this = this;
        this.menuItems = [];
        _.forEach(coveo_search_ui_1.$$(this.element).children(), function (elem) {
            _this.menuItems.push(elem);
            coveo_search_ui_1.$$(elem).addClass('coveo-result-actions-menu-menu-item');
        });
    };
    /**
     * Shows the floating menu.
     */
    ResultActionsMenu.prototype.show = function () {
        coveo_search_ui_1.$$(this.element).addClass(ResultActionsMenu.SHOW_CLASS);
    };
    /**
     * Hides the floating menu.
     */
    ResultActionsMenu.prototype.hide = function () {
        coveo_search_ui_1.$$(this.element).removeClass(ResultActionsMenu.SHOW_CLASS);
    };
    ResultActionsMenu.ID = 'ResultActionsMenu';
    ResultActionsMenu.SHOW_CLASS = 'coveo-menu-opened';
    /**
     * The possible options for ResultActionsMenu
     * @componentOptions
     */
    ResultActionsMenu.options = {
        /**
         * Specifies whether the menu should open when the user hovers over the result.
         *
         * When set to false, the menu opens only when clicking on the result.
         *
         * Default value is `true`.
         */
        openOnMouseOver: coveo_search_ui_1.ComponentOptions.buildBooleanOption({ defaultValue: true })
    };
    return ResultActionsMenu;
}(coveo_search_ui_1.Component));
exports.ResultActionsMenu = ResultActionsMenu;
coveo_search_ui_1.Initialization.registerAutoCreateComponent(ResultActionsMenu);


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var coveo_search_ui_1 = __webpack_require__(0);
var SalesforceUtils_1 = __webpack_require__(3);
var UserActionEvents_1 = __webpack_require__(6);
var ResultActionsEvents_1 = __webpack_require__(19);
var icon_svg = __webpack_require__(77);
/**
 * The _ResultActionsSendEmail_ component is a Result Template component designed to work
 * with the _ResultActionsMenu_ Result Template component.
 *
 * Its main purpose is to insert the current result in a Salesforce "Email".
 *
 * ```html
 * <div class="CoveoResultActionsMenu">
 *  <div class="ResultActionsSendEmail"></div>
 * </div>
 * ```
 */
var ResultActionsSendEmail = /** @class */ (function (_super) {
    __extends(ResultActionsSendEmail, _super);
    function ResultActionsSendEmail(element, options, bindings, result) {
        var _this = _super.call(this, element, ResultActionsSendEmail.ID, bindings) || this;
        _this.element = element;
        _this.options = options;
        _this.bindings = bindings;
        _this.result = result;
        _this.options = coveo_search_ui_1.ComponentOptions.initComponentOptions(element, ResultActionsSendEmail, options);
        // We should hide until we know for sure that we would init.
        coveo_search_ui_1.$$(_this.element).addClass('coveo-hidden');
        // In case somebody is trying to put that outside of the InsightPanel.
        if (!_this.options.quickActionAPI) {
            _this.deactivate('You need to provide the Salesforce QuickAction API for this component to work.');
        }
        else {
            // Detects if the component should initialize.
            // Checks that the action exists
            _this.options.quickActionAPI.getCustomAction({ actionName: ResultActionsSendEmail.actionName }).then(function (data) {
                if (data.success) {
                    _this.init();
                }
                else {
                    _this.deactivate(data.errors);
                }
            }, function (e) { return _this.deactivate(e); });
        }
        return _this;
    }
    ResultActionsSendEmail.prototype.deactivate = function (e) {
        this.logger.warn(ResultActionsSendEmail.actionName + " action isn't available, component will unrender.", e);
        this.element.remove();
    };
    ResultActionsSendEmail.prototype.sendEmail = function () {
        var _this = this;
        if (this.options.quickActionAPI == null) {
            throw new Error('The QuickAction Lightning API is required');
        }
        var args = {
            actionName: ResultActionsSendEmail.actionName,
            targetFields: {
                HtmlBody: {
                    value: SalesforceUtils_1.SalesforceUtilities.parseStringTemplate(this.options.htmlBody, this.result),
                    insertType: this.options.insertType
                }
            }
        };
        // This is used to allow clients to hook and edit the arg before sending to Salesforce.
        this.bind.trigger(coveo_search_ui_1.$$(this.root), ResultActionsEvents_1.ResultActionsEvents.onSendAsEmail, { result: this.result, args: args });
        this.usageAnalytics.logClickEvent(UserActionEvents_1.UserActionCause.sendAsEmail, null, this.result, this.root);
        this.options.quickActionAPI.setActionFieldValues(args).then(function (data) {
            if (data.success) {
                _this.logger.info('Action sent', args, data);
            }
            else {
                _this.showError(data);
            }
        }, function (error) { return _this.showError(error); });
    };
    ResultActionsSendEmail.prototype.init = function () {
        this.render();
        this.bindEvent();
    };
    ResultActionsSendEmail.prototype.render = function () {
        coveo_search_ui_1.$$(this.element).removeClass('coveo-hidden');
        var icon = document.createElement('span');
        icon.innerHTML = icon_svg;
        this.element.appendChild(icon);
        var caption = document.createElement('span');
        caption.innerText = coveo_search_ui_1.l('SendAsEmail_tooltip');
        caption.className = 'coveo-caption-for-icon';
        this.element.appendChild(caption);
    };
    ResultActionsSendEmail.prototype.bindEvent = function () {
        var _this = this;
        this.element.onclick = function () { return _this.sendEmail(); };
    };
    ResultActionsSendEmail.prototype.showError = function (e) {
        var toastEvent = $A.get('e.force:showToast');
        toastEvent.setParams({
            title: 'Error',
            type: 'error',
            message: 'An error occured while performing the desired action. Make sure the quick action is in your page layout.'
        });
        toastEvent.fire();
        this.logger.error('An error occured while performing the desired action.', e.errors, e.targetFieldErrors);
    };
    ResultActionsSendEmail.ID = 'ResultActionsSendEmail';
    /**
     * The possible options for _ResultActionsPostToFeed_
     * @componentOptions
     */
    ResultActionsSendEmail.options = {
        quickActionAPI: coveo_search_ui_1.ComponentOptions.buildCustomOption(function () { return null; }, { required: true }),
        /**
         * Specifies the template that will be inserted in the "htmlBody" of the Email.
         *
         * Default value is `<a href="${ClickUri}">${title}</a>.`.
         *
         * ```html
         * <div data-html-body='<a href="${ClickUri}">${title}</a>.'/>
         * ```
         */
        htmlBody: coveo_search_ui_1.ComponentOptions.buildStringOption({ defaultValue: '<a href="${ClickUri}">${title}</a>.' }),
        /**
         * Specifies how the component should insert the text in the email.
         * Possible values are `begin`, `end`, `cursor` and `replace`.
         *
         * Default value is `replace`.
         *
         * ```html
         * <div data-insert-type='cursor'/>
         * ```
         */
        insertType: coveo_search_ui_1.ComponentOptions.buildStringOption({ defaultValue: 'replace' })
    };
    ResultActionsSendEmail.actionName = 'Case.SendEmail';
    return ResultActionsSendEmail;
}(coveo_search_ui_1.Component));
exports.ResultActionsSendEmail = ResultActionsSendEmail;
coveo_search_ui_1.Initialization.registerAutoCreateComponent(ResultActionsSendEmail);


/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\r\n<svg version=\"1.1\" id=\"Calque_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n\t viewBox=\"0 0 52 36\" enable-background=\"new 0 0 52 36\" xml:space=\"preserve\">\r\n<g>\r\n\t<path d=\"M50,0H2C0.896,0,0,0.896,0,2v32c0,1.104,0.896,2,2,2h48c1.104,0,2-0.896,2-2V2C52,0.896,51.104,0,50,0z M44.476,4\r\n\t\tL26,19.396L7.524,4H44.476z M4,32V6.27l20.72,17.266C25.09,23.846,25.545,24,26,24c0.455,0,0.91-0.154,1.28-0.464L48,6.27V32H4z\"/>\r\n</g>\r\n</svg>\r\n"

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var coveo_search_ui_1 = __webpack_require__(0);
var SalesforceUtils_1 = __webpack_require__(3);
var UserActionEvents_1 = __webpack_require__(6);
var ResultActionsEvents_1 = __webpack_require__(19);
var icon_svg = __webpack_require__(79);
/**
 * The _ResultActionsPostToFeed_ component is a Result Template component designed to work
 * with the _ResultActionsMenu_ Result Template component.
 *
 * Its main purpose is to insert the current result in a Salesforce Chatter "Post".
 *
 * ```html
 * <div class="CoveoResultActionsMenu">
 *  <div class="CoveoResultActionsPostToFeed"></div>
 * </div>
 * ```
 */
var ResultActionsPostToFeed = /** @class */ (function (_super) {
    __extends(ResultActionsPostToFeed, _super);
    function ResultActionsPostToFeed(element, options, bindings, result) {
        var _this = _super.call(this, element, ResultActionsPostToFeed.ID, bindings) || this;
        _this.element = element;
        _this.options = options;
        _this.bindings = bindings;
        _this.result = result;
        _this.options = coveo_search_ui_1.ComponentOptions.initComponentOptions(element, ResultActionsPostToFeed, options);
        // We should hide until we know for sure that we would init.
        coveo_search_ui_1.$$(_this.element).addClass('coveo-hidden');
        // In case somebody is trying to put that outside of the InsightPanel.
        if (!_this.options.quickActionAPI) {
            _this.deactivate('You need to provide the Salesforce QuickAction API for this component to work.');
        }
        else {
            // Detects if the component should initialize.
            // Checks that the action exists
            _this.options.quickActionAPI.getCustomAction({ actionName: ResultActionsPostToFeed.actionName }).then(function (data) {
                if (data.success) {
                    _this.init();
                }
                else {
                    _this.deactivate(data.errors);
                }
            }, function (e) { return _this.deactivate(e); });
        }
        return _this;
    }
    ResultActionsPostToFeed.prototype.init = function () {
        this.render();
        this.bindEvent();
    };
    ResultActionsPostToFeed.prototype.deactivate = function (e) {
        this.logger.warn(ResultActionsPostToFeed.actionName + " action isn't available, component will unrender.", e);
        this.element.remove();
    };
    ResultActionsPostToFeed.prototype.render = function () {
        coveo_search_ui_1.$$(this.element).removeClass('coveo-hidden');
        var icon = document.createElement('span');
        icon.innerHTML = icon_svg;
        this.element.appendChild(icon);
        var caption = document.createElement('span');
        caption.innerText = coveo_search_ui_1.l('PostToFeed_tooltip');
        caption.className = 'coveo-caption-for-icon';
        this.element.appendChild(caption);
    };
    ResultActionsPostToFeed.prototype.bindEvent = function () {
        var _this = this;
        this.element.onclick = function () { return _this.postToFeed(); };
    };
    ResultActionsPostToFeed.prototype.postToFeed = function () {
        var _this = this;
        if (this.options.quickActionAPI == null) {
            throw new Error('The QuickAction Lightning API is required');
        }
        var args = {
            actionName: ResultActionsPostToFeed.actionName,
            targetFields: {
                Body: {
                    value: SalesforceUtils_1.SalesforceUtilities.parseStringTemplate(this.options.body, this.result),
                    insertType: this.options.insertType
                }
            },
            submitOnSuccess: this.options.autoSubmit
        };
        // This is used to allow clients to hook and edit the arg before sending to Salesforce.
        this.bind.trigger(coveo_search_ui_1.$$(this.root), ResultActionsEvents_1.ResultActionsEvents.onPostToFeed, { result: this.result, args: args });
        this.usageAnalytics.logClickEvent(UserActionEvents_1.UserActionCause.postToFeed, null, this.result, this.root);
        this.options.quickActionAPI.setActionFieldValues(args).then(function (data) {
            if (data.success) {
                _this.logger.info('Action sent', args, data);
            }
            else {
                _this.showError(data);
            }
        }, function (error) { return _this.showError(error); });
    };
    ResultActionsPostToFeed.prototype.showError = function (e) {
        var toastEvent = $A.get('e.force:showToast');
        toastEvent.setParams({
            title: 'Error',
            type: 'error',
            message: 'An error occured while performing the desired action. Make sure the quick action is in your page layout.'
        });
        toastEvent.fire();
        this.logger.error('An error occured while performing the desired action.', e.errors, e.targetFieldErrors);
    };
    ResultActionsPostToFeed.ID = 'ResultActionsPostToFeed';
    /**
     * The possible options for _ResultActionsPostToFeed_
     * @componentOptions
     */
    ResultActionsPostToFeed.options = {
        quickActionAPI: coveo_search_ui_1.ComponentOptions.buildCustomOption(function () { return null; }, { required: true }),
        /**
         * Specifies the template that will be inserted in the "body" of the post.
         *
         * Default value is `<b>${title}</b> (${ClickUri})<br /><p><i>"${Excerpt}"</i></p>`.
         *
         * ```html
         * <div data-body='<b>${title}</b> (${ClickUri})<br /><p><i>"${Excerpt}"</i></p>'/>
         * ```
         */
        body: coveo_search_ui_1.ComponentOptions.buildStringOption({
            defaultValue: '<b>${title}</b> (${ClickUri})<br /><p><i>"${Excerpt}"</i></p>'
        }),
        /**
         * Specifies if the component should submit the post right away.
         *
         * Default value is `false`.
         *
         * ```html
         * <div data-auto-submit='true'/>
         * ```
         */
        autoSubmit: coveo_search_ui_1.ComponentOptions.buildBooleanOption({ defaultValue: false }),
        /**
         * Specifies how the component should insert the text in the post.
         * Possible values are `begin`, `end`, `cursor` and `replace`.
         *
         * Default value is `replace`.
         *
         * ```html
         * <div data-insert-type='cursor'/>
         * ```
         */
        insertType: coveo_search_ui_1.ComponentOptions.buildStringOption({ defaultValue: 'replace' })
    };
    ResultActionsPostToFeed.actionName = 'FeedItem.TextPost';
    return ResultActionsPostToFeed;
}(coveo_search_ui_1.Component));
exports.ResultActionsPostToFeed = ResultActionsPostToFeed;
coveo_search_ui_1.Initialization.registerAutoCreateComponent(ResultActionsPostToFeed);


/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\r\n<svg version=\"1.1\" id=\"Calque_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n\t viewBox=\"0 0 90 78.58\" enable-background=\"new 0 0 90 78.58\" xml:space=\"preserve\">\r\n<g>\r\n\t<path fill=\"none\" d=\"M66.024,56.591c-0.014-0.199,0.001-0.395,0.014-0.592c0.006-0.093-0.001-0.188,0.011-0.279\r\n\t\tc0.02-0.148,0.064-0.289,0.099-0.433c0.031-0.131,0.05-0.267,0.094-0.394c0.031-0.092,0.082-0.177,0.119-0.267\r\n\t\tc0.07-0.167,0.133-0.337,0.223-0.492c0.068-0.119,0.159-0.225,0.238-0.338c0.081-0.114,0.151-0.236,0.242-0.341\r\n\t\tc0.078-0.091,0.175-0.167,0.262-0.252c0.116-0.114,0.225-0.233,0.353-0.334c0.069-0.054,0.15-0.094,0.223-0.144\r\n\t\tc0.166-0.114,0.331-0.228,0.513-0.319c0.01-0.005,0.018-0.013,0.028-0.018c8.246-4.05,13.281-12.595,12.827-21.768\r\n\t\tC80.666,18.417,70.621,8.828,58.404,8.788L31.757,8.701c-0.024,0-0.051,0-0.075,0c-12.521,0-22.815,10.163-22.966,22.692\r\n\t\tL8.704,32.39c-0.076,6.337,2.376,12.267,6.906,16.698c4.53,4.432,10.521,6.773,16.845,6.536l22.463-0.768\r\n\t\tc0.076-0.002,0.148,0.015,0.224,0.017c0.212,0.004,0.424,0.013,0.634,0.048c0.027,0.005,0.053,0.014,0.08,0.019\r\n\t\tc0.765,0.141,1.504,0.475,2.124,1.033l8.585,7.739l-0.542-7.088C66.022,56.613,66.025,56.603,66.024,56.591z\"/>\r\n\t<path d=\"M89.961,30.191C89.127,13.366,75.278,0.142,58.431,0.088L31.785,0c-0.034,0-0.069,0-0.104,0\r\n\t\tC14.419,0,0.223,14.015,0.014,31.291l-0.012,0.996C-0.103,41.024,3.279,49.2,9.525,55.31c5.979,5.847,13.793,9.031,22.109,9.031\r\n\t\tc0.372,0,0.745-0.006,1.119-0.019l20.706-0.708l15.36,13.846c0.817,0.736,1.86,1.12,2.915,1.12c0.651,0,1.308-0.147,1.917-0.446\r\n\t\tc1.598-0.785,2.556-2.462,2.42-4.236l-1.16-15.169C84.698,52.712,90.537,41.825,89.961,30.191z M57.98,55.974\r\n\t\tc-0.62-0.559-1.359-0.892-2.124-1.033c-0.027-0.005-0.053-0.015-0.08-0.019c-0.21-0.035-0.422-0.044-0.634-0.048\r\n\t\tc-0.076-0.002-0.148-0.019-0.224-0.017l-22.463,0.768c-6.324,0.237-12.315-2.104-16.845-6.536\r\n\t\tc-4.529-4.43-6.982-10.361-6.906-16.698l0.012-0.996C8.867,18.866,19.161,8.703,31.682,8.703c0.024,0,0.051,0,0.075,0L58.404,8.79\r\n\t\tc12.218,0.039,22.262,9.629,22.866,21.832c0.454,9.173-4.581,17.718-12.827,21.768c-0.01,0.005-0.018,0.013-0.028,0.018\r\n\t\tc-0.182,0.091-0.347,0.205-0.513,0.319c-0.073,0.05-0.154,0.09-0.223,0.144c-0.128,0.1-0.237,0.22-0.353,0.334\r\n\t\tc-0.086,0.085-0.183,0.161-0.262,0.252c-0.091,0.106-0.162,0.227-0.242,0.341c-0.079,0.113-0.17,0.219-0.238,0.338\r\n\t\tc-0.089,0.156-0.153,0.326-0.223,0.492c-0.037,0.09-0.088,0.174-0.119,0.267c-0.043,0.127-0.062,0.262-0.094,0.394\r\n\t\tc-0.035,0.144-0.079,0.286-0.099,0.433c-0.012,0.091-0.005,0.186-0.011,0.279c-0.014,0.197-0.028,0.393-0.014,0.592\r\n\t\tc0.001,0.011-0.002,0.022-0.001,0.033l0.542,7.088L57.98,55.974z\"/>\r\n</g>\r\n</svg>\r\n"

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var coveo_search_ui_1 = __webpack_require__(0);
var SalesforceUtils_1 = __webpack_require__(3);
var UserActionEvents_1 = __webpack_require__(6);
var ResultActionsEvents_1 = __webpack_require__(19);
var icon_svg = __webpack_require__(81);
/**
 * The _ResultActionsSendLiveAgent_ component is a Result Template component designed to work
 * with the _ResultActionsMenu_ Result Template component.
 *
 * Its main purpose is to insert the current result in a Salesforce Live Agent chat window.
 *
 * ```html
 * <div class="CoveoResultActionsMenu">
 *  <div class="CoveoResultActionsSendLiveAgent"></div>
 * </div>
 * ```
 */
var ResultActionsSendLiveAgent = /** @class */ (function (_super) {
    __extends(ResultActionsSendLiveAgent, _super);
    function ResultActionsSendLiveAgent(element, options, bindings, result) {
        var _this = _super.call(this, element, ResultActionsSendLiveAgent.ID, bindings) || this;
        _this.element = element;
        _this.options = options;
        _this.bindings = bindings;
        _this.result = result;
        _this.options = coveo_search_ui_1.ComponentOptions.initComponentOptions(element, ResultActionsSendLiveAgent, options);
        // We should hide until we know for sure that we would init.
        coveo_search_ui_1.$$(_this.element).addClass('coveo-hidden');
        // In case somebody is trying to put that outside of the InsightPanel.
        if (!_this.options.conversationToolkit) {
            _this.deactivate('You need to provide the Salesforce ConversationToolkit API for this component to work.');
        }
        else {
            // Detects if the component should initialize.
            // RecordId should be a LiveChatTranscript object and "getChatLog" should return something (live session).
            if (_this.options.recordId && _this.options.recordId.substr(0, 3) === ResultActionsSendLiveAgent.LiveChatTranscriptObjectPrefix) {
                _this.options.conversationToolkit
                    .getChatLog({
                    recordId: _this.options.recordId
                })
                    .then(function (d) { return _this.init(); }, function (e) { return _this.deactivate(e); });
            }
            else {
                _this.deactivate("Unsupported ID prefix " + _this.options.recordId.substr(0, 3));
            }
        }
        return _this;
    }
    ResultActionsSendLiveAgent.prototype.init = function () {
        this.render();
        this.bindEvent();
    };
    ResultActionsSendLiveAgent.prototype.deactivate = function (e) {
        console.warn("There's no active conversation, component will not render.", e);
        this.element.remove();
    };
    ResultActionsSendLiveAgent.prototype.render = function () {
        coveo_search_ui_1.$$(this.element).removeClass('coveo-hidden');
        var icon = document.createElement('span');
        icon.innerHTML = icon_svg;
        this.element.appendChild(icon);
        var caption = document.createElement('span');
        caption.innerText = coveo_search_ui_1.l('LiveAgent_tooltip');
        caption.className = 'coveo-caption-for-icon';
        this.element.appendChild(caption);
    };
    ResultActionsSendLiveAgent.prototype.bindEvent = function () {
        var _this = this;
        this.element.onclick = function () { return _this.postToLiveAgent(); };
        this.bind.onRootElement(ResultActionsEvents_1.ResultActionsEvents.onChatEnded, function () { return _this.handleChatEnded(); });
    };
    ResultActionsSendLiveAgent.prototype.handleChatEnded = function () {
        this.logger.info('Chat ended, removing the component.');
        this.element.remove();
    };
    ResultActionsSendLiveAgent.prototype.postToLiveAgent = function () {
        var _this = this;
        var args = {
            recordId: this.options.recordId,
            message: SalesforceUtils_1.SalesforceUtilities.parseStringTemplate(this.options.text, this.result)
        };
        // This is used to allow clients to hook and edit the arg before sending to Salesforce.
        this.bind.trigger(coveo_search_ui_1.$$(this.root), ResultActionsEvents_1.ResultActionsEvents.onSendToLiveAgent, { result: this.result, args: args });
        this.usageAnalytics.logClickEvent(UserActionEvents_1.UserActionCause.sendToLiveAgent, null, this.result, this.root);
        this.options.conversationToolkit.sendMessage(args).then(function () {
            _this.logger.info('Action sent', args);
        }, function (error) { return _this.showError(error); });
    };
    ResultActionsSendLiveAgent.prototype.showError = function (e) {
        var ERROR_MESSAGE = 'An error occured while performing the desired action.';
        var toastEvent = $A.get('e.force:showToast');
        toastEvent.setParams({
            title: 'Error',
            type: 'error',
            message: ERROR_MESSAGE
        });
        toastEvent.fire();
        this.logger.error(ERROR_MESSAGE, e);
    };
    ResultActionsSendLiveAgent.ID = 'ResultActionsSendLiveAgent';
    /**
     * The possible options for _ResultActionsSendLiveAgent_
     * @componentOptions
     */
    ResultActionsSendLiveAgent.options = {
        conversationToolkit: coveo_search_ui_1.ComponentOptions.buildCustomOption(function () { return null; }, { required: true }),
        recordId: coveo_search_ui_1.ComponentOptions.buildStringOption({ defaultValue: null, required: true }),
        /**
         * Specifies the template that will be inserted in the "text" of the message.
         *
         * Default value is `${title} ${ClickUri}`.
         *
         * ```html
         * <div data-text='${title} ${ClickUri}'/>
         * ```
         */
        text: coveo_search_ui_1.ComponentOptions.buildStringOption({
            defaultValue: '${title} ${ClickUri}'
        })
    };
    ResultActionsSendLiveAgent.LiveChatTranscriptObjectPrefix = '570';
    return ResultActionsSendLiveAgent;
}(coveo_search_ui_1.Component));
exports.ResultActionsSendLiveAgent = ResultActionsSendLiveAgent;
coveo_search_ui_1.Initialization.registerAutoCreateComponent(ResultActionsSendLiveAgent);


/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"quick_text\" width=\"100%\" height=\"100%\"><path d=\"M12 1.5C5.8 1.5.7 6.2.7 11.9c0 1.8.5 3.5 1.4 5 .1.3.2.5.1.8l-1.5 4c-.1.4.2.7.6.6l4.1-1.5c.2-.1.5-.1.7.1 1.7.9 3.8 1.5 6 1.5 6.2-.1 11.3-4.7 11.3-10.4 0-5.8-5.1-10.5-11.4-10.5zm-5.2 10c0-.2.2-.4.4-.4h7.4c.2 0 .4.2.4.4v1c0 .2-.1.4-.4.4H7.2c-.2 0-.5-.2-.5-.4v-1zM17.4 16c0 .2-.2.4-.5.4H7.2c-.2 0-.5-.2-.5-.4v-.9c0-.2.2-.5.5-.5h9.7c.2 0 .5.2.5.5v.9zm0-7.1c0 .2-.2.5-.5.5H7.2c-.2 0-.5-.2-.5-.5V8c0-.2.2-.4.5-.4h9.7c.2 0 .5.2.5.4v.9z\"></path></svg>"

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = {"CommunityStateManager_placeholder":{"en":"Placeholder"},"CommunityStateManager_inline":{"en":"Show Omnibox results inline"},"CommunityStateManager_addSearchButton":{"en":"Include search button"},"CommunityStateManager_enableFieldAddon":{"en":"Enable field addon"},"CommunityStateManager_enableSimpleFieldAddon":{"en":"Enable simple field addon"},"CommunityStateManager_listOfFields":{"en":"List of fields"},"CommunityStateManager_enableTopQueryAddon":{"en":"Enable top query addon"},"CommunityStateManager_enableQuerySuggestAddon":{"en":"Enable Coveo Machine Learning query suggestions addon"},"CommunityStateManager_enableQueryExtensionAddon":{"en":"Enable query extension addon"},"CommunityStateManager_activateOmnibox":{"en":"Activate Omnibox"},"CommunityStateManager_autoFocus":{"en":"Auto focus"},"CommunityStateManager_disableQuerySyntax":{"en":"Disable query syntax"},"CommunityStateManager_enableLowercaseOperators":{"en":"Enable lowercase operators"},"CommunityStateManager_enablePartialMatch":{"en":"Enable partial match"},"CommunityStateManager_enableQuerySyntax":{"en":"Enable query syntax"},"CommunityStateManager_enableOmnibox":{"en":"Enable Omnibox"},"CommunityStateManager_enableQuestionMarks":{"en":"Enable question marks"},"CommunityStateManager_enableSearchAsYouType":{"en":"Enable search as you type"},"CommunityStateManager_enableWildcards":{"en":"Enable wildcards"},"CommunityStateManager_partialMatchKeywords":{"en":"Partial match query threshold"},"CommunityStateManager_partialMatchThreshold":{"en":"Partial match result threshold"},"CommunityStateManager_searchAsYouTypeDelay":{"en":"Search as you type delay"},"CommunityStateManager_omniboxDelay":{"en":"Omnibox delay"},"CommunityStateManager_omniboxTimeout":{"en":"Omnibox timeout"},"CommunityStateManager_omniboxChangeLimit":{"en":"Omnibox change limit"},"CommunityStateManager_omniboxMinimumLetters":{"en":"Omnibox minimum letters"},"CommunityStateManager_triggerQueryOnClear":{"en":"Trigger new query on clear"},"Attached_tooltip":{"en":"Detach"},"Attach_tooltip":{"en":"Attach to Case"},"SendAsEmail_tooltip":{"en":"Send as Email"},"PostToFeed_tooltip":{"en":"Post to Feed"},"LiveAgent_tooltip":{"en":"Send to Chat"}}

/***/ })
/******/ ]);(function(e, a) { for(var i in a) e[i] = a[i]; }(window.Coveo || {}, Coveo_tmp_SF))