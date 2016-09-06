/**
 * PageMod Chrome Wrapper
 * Allow using pagemods in chrome almost like firefox sdk
 *
 * @copyright (c) 2015-present Bolt Softwares Pvt Ltd
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */
var ScriptExecution = require('vendors/scriptExecution').ScriptExecution;
var Crypto = require('model/crypto').Crypto;
var Worker = require('sdk/worker').Worker;
var Workers = require('model/workers');
var i = 0;

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
  console.log('PageMod::destroy not implemented');
};

/**
 * Private function
 * Not part of Firefox SDK
 */
/**
 * PageMod Init
 */
PageMod.prototype.__init = function() {

  // The url to use for the pageMod include is not a regex, create one
  if(!(this.args.include instanceof RegExp)) {
    if(this.args.include === '*') {
      this.args.include = new RegExp('.*');
    } else {
      // For URL patterns like 'about:blank?passbolt=passbolt-iframe*'
      // Contrarily to Firefox we do not inject scripts in the page
      // They are loaded via chrome-extension://[pluginid]/js/iframe.html templates
      // We wait for the page mod to initiate the connection
      this.__onIframeConnectInit();
      return;
    }
  }

  // When a tab is updated we try to insert content code if it matches
  // the include and contentScriptWhen pageMod parameters
  var _this = this;
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    _this.__onTabUpdated(tabId, changeInfo, tab);
  });

  // @TODO Attach to existing tabs
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
};

/**
 * Manage runtime.onConnect listeners
 *
 * @private
 */
PageMod.prototype.__onConnectListener = function() {
  var _this = this;
  function connected(port) {
    if(port.name === _this.portname) {
      chrome.runtime.onConnect.removeListener(connected);
      _this.onConnect(port);
    }
  }
  chrome.runtime.onConnect.addListener(connected);
};

/**
 * iFrame port init
 * @private
 */
PageMod.prototype.__onIframeConnectInit = function() {
  // We use the passbolt part of the location for ifrrame portname
  // e.g. about:blank?passbolt=iframeId
  var iframeId = this.args.include.split('passbolt=')[1];
  this.portname = iframeId;
  this.__onConnectListener();
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
    // a tool to handle script, variable and css insertion in target page
    var scriptExecution = new ScriptExecution();

    // generate a portname based on the tab it and listen to it
    this.portname = 'port-' + Crypto.uuid(tabId);
    this.__onConnectListener();

    // set portname as global variable to be used by data/js/port.js
    scriptExecution.setGlobals({portname:this.portname});

    // Set JS global variables if needed
    if(typeof this.args.contentScriptOptions !== 'undefined' && Object.keys(this.args.contentScriptOptions).length) {
      scriptExecution.setGlobals(this.args.contentScriptOptions);
    }

    // Inject JS files if needed
    var scripts = [];
    if(typeof this.args.contentScriptFile !== 'undefined' && this.args.contentScriptFile.length ) {
      scripts = this.args.contentScriptFile.slice();
    }
    scripts.unshift('js/lib/port.js'); // add a firefox-like self.port layer
    scriptExecution.injectScripts(scripts);

    // Inject CSS files if needed
    if(typeof this.args.contentStyleFile !== 'undefined' && this.args.contentStyleFile.length ) {
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
  this._worker = new Worker(port);
  this.args.onAttach(this._worker);
};

/**
 * A little Factory to match the firefox syntax
 */
var pageMod = function(args) {
  return new PageMod(args);
};
exports.PageMod = pageMod;
