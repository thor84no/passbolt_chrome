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

  // @TODO
  // Content code request handling
  chrome.runtime.onConnect.addListener(function (port) {
    _this.onContentCodeMessage(port);
  });

};

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
    if(typeof this.args.contentScriptFile !== 'undefined' && this.args.contentScriptFile.length ) {
      scriptExecution.injectScripts(this.args.contentScriptFile);
    }
    // Inject CSS if needed
    if(typeof this.args.contentStyleFile !== 'undefined' && this.args.contentScriptFile.length ) {
      scriptExecution.injectCss(this.args.contentStyleFile);
    }
  }
};

PageMod.prototype.onContentCodeMessage = function(port) {
  if (port.name === this.args.portName) {
    this.args.onAttach(new Worker(port));
  }
};

/**
 * A little Factory to match the firefox syntax
 */
var pageMod = function(args) {
  return new PageMod(args);
};
exports.PageMod = pageMod;
