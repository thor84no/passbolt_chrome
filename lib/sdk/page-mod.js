/**
 * PageMod Chrome Wrapper
 * Allow using pagemods in chrome almost like firefox sdk
 *
 * @copyright (c) 2015-present Bolt Softwares Pvt Ltd
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */
var ScriptExecution = require('vendors/scriptExecution').ScriptExecution;
var Worker = require('sdk/worker').Worker;

/**
 * PageMod Chrome Wrapper
 *
 * @param args
 * @constructor
 */
var PageMod = function(args) {
  this.args = args;
  this.worker = {};
  this.__init();
};

/**
 * Members
 * @type {{}}
 */
PageMod.prototype.args = {};

/**
 * Public functions
 * Part of Firefox SDK
 */
/**
 * PageMod Destroy
 */
PageMod.prototype.destroy = function () {
  console.log('PageMod::destroy');
};

/**
 * Private function
 * Not part of Firefox SDK
 */
/**
 * PageMod Init
 */
PageMod.prototype.__init = function() {
  var _this = this;

  // The url to use for the pageMod include is not a regex, create one
  if(!(this.args.include instanceof RegExp)) {
    if(this.args.include === '*') {
      this.args.include = new RegExp('.*');
    } else {
      // @TODO patterns like 'about:blank?passbolt=passbolt-iframe*'
      console.log('not implemented');
    }
  }

  // When a tab is updated we try to insert content code if it matches
  // the include and contentScriptWhen pageMod parameters
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    _this.__onTabUpdated(tabId, changeInfo, tab);
  });

  // @TODO Attach to existing tab
  // Using attachto a pagemod can be launched to an already opened tab
  // Useful after an install or a reinstall
  // see. attachTo: ["existing", "top"]
  // Existing = attach to already opened tab (default not)
  // Top = attach to only top document and not iframes
  /**
   * Logic:
   *    If args.attachTo.existing is set
   *      For each opened tabs as tab
   *        If tab.url.match(this.args.include)
   *          Attach content scripts & css
   */

  // @TODO Attach a pagemod to an iframe
  // see. attachTo: ["frame"] // default attachTo value
  // frame = attach to iframes
  /**
   * Logic:
   *    Not sure if it's possible
   *    Maybe loop through the tabs that match the trusted domain
   *    and check urls of iframes?
   */

  // Manage port
  var _this = this;
  function connected(port) {
    //portFromCS = p;
    _this.onConnect(port);
  }
  if(chrome.runtime.onConnect.hasListener(connected)) {
    console.log('remove listener');
    chrome.runtime.onConnect.removeListener(listener);
  }
  chrome.runtime.onConnect.addListener(connected);

};

/**
 * When a tab is updated
 *
 * @param tabId
 * @param changeInfo
 * @param tab
 * @private
 */
PageMod.prototype.__onTabUpdated = function(tabId, changeInfo, tab) {
  // Mapping tabs statuses from chrome -> firefox
  // loading = start
  // complete = ready|end // default
  var status = 'complete';
  if(typeof this.args.contentScriptWhen !== 'undefined' && this.args.contentScriptWhen === 'start') {
    status = 'loading';
  }

  // When the tab status and url matches
  if(changeInfo.status === status && tab.url.match(this.args.include)) {
    var scriptExecution = new ScriptExecution();

    // Inject JS if needed
    if(typeof this.args.contentScriptOptions !== 'undefined' && Object.keys(this.args.contentScriptOptions).length) {
      console.log('content script options');
      var options = this.args.contentScriptOptions;
      var code = '';
      for (var key in options) {
        code += 'var ' + key + '="' + options[key] + '";';
      }
      scriptExecution.executeScript(code);
    }
    if(typeof this.args.contentScriptFile !== 'undefined' && this.args.contentScriptFile.length ) {
      // TODO don't insert if the script is already inserted
      scriptExecution.injectScripts(this.args.contentScriptFile);
    }
    // Inject CSS if needed
    if(typeof this.args.contentStyleFile !== 'undefined' && this.args.contentScriptFile.length ) {
      // TODO don't insert if the CSS is already inserted
      scriptExecution.injectCss(this.args.contentStyleFile);
    }
  }
};

/**
 * When a content code connect to the port
 * Triggers onAttach callback so that events from lib/event can be triggered
 * if the pageMod / worker is set to listen to them
 *
 * @param port
 */
PageMod.prototype.onConnect = function(port) {
  if (port.name === this.args.portName) {
    this._worker = new Worker(port);
    this.args.onAttach(this._worker);
  }
};

/**
 * A little Factory to match the firefox syntax
 */
var pageMod = function(args) {
  return new PageMod(args);
};
exports.PageMod = pageMod;