var Coveo;
(function (Coveo) {
    Coveo.t = function (id, obj) {
        return $(Coveo.loadTemplate(id, obj));
    };
    Coveo.loadTemplate = function (id, obj) {
        if (obj == null) {
            obj = {};
        }
        if (Coveo.templates == null) {
            Coveo.templates = {};
        }
        if (Coveo.Provisioning.templates == null) {
            Coveo.Provisioning.templates = {};
        }
        if (Coveo.Configuration.templates == null) {
            Coveo.Configuration.templates = {};
        }
        obj['t'] = obj['t'] || Coveo.loadTemplate;
        var tmplFunc = Coveo.templates[id] ? Coveo.templates[id] : (Coveo.Provisioning.templates[id] ? Coveo.Provisioning.templates[id] : Coveo.Configuration.templates[id]);
        return tmplFunc(obj);
    };
})(Coveo || (Coveo = {}));
var Coveo;
(function (Coveo) {
    var Provisioning;
    (function (Provisioning) {
        Provisioning.t = Coveo.t;
    })(Provisioning = Coveo.Provisioning || (Coveo.Provisioning = {}));
})(Coveo || (Coveo = {}));
var Coveo;
(function (Coveo) {
    var Configuration;
    (function (Configuration) {
        Configuration.t = Coveo.t;
    })(Configuration = Coveo.Configuration || (Coveo.Configuration = {}));
})(Coveo || (Coveo = {}));
var Coveo;
(function (Coveo) {
    var HashUtils = (function () {
        function HashUtils() {
        }
        HashUtils.getHash = function (w) {
            if (w === void 0) { w = window; }
            // window.location.hash returns the DECODED hash on Firefox (it's a well known bug),
            // so any & in values will be already unescaped. This breaks our value splitting.
            // The following trick works on all browsers.
            var ret = "#" + (w.location.href.split("#")[1] || "");
            return HashUtils.getAjaxcrawlableHash(ret);
        };
        HashUtils.getValue = function (value, toParse) {
            toParse = HashUtils.getAjaxcrawlableHash(toParse);
            var paramValue = HashUtils.getRawValue(value, toParse);
            if (paramValue != undefined) {
                paramValue = HashUtils.getValueDependingOnType(paramValue);
            }
            return paramValue;
        };
        HashUtils.encodeValues = function (values) {
            var hash = [];
            _.each(values, function (valueToEncode, key, obj) {
                var encodedValue = "";
                if (!_.isEmpty(valueToEncode)) {
                    encodedValue = HashUtils.encodeArray(valueToEncode);
                }
                else if (_.isObject(valueToEncode) && !_.isEmpty(_.keys(valueToEncode))) {
                    encodedValue = HashUtils.encodeObject(valueToEncode);
                }
                else {
                    encodedValue = encodeURIComponent(valueToEncode.toString());
                }
                if (encodedValue != "") {
                    hash.push(key + "=" + encodedValue);
                }
            });
            return hash.join('&');
        };
        HashUtils.getAjaxcrawlableHash = function (hash) {
            if (hash[1] != undefined && hash[1] == "!") {
                return hash.substring(0, 1) + hash.substring(2);
            }
            else {
                return hash;
            }
        };
        HashUtils.getRawValue = function (value, toParse) {
            var toParseArray = toParse.substr(1).split("&");
            var paramPos = 0;
            var loop = true;
            var paramValue = undefined;
            while (loop) {
                var paramValuePair = toParseArray[paramPos].split("=");
                if (paramValuePair[0] == value) {
                    loop = false;
                    paramValue = paramValuePair[1];
                }
                else {
                    paramPos++;
                    if (paramPos >= toParseArray.length) {
                        paramPos = undefined;
                        loop = false;
                    }
                }
            }
            return paramValue;
        };
        HashUtils.getValueDependingOnType = function (paramValue) {
            var type = HashUtils.getValueType(paramValue);
            var returnValue;
            if (type == "object") {
                returnValue = HashUtils.decodeObject(paramValue);
            }
            else if (type == "array") {
                returnValue = HashUtils.decodeArray(paramValue);
            }
            else {
                returnValue = decodeURIComponent(paramValue);
            }
            return returnValue;
        };
        HashUtils.getValueType = function (paramValue) {
            if (HashUtils.isObject(paramValue)) {
                return "object";
            }
            else if (HashUtils.isArray(paramValue)) {
                return "array";
            }
            else {
                return "other";
            }
        };
        HashUtils.isArrayStartNotEncoded = function (value) {
            return value.substr(0, 1) == HashUtils.Delimiter.arrayStart;
        };
        HashUtils.isArrayStartEncoded = function (value) {
            return value.indexOf(encodeURIComponent(HashUtils.Delimiter.arrayStart)) == 0;
        };
        HashUtils.isArrayEndNotEncoded = function (value) {
            return value.substr(value.length - 1);
        };
        HashUtils.isArrayEndEncoded = function (value) {
            return value.indexOf(encodeURIComponent(HashUtils.Delimiter.arrayEnd)) == value.length - encodeURIComponent(HashUtils.Delimiter.arrayEnd).length;
        };
        HashUtils.isObjectStartNotEncoded = function (value) {
            return value.substr(0, 1) == HashUtils.Delimiter.objectStart;
        };
        HashUtils.isObjectStartEncoded = function (value) {
            return value.indexOf(encodeURIComponent(HashUtils.Delimiter.objectStart)) == 0;
        };
        HashUtils.isObjectEndNotEncoded = function (value) {
            return value.substr(value.length - 1) == HashUtils.Delimiter.objectEnd;
        };
        HashUtils.isObjectEndEncoded = function (value) {
            return value.indexOf(encodeURIComponent(HashUtils.Delimiter.objectEnd)) == value.length - encodeURIComponent(HashUtils.Delimiter.objectEnd).length;
        };
        HashUtils.isObject = function (value) {
            var isObjectStart = HashUtils.isObjectStartNotEncoded(value) || HashUtils.isObjectStartEncoded(value);
            var isObjectEnd = HashUtils.isObjectEndNotEncoded(value) || HashUtils.isObjectEndEncoded(value);
            return isObjectStart && isObjectEnd;
        };
        HashUtils.isArray = function (value) {
            var isArrayStart = HashUtils.isArrayStartNotEncoded(value) || HashUtils.isArrayStartEncoded(value);
            var isArrayEnd = HashUtils.isArrayEndNotEncoded(value) || HashUtils.isArrayEndEncoded(value);
            return isArrayStart && isArrayEnd;
        };
        HashUtils.encodeArray = function (array) {
            var arrayReturn = [];
            _.each(array, function (value) {
                arrayReturn.push(encodeURIComponent(value));
            });
            return HashUtils.Delimiter.arrayStart + arrayReturn.join(",") + HashUtils.Delimiter.arrayEnd;
        };
        HashUtils.encodeObject = function (obj) {
            var ret = HashUtils.Delimiter.objectStart;
            var retArray = [];
            _.each(obj, function (val, key, obj) {
                var retValue = "";
                retValue += "\"" + encodeURIComponent(key) + "\"" + " : ";
                if (_.isArray(val)) {
                    retValue += HashUtils.encodeArray(val);
                }
                else if (_.isObject(val)) {
                    retValue += HashUtils.encodeObject(val);
                }
                else {
                    if (_.isNumber(val) || _.isBoolean(val)) {
                        retValue += encodeURIComponent(val);
                    }
                    else {
                        retValue += "\"" + encodeURIComponent(val) + "\"";
                    }
                }
                retArray.push(retValue);
            });
            ret += retArray.join(" , ");
            return ret + HashUtils.Delimiter.objectEnd;
        };
        HashUtils.decodeObject = function (obj) {
            if (HashUtils.isObjectStartEncoded(obj) && HashUtils.isObjectEndEncoded(obj)) {
                obj = obj.replace(/encodeURIComponent(HashUtils.Delimiter.objectStart)/, HashUtils.Delimiter.objectStart);
                obj = obj.replace(encodeURIComponent(HashUtils.Delimiter.objectEnd), HashUtils.Delimiter.objectEnd);
            }
            return JSON.parse(decodeURIComponent(obj));
        };
        HashUtils.decodeArray = function (value) {
            if (HashUtils.isArrayStartEncoded(value) && HashUtils.isArrayEndEncoded(value)) {
                value = value.replace(encodeURIComponent(HashUtils.Delimiter.arrayStart), HashUtils.Delimiter.arrayStart);
                value = value.replace(encodeURIComponent(HashUtils.Delimiter.arrayEnd), HashUtils.Delimiter.arrayEnd);
            }
            value = value.substr(1);
            value = value.substr(0, value.length - 1);
            var array = value.split(",");
            return _.map(array, function (val) {
                return decodeURIComponent(val);
            });
        };
        HashUtils.Delimiter = {
            "objectStart": "{",
            "objectEnd": "}",
            "arrayStart": "[",
            "arrayEnd": "]",
            "objectStartRegExp": "^{",
            "objectEndRegExp": "}+$",
            "arrayStartRegExp": "^[",
            "arrayEndRegExp": "]+$"
        };
        return HashUtils;
    }());
    Coveo.HashUtils = HashUtils;
})(Coveo || (Coveo = {}));
var Coveo;
(function (Coveo) {
    var Switch = (function () {
        function Switch(label, activeAtStart, onActivate, onDeactivate) {
            var _this = this;
            if (activeAtStart === void 0) { activeAtStart = false; }
            this.label = label;
            this.active = activeAtStart;
            this.element = Coveo.t('switch', this);
            var switchIcon = this.element.find('.coveo-switch');
            if (this.active) {
                switchIcon.addClass('coveo-active');
            }
            this.element.click(function () {
                _this.active = !_this.active;
                switchIcon.toggleClass('coveo-active', _this.active);
            });
        }
        return Switch;
    }());
    Coveo.Switch = Switch;
})(Coveo || (Coveo = {}));
/// <reference path="../shared/Switch.ts" />
var Coveo;
(function (Coveo) {
    var Provisioning;
    (function (Provisioning) {
        var SetupOrgPanel = (function () {
            function SetupOrgPanel(element, mainPanel) {
                var _this = this;
                this.element = element;
                this.alreadySetupSection = Provisioning.t('setupOrgPanel_alreadySetup').appendTo(this.element);
                this.buildLinkToOnPremSection(mainPanel);
                this.linkToCloudSection = Provisioning.t('setupOrgPanel_linkToCloud', mainPanel.options).appendTo(this.element);
                this.linkToCloudSection.find('.coveo-button').click(function () { return mainPanel.options.onLinkToExistingCloud(); });
                var showCloud = this.alreadySetupSection.find('.coveo-setup-org-already-setup-cloud a');
                var hideCloud = this.linkToCloudSection.find('a');
                showCloud.click(function () {
                    _this.element.addClass('coveo-showing-cloud');
                });
                hideCloud.click(function () {
                    _this.element.removeClass('coveo-showing-cloud');
                });
                this.chooseOrgNameSection = Provisioning.t('setupOrgPanel_chooseOrgName').appendTo(this.element);
                var orgNameInput = this.chooseOrgNameSection.find('input');
                var orgNameError = this.chooseOrgNameSection.find('.coveo-error');
                this.chooseSalesforceContentSection = Provisioning.t('setupOrgPanel_chooseSalesforceContent').appendTo(this.element);
                var switchesSection = this.chooseSalesforceContentSection.find('.coveo-setup-org-choose-salesforce-content-selection-switches');
                var switches = [
                    new Coveo.Switch('SalesforceStandardObjects', true),
                    new Coveo.Switch('SalesforceKnowledgeBase', true),
                    new Coveo.Switch('SalesforceContent', true)
                ];
                _.each(switches, function (s) {
                    s.element.appendTo(switchesSection);
                });
                this.buildCreateOrgSection(mainPanel, orgNameError, orgNameInput, switches);
            }
            SetupOrgPanel.prototype.buildCreateOrgSection = function (mainPanel, orgNameError, orgNameInput, switches) {
                this.createOrgSection = Provisioning.t('setupOrgPanel_createOrg', mainPanel.options).appendTo(this.element);
                this.createOrgSection.find('.coveo-button').click(function () {
                    mainPanel.resetError(orgNameError);
                    var orgName = orgNameInput.val();
                    var flags = _.map(switches, function (s) {
                        return s.active;
                    });
                    if (orgName == '') {
                        mainPanel.addError(orgNameError, 'SetupOrgNameEmptyError'.toLocaleString());
                    }
                    else {
                        mainPanel.options.onCreateOrg(orgName, flags[0], flags[1], flags[2]);
                    }
                });
            };
            SetupOrgPanel.prototype.buildLinkToOnPremSection = function (mainPanel) {
                var _this = this;
                this.linkToOnPremiseSection = Provisioning.t('setupOrgPanel_linkToOnPremise', mainPanel.options).appendTo(this.element);
                var inputServer = this.linkToOnPremiseSection.find('input');
                var serverEmptyError = this.linkToOnPremiseSection.find('.coveo-error');
                var showOnPrem = this.alreadySetupSection.find('.coveo-setup-org-already-setup-onprem a');
                var hideOnPrem = this.linkToOnPremiseSection.find('a');
                showOnPrem.click(function () {
                    _this.element.addClass('coveo-showing-on-premise');
                });
                hideOnPrem.click(function () {
                    _this.element.removeClass('coveo-showing-on-premise');
                });
                this.linkToOnPremiseSection.find('.coveo-button').click(function () {
                    mainPanel.resetError(serverEmptyError);
                    if (inputServer.val() == '') {
                        mainPanel.addError(serverEmptyError, 'SetupOrgLinkOnPremiseError'.toLocaleString());
                    }
                    else {
                        mainPanel.options.onLinkToExistingOnPrem(inputServer.val());
                    }
                });
            };
            return SetupOrgPanel;
        }());
        Provisioning.SetupOrgPanel = SetupOrgPanel;
    })(Provisioning = Coveo.Provisioning || (Coveo.Provisioning = {}));
})(Coveo || (Coveo = {}));
/// <reference path="Source.ts" />
var Coveo;
(function (Coveo) {
    var StandaloneIndexContent = (function () {
        function StandaloneIndexContent(element, baseResourcesUrl) {
            this.element = element;
            this.baseResourcesUrl = baseResourcesUrl;
        }
        StandaloneIndexContent.prototype.setSourcesStatus = function (status) {
            if (status && status.length != 0) {
                if (this.tableSection) {
                    this.tableSection.remove();
                }
                this.tableSection = Coveo.t('table', { tableRows: status }).appendTo(this.element);
            }
        };
        StandaloneIndexContent.prototype.prepareRefresh = function () {
            if (!this.tableSection) {
                this.tableSection = Coveo.t('tableWaiting', { baseResourcesUrl: this.baseResourcesUrl }).appendTo(this.element);
            }
        };
        return StandaloneIndexContent;
    }());
    Coveo.StandaloneIndexContent = StandaloneIndexContent;
})(Coveo || (Coveo = {}));
/// <reference path="../shared/Switch.ts" />
/// <reference path="../shared/Source.ts" />
/// <reference path="../shared/StandaloneIndexContent.ts" />
var Coveo;
(function (Coveo) {
    var Provisioning;
    (function (Provisioning) {
        var IndexContentPanel = (function () {
            function IndexContentPanel(element, mainPanel) {
                var _this = this;
                this.element = element;
                this.mainPanel = mainPanel;
                this.titleSection = Provisioning.t('indexContentPanel_title', mainPanel.options).appendTo(this.element);
                this.tableSection = Provisioning.t('indexContentPanel_indexContentContainer').appendTo(this.element);
                this.standaloneIndexContent = new Coveo.StandaloneIndexContent(this.tableSection, mainPanel.options.baseResourcesUrl);
                this.continueSection = Provisioning.t('indexContentPanel_continue').appendTo(this.element);
                this.skipSection = Provisioning.t('indexContentPanel_skip').appendTo(this.element);
                this.activateContinueOnce = _.once(function () {
                    _this.continueSection.addClass('coveo-active');
                    _this.continueSection.find('.coveo-button').click(function () { return _this.goToNextStep(); });
                });
                this.skipSection.find('a').click(function () {
                    _this.goToNextStep();
                });
            }
            IndexContentPanel.prototype.prepareRefresh = function () {
                this.standaloneIndexContent.prepareRefresh();
            };
            IndexContentPanel.prototype.setSourcesStatus = function (status) {
                this.standaloneIndexContent.setSourcesStatus(status);
                // activate if all source have at least one document;
                // or if the source is IDLE but contains 0 document;
                if (_.every(status, function (s) {
                    return (s.numberOfDocuments > 0) || (s.isFinished);
                })) {
                    this.activateContinueOnce();
                }
            };
            IndexContentPanel.prototype.goToNextStep = function () {
                this.mainPanel.setActive(3);
                this.mainPanel.setAsFinished(1);
                this.mainPanel.setAsFinished(2);
                this.mainPanel.setUnableToReach(1);
                this.mainPanel.setUnableToReach(2);
            };
            return IndexContentPanel;
        }());
        Provisioning.IndexContentPanel = IndexContentPanel;
    })(Provisioning = Coveo.Provisioning || (Coveo.Provisioning = {}));
})(Coveo || (Coveo = {}));
var Coveo;
(function (Coveo) {
    var Provisioning;
    (function (Provisioning) {
        var ConfigureSearchPanel = (function () {
            function ConfigureSearchPanel(element, mainPanel) {
                this.element = element;
                this.introSection = Provisioning.t('configureSearchPanel_intro').appendTo(this.element);
                this.configureSection = Provisioning.t('configureSearchPanel_editor', mainPanel.options).appendTo(this.element);
                this.helpSection = Provisioning.t('configureSearchPanel_help', mainPanel.options).appendTo(this.element);
            }
            return ConfigureSearchPanel;
        }());
        Provisioning.ConfigureSearchPanel = ConfigureSearchPanel;
    })(Provisioning = Coveo.Provisioning || (Coveo.Provisioning = {}));
})(Coveo || (Coveo = {}));
/// <reference path="../../lib/jquery.d.ts"/>
/// <reference path="../../lib/underscore.d.ts"/>
/// <reference path="../shared/TemplateLoader.ts" />
/// <reference path="../shared/Source.ts" />
/// <reference path="../shared/HashUtils.ts" />
/// <reference path="SetupOrgPanel.ts" />
/// <reference path="IndexContentPanel.ts" />
/// <reference path="ConfigureSearchPanel.ts" />
var Coveo;
(function (Coveo) {
    var Provisioning;
    (function (Provisioning) {
        var ProvisioningPanel = (function () {
            function ProvisioningPanel(element, options) {
                this.element = element;
                this.options = options;
                this.headers = [];
                this.content = [];
                this.options = _.extend(ProvisioningPanel.defaultOptions, options);
                this.headerForSetupOrg = Provisioning.t('setupOrgPanel_header').appendTo(this.element);
                this.headerForIndexContent = Provisioning.t('indexContentPanel_header').appendTo(this.element);
                this.headerForConfigureSearch = Provisioning.t('configureSearchPanel_header').appendTo(this.element);
                this.contentForSetupOrg = Provisioning.t('setupOrgPanel_main').appendTo(this.element);
                this.contentForIndexContent = Provisioning.t('indexContentPanel_main').appendTo(this.element);
                this.contentForConfigureSearch = Provisioning.t('configureSearchPanel_main').appendTo(this.element);
                this.headers.push(this.headerForSetupOrg, this.headerForIndexContent, this.headerForConfigureSearch);
                this.content.push(this.contentForSetupOrg, this.contentForIndexContent, this.contentForConfigureSearch);
                this.setupOrgPanel = new Provisioning.SetupOrgPanel(this.contentForSetupOrg, this);
                this.indexContentPanel = new Provisioning.IndexContentPanel(this.contentForIndexContent, this);
                this.configureSearchPanel = new Provisioning.ConfigureSearchPanel(this.contentForConfigureSearch, this);
                this.setInitialStep();
                if (this.options.disableSourceStatus) {
                    this.setUnableToReach(2);
                }
            }
            ProvisioningPanel.prototype.setSourceStatus = function (sources) {
                this.indexContentPanel.setSourcesStatus(sources);
            };
            ProvisioningPanel.prototype.resetError = function (error) {
                error.removeClass('coveo-active');
                error.empty();
            };
            ProvisioningPanel.prototype.addError = function (error, msg) {
                error.addClass('coveo-active');
                error.append(msg);
            };
            ProvisioningPanel.prototype.setAsFinished = function (step) {
                this.headers[step - 1].addClass('coveo-finished');
                this.setUnableToReach(step);
            };
            ProvisioningPanel.prototype.setUnableToReach = function (step) {
                this.headers[step - 1].off('click');
            };
            ProvisioningPanel.prototype.setActive = function (step) {
                var _this = this;
                location.hash = Coveo.HashUtils.encodeValues({ step: step });
                if (step == 2) {
                    this.sourceRefreshInterval = setInterval(function () { return _this.refreshInternally(); }, 5000);
                }
                else if (this.sourceRefreshInterval != undefined) {
                    clearInterval(this.sourceRefreshInterval);
                }
                this.switchActive(this.headers[step - 1], this.headers);
                this.switchActive(this.content[step - 1], this.content);
            };
            ProvisioningPanel.prototype.refreshInternally = function () {
                this.indexContentPanel.prepareRefresh();
                this.options.refreshStatus();
            };
            ProvisioningPanel.prototype.setInitialStep = function () {
                var currentStep = Coveo.HashUtils.getValue('step', Coveo.HashUtils.getHash());
                if (_.isUndefined(currentStep) || currentStep == 1 || currentStep > 3 || currentStep < 1 || isNaN(currentStep)) {
                    this.setUnableToReach(2);
                    this.setUnableToReach(3);
                    this.setActive(1);
                }
                if (currentStep == 2) {
                    this.setAsFinished(1);
                    this.setActive(2);
                }
                if (currentStep == 3) {
                    this.setAsFinished(1);
                    this.setAsFinished(2);
                    this.setActive(3);
                }
            };
            ProvisioningPanel.prototype.switchActive = function (active, others) {
                active.addClass('coveo-active');
                if (active == this.contentForIndexContent) {
                    this.refreshInternally();
                }
                _.chain(others)
                    .reject(function (o) {
                    return o == active;
                })
                    .each(function (o) {
                    o.removeClass('coveo-active');
                });
            };
            ProvisioningPanel.defaultOptions = {
                userName: "Anonymous User",
                userEmail: "anonymoususer@anonymous.com",
                baseResourcesUrl: '',
                refreshStatus: function () {
                },
                onCreateOrg: function (orgName, standardSalesforceObject, salesforceKnowledgeBase, salesforceContent) {
                },
                onLinkToExistingCloud: function () {
                },
                onLinkToExistingOnPrem: function (serverUrl) {
                },
                onPremUrl: '',
                searchPageConfigurationUrl: 'https://onlinehelp.coveo.com',
                panelConfigurationUrl: 'https://onlinehelp.coveo.com',
                disableSourceStatus: false
            };
            return ProvisioningPanel;
        }());
        Provisioning.ProvisioningPanel = ProvisioningPanel;
    })(Provisioning = Coveo.Provisioning || (Coveo.Provisioning = {}));
})(Coveo || (Coveo = {}));
