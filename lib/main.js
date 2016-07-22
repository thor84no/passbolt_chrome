console.log('main');

var ToolbarController = require('controller/toolbarController').ToolbarController;
var toolbar = new ToolbarController();

// React when a browser action's icon is clicked.
chrome.browserAction.onClicked.addListener(function (tab) {
    toolbar.onButtonClick(tab);
});
