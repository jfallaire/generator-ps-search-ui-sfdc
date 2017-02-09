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
/// <reference path="../../lib/jquery.d.ts"/>
/// <reference path="../../lib/underscore.d.ts"/>
/// <reference path="../shared/TemplateLoader.ts" />
/// <reference path="../shared/StandaloneIndexContent.ts" />
var Coveo;
(function (Coveo) {
    var Configuration;
    (function (Configuration) {
        (function (UserQueryProfileChoice) {
            UserQueryProfileChoice[UserQueryProfileChoice["ANONYMOUS"] = 0] = "ANONYMOUS";
            UserQueryProfileChoice[UserQueryProfileChoice["STANDARD"] = 1] = "STANDARD";
        })(Configuration.UserQueryProfileChoice || (Configuration.UserQueryProfileChoice = {}));
        var UserQueryProfileChoice = Configuration.UserQueryProfileChoice;
        (function (UserObfuscateChoice) {
            UserObfuscateChoice[UserObfuscateChoice["FULL"] = 0] = "FULL";
            UserObfuscateChoice[UserObfuscateChoice["USERNAMEONLY"] = 1] = "USERNAMEONLY";
            UserObfuscateChoice[UserObfuscateChoice["NONE"] = 2] = "NONE";
        })(Configuration.UserObfuscateChoice || (Configuration.UserObfuscateChoice = {}));
        var UserObfuscateChoice = Configuration.UserObfuscateChoice;
        var ConfigurationPanel = (function () {
            function ConfigurationPanel(element, options) {
                var _this = this;
                this.element = element;
                this.options = options;
                this.userQueryProfileChoiceButton = {
                    "ANONYMOUS": {
                        selected: false,
                        element: undefined,
                        choice: UserQueryProfileChoice.ANONYMOUS
                    },
                    "STANDARD": {
                        selected: false,
                        element: undefined,
                        choice: UserQueryProfileChoice.STANDARD
                    }
                };
                this.userObfuscateChoiceButton = {
                    "FULL": {
                        selected: false,
                        element: undefined,
                        choice: UserObfuscateChoice.FULL
                    },
                    "USERNAMEONLY": {
                        selected: false,
                        element: undefined,
                        choice: UserObfuscateChoice.USERNAMEONLY
                    },
                    "NONE": {
                        selected: false,
                        element: undefined,
                        choice: UserObfuscateChoice.NONE
                    }
                };
                this.options = _.extend(ConfigurationPanel.defaultOptions, options);
                this.configurationSearchSection = Configuration.t('searchConfiguration_container', this.options).appendTo(this.element);
                this.relatedActionSection = Configuration.t('relatedActions_container', this.options).appendTo(this.element);
                this.relatedActionSection.find('.coveo-configure-advanced-button').click(function () {
                    _this.configurationAdvancedSection.is(':visible') ? _this.hideAdvancedConfig() : _this.showAdvancedConfig();
                });
                this.relatedActionSection.find('.coveo-reset-configuration').click(function () {
                    _this.options.onResetConfig();
                });
                this.buildAdvanceConfigSection();
                this.hideAdvancedConfig();
                this.sourceStatusSection = Configuration.t('sourceStatus_container').appendTo(this.element);
                if (!this.options.disableSourceStatus) {
                    this.standaloneIndexContent = new Coveo.StandaloneIndexContent(this.sourceStatusSection, this.options.baseResourcesUrl);
                    this.standaloneIndexContent.prepareRefresh();
                    this.options.refreshStatus();
                    setInterval(function () { return _this.options.refreshStatus(); }, 5000);
                }
            }
            ConfigurationPanel.prototype.hideSourceStatusSection = function (hide) {
                hide ? this.sourceStatusSection.hide() : this.sourceStatusSection.show();
            };
            ConfigurationPanel.prototype.setSourceStatus = function (sources) {
                if (this.standaloneIndexContent) {
                    this.standaloneIndexContent.setSourcesStatus(sources);
                }
            };
            ConfigurationPanel.prototype.setAsAlreadSelectedQueryProfile = function (choice) {
                this.setAsSelectedProfileConfig(choice);
                this.setNotSavedYet(this.saveAdvancedButton);
            };
            ConfigurationPanel.prototype.setAsAlreadSelectedObfuscate = function (choice) {
                this.setAsSelectedObfuscateConfig(choice);
                this.setNotSavedYet(this.saveAdvancedButton);
            };
            ConfigurationPanel.prototype.setAsSelectedProfileConfig = function (choice) {
                _.each(this.userQueryProfileChoiceButton, function (btn) {
                    btn.element.removeClass('coveo-selected');
                    btn.selected = false;
                });
                this.userQueryProfileChoiceButton[UserQueryProfileChoice[choice]].element.addClass('coveo-selected');
                this.userQueryProfileChoiceButton[UserQueryProfileChoice[choice]].selected = true;
                this.setNotSavedYet(this.saveAdvancedButton);
            };
            ConfigurationPanel.prototype.setAsSelectedObfuscateConfig = function (choice) {
                _.each(this.userObfuscateChoiceButton, function (btn) {
                    btn.element.removeClass('coveo-selected');
                    btn.selected = false;
                });
                this.userObfuscateChoiceButton[UserObfuscateChoice[choice]].element.addClass('coveo-selected');
                this.userObfuscateChoiceButton[UserObfuscateChoice[choice]].selected = true;
                this.setNotSavedYet(this.saveAdvancedButton);
            };
            ConfigurationPanel.prototype.showAdvancedConfig = function () {
                this.configurationAdvancedSection.show();
                var btn = this.relatedActionSection.find('.coveo-configure-advanced-button');
                btn.removeClass('coveo-right-arrow');
                btn.addClass('coveo-down-arrow');
            };
            ConfigurationPanel.prototype.hideAdvancedConfig = function () {
                this.configurationAdvancedSection.hide();
                var btn = this.relatedActionSection.find('.coveo-configure-advanced-button');
                btn.removeClass('coveo-down-arrow');
                btn.addClass('coveo-right-arrow');
            };
            ConfigurationPanel.prototype.buildAdvanceConfigSection = function () {
                var _this = this;
                this.configurationAdvancedSection = Configuration.t('advanced_container', this.options).appendTo(this.element);
                this.saveAdvancedButton = this.configurationAdvancedSection.find('.coveo-configure-save');
                var buttonsForQueryProfile = _.map(this.configurationAdvancedSection.find('.coveo-user-profile .coveo-configuration-button'), function (btn) {
                    return $(btn);
                });
                var buttonsForObfuscate = _.map(this.configurationAdvancedSection.find('.coveo-user-obfuscate .coveo-configuration-button'), function (btn) {
                    return $(btn);
                });
                _.each(buttonsForQueryProfile, function (button) {
                    _this.userQueryProfileChoiceButton[_this.fromClassToButton(button)].element = button;
                    button.click(function () {
                        _this.setAsSelectedProfileConfig(UserQueryProfileChoice[_this.fromClassToButton(button)]);
                    });
                });
                _.each(buttonsForObfuscate, function (button) {
                    _this.userObfuscateChoiceButton[_this.fromClassToButton(button)].element = button;
                    button.click(function () {
                        _this.setAsSelectedObfuscateConfig(UserObfuscateChoice[_this.fromClassToButton(button)]);
                    });
                });
                this.saveAdvancedButton.click(function () {
                    var firstSelection = _.find(_this.userQueryProfileChoiceButton, function (choice) {
                        return choice.selected;
                    });
                    var secondSelection = _.find(_this.userObfuscateChoiceButton, function (choice) {
                        return choice.selected;
                    });
                    _this.options.onSaveAdvancedConfig(firstSelection.choice == UserQueryProfileChoice.ANONYMOUS, _this.fromObfuscationEnumToString(secondSelection.choice));
                    _this.setSaved(_this.saveAdvancedButton);
                });
                this.configurationAdvancedSection.find('.coveo-advanced-close').click(function () { return _this.hideAdvancedConfig(); });
            };
            ConfigurationPanel.prototype.fromClassToButton = function (button) {
                if (button.hasClass('coveo-configuration-anonymous-profile')) {
                    return UserQueryProfileChoice[UserQueryProfileChoice.ANONYMOUS];
                }
                if (button.hasClass('coveo-configuration-standard-profile')) {
                    return UserQueryProfileChoice[UserQueryProfileChoice.STANDARD];
                }
                if (button.hasClass('coveo-configuration-full-obfuscate')) {
                    return UserObfuscateChoice[UserObfuscateChoice.FULL];
                }
                if (button.hasClass('coveo-configuration-username-obfuscate')) {
                    return UserObfuscateChoice[UserObfuscateChoice.USERNAMEONLY];
                }
                if (button.hasClass('coveo-configuration-no-obfuscate')) {
                    return UserObfuscateChoice[UserObfuscateChoice.NONE];
                }
            };
            ConfigurationPanel.prototype.setNotSavedYet = function (saveButton) {
                saveButton.addClass('coveo-not-saved-yet');
                saveButton.removeClass('coveo-saved');
                saveButton.text('Not saved');
                saveButton.html(this.getSaveButtonContent(false));
            };
            ConfigurationPanel.prototype.setSaved = function (saveButton) {
                saveButton.addClass('coveo-saved');
                saveButton.removeClass('coveo-not-saved-yet');
                saveButton.html(this.getSaveButtonContent(true));
            };
            ConfigurationPanel.prototype.getSaveButtonContent = function (saved) {
                var text = saved ? 'Saved'.toLocaleString() : 'SaveChanges'.toLocaleString();
                return '<span class="coveo-save-checkmark">&#10004;</span> ' + text;
            };
            ConfigurationPanel.prototype.fromObfuscationEnumToString = function (obfuscation) {
                if (obfuscation == UserObfuscateChoice.FULL) {
                    return 'ObfuscateAll';
                }
                else if (obfuscation == UserObfuscateChoice.USERNAMEONLY) {
                    return 'ObfuscatePreAt';
                }
                return 'DoNotObfuscate';
            };
            ConfigurationPanel.defaultOptions = {
                baseResourcesUrl: '',
                refreshStatus: function () {
                },
                onSaveAdvancedConfig: function (useGuestEmail, obfuscationLevel) {
                    console.log(useGuestEmail, obfuscationLevel);
                },
                searchPageConfigurationUrl: 'https://onlinehelp.coveo.com',
                panelConfigurationUrl: 'https://onlinehelp.coveo.com',
                searchPageUrl: 'https://onlinehelp.coveo.com',
                onResetConfig: function () {
                    console.log('resetting');
                },
                disableSourceStatus: false
            };
            return ConfigurationPanel;
        }());
        Configuration.ConfigurationPanel = ConfigurationPanel;
    })(Configuration = Coveo.Configuration || (Coveo.Configuration = {}));
})(Coveo || (Coveo = {}));
