

var events = {};
events.config = require('./event/configEvents');

exports.events = events;


/* ==================================================================================
 *  Interface changes
 *  Where we affect the look and feel of the firefox instance
 * ==================================================================================
 */
require('./controller/toolbarController');

/* ==================================================================================
 *  Page mods
 *  Run scripts in the context of web pages whose URL matches a given pattern.
 *  see. https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/page-mod
 * ==================================================================================
 */
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

/*
 * This pagemod drives the login / authentication
 */
//var PassboltAuth = require('./pagemod/passboltAuthPagemod').PassboltAuth;
//pageMods.passboltAuth = PassboltAuth;
//pageMods.passboltAuth.init();
