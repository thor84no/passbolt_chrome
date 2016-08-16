/**
 * The class that deals with users.
 */
var ToolbarController = function() {
};

ToolbarController.prototype.onButtonClick = function(tab) {
  //var setupUrl = chrome.extension.getURL('data/setup.html');
  chrome.tabs.update(tab.id, {url: 'http://passbolt.dev'});
};

// Exports the User object.
exports.ToolbarController = ToolbarController;
