
var ToolbarController = require('controller/toolbarController').ToolbarController;
var toolbar = new ToolbarController();

// React when a browser action's icon is clicked.
chrome.browserAction.onClicked.addListener(function (tab) {
    toolbar.onButtonClick(tab);
});

var events = {};
events.config = require('./event/configEvents');

exports.events = events;

/*
 * We use this variables to store the references to the pagemods
 * It is usefull for example to re-initialize pagemods after a configuration changes
 * for example when you change the list of domains that you are running passbolt on
 */
var pageMods = {};

/*
 * This pagemod allow inserting classes to help any page
 * to know about the status of the extension, in a modernizr fashion
 * It also helps the plugin to recognise if a page behave like a passbolt app
 */
pageMods = require('pagemod/bootstrapPagemod').bootstrap;
