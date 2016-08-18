/**
 * The passbolt content code messaging capabilities
 *
 * @copyright (c) 2015-present Bolt Softwares Pvt Ltd
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */
var self = self || {};

(function (self) {

  // TODO provide from pageMod
  var portname = 'bootstrap';

  /**
   * Port Class Constructor
   * @param port
   * @constructor
   */
  var Port = function (portname) {
    var _this = this;
    this._i = 0;
    this._listeners = {};

    if(typeof portname !== 'undefined') {
      this._portname = portname;
    } else {
      throw Error('Port requires a portname to communicate to the addon code');
    }
    this._port = chrome.runtime.connect({name: this._portname});
    this._port.onMessage.addListener(function(msg) {
      _this._onMessage(msg);
    });
  };

  /**
   * When a message is received on the port
   * Triggers all the callback associated with that message name
   *
   * @param msg
   * @private
   */
  Port.prototype._onMessage = function(msg) {
    var eventName = msg[0];
    if(typeof this._listeners[eventName] !== 'undefined' && this._listeners[eventName].length > 0) {
      var listeners = this._listeners[eventName];
      for(var i = 0; i < listeners.length; i++) {
        var listener = listeners[i];
        var args = Array.prototype.slice.call(msg, 1);
        listener.callback.apply(this, args);

        if(listener.once) {
          this._listeners[eventName].splice(i, 1);
          i--; // jump back since i++ is the new i
        }
      }
    }
  };

  /**
   * Add listener for a message name on the current port
   *
   * @param name string
   * @param callback function
   * @param once bool
   * @private
   */
  Port.prototype._addListener = function(name, callback, once) {
    if(typeof this._listeners[name] === 'undefined') {
      this._listeners[name] = [];
    }
    this._listeners[name].push({
      name : name,
      callback : callback,
      once : once
    });
  };

  /**
   * On message name triggers a callback
   *
   * @param name
   * @param callback
   */
  Port.prototype.on = function(name, callback) {
    this._addListener(name, callback, false);
  };

  /**
   * On message name triggers a callback only once,
   * e.g. remove the listener once the message has been received
   *
   * @param name
   * @param callback
   */
  Port.prototype.once = function(name, callback) {
    this._addListener(name, callback, true);
  };

  /**
   * Emit a message to the addon code
   * @param args
   */
  Port.prototype.emit = function() {
    this._port.postMessage(arguments);
  };

  // Instance to be used by message and request
  // Matching firefox synthax
  self.port = new Port(portname);

})(self);