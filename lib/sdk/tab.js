
/**
 * Port Chrome Wrapper
 *
 * @param port
 * @constructor
 */
var Tab = function(tab) {
  this._tab = tab;
  this.id = tab.id;
  //var url = tab.url;
};

/**
 * Triggers a callback for a given event name
 *
 * @param eventName
 * @param callback
 */
Tab.prototype.on = function(eventName, callback) {
  switch(eventName) {
    case 'detach' :
      console.warn('Tab.prototype.on:detach notimplemented');
      break;
  }
};

/**
 * Triggers a callback for a given event name
 *
 * @param eventName
 * @param callback
 */
Tab.prototype.removeListener = function(eventName, callback) {
  switch(eventName) {
    case 'ready' :
      console.warn('Tab.prototype.removeListener:ready notimplemented');
      break;
  }
};

exports.Tab = Tab;
