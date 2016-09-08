/**
 * Config model.
 *
 * @copyright (c) 2015-present Bolt Softwares Pvt Ltd
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */
var app = require('../main');

/**
 * Get the context of a given worker
 *
 * @param worker The worker to get the context for
 * @returns {string} The worker identifier
 */
var getTabId = function(worker) {
  return worker.tab.id;
};
exports.getTabId = getTabId;

/**
 * Reference a worker
 *
 * @param key
 * @param worker
 */
var add = function(key, worker, options) {

  options = options || {};
  var removeOnTabUrlChange = options.removeOnTabUrlChange || false;
  var tabId = getTabId(worker);

  if (exists(key, tabId)) {
    //console.warn('[WARNING] the worker ' + key + ' already exists, it has been added but weird behaviors are expected.');
    app.workers[tabId][key].destroy();
  }

  // Add the worker to the list of active app workers.
  if (typeof app.workers[tabId] === 'undefined') {
    app.workers[tabId] = {};
  }
  app.workers[tabId][key] = worker;

  // Listen to worker detached event
  // Triggered by worker.destroy see bellow
  var onWorkerDetachHandler = function() {
    if (exists(key, tabId)) {
      remove(key, tabId);
    }
  };
  worker.on('detach', onWorkerDetachHandler);

  // Listen to tab url changes.
  var url = worker.tab.url;
  var onTabReadyHandler = function(tab) {
    if (url != tab.url) {
      // If callback given in option
      if (options.onTabUrlChange) {
        options.onTabUrlChange.apply(this, worker);
      }
      // If the worker should be destroyed on tab change.
      if (removeOnTabUrlChange) {
        worker.tab.removeListener('ready', onTabReadyHandler);
        worker.destroy();
      }
    }
  };
  worker.tab.on('ready', onTabReadyHandler);
};
exports.add = add;

/**
 * Remove a worker
 *
 * @param key The identifier of the worker
 * @param tabId The worker context identifier
 */
var remove = function(key, tabId) {
  if (!exists(key, tabId)) {
    console.warn('[WARNING] Unable to remove the worker ' + key + ', it doesn\'t exist on the tab ' + tabId + ' .');
  } else {
    delete app.workers[tabId][key];
  }
};
exports.remove = remove;

/**
 * Get a worker
 *
 * @param key The worker identifier
 * @param tabId The worker context identifier
 * @return the worker if found or null
 */
var get = function(key, tabId) {
  if (typeof app.workers[tabId][key] != 'undefined') {
    return app.workers[tabId][key];
  }
  return null;
};
exports.get = get;

/**
 * Get all workers keys
 *
 * @param tabId The context identifier
 * @return array
 */
var getAllKeys = function(tabId) {
  return Object.keys(app.workers[tabId]);
};
exports.getAllKeys = getAllKeys;

/**
 * Checks that a worker exists
 *
 * @param key
 * @param tabId The worker context identifier
 * @return boolean
 */
var exists = function(key, tabId) {
  return (typeof app.workers[tabId] != 'undefined' && typeof app.workers[tabId][key] != 'undefined');
};
exports.exists = exists;
