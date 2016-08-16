/**
 * The passbolt communication module used on content code side.
 *
 * @copyright (c) 2015-present Bolt Softwares Pvt Ltd
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */
var passbolt = passbolt || {};

(function (passbolt) {

  var _portname = '';
  var _port;
  var _stack = {};

  /**
   * UUID
   * @returns {string}
   */
  passbolt.uuid = function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };

  /**
   * Set the name of the port to be used for request
   * @param name
   */
  passbolt.setPortName = function(name) {
    _portname = name;

    // connect and listen to messages coming from application code
    _port = chrome.runtime.connect({name: _portname});
    _port.onMessage.addListener(_requestCompletedListener);
  };

  /**
   * Perform an asynchronous request on the addon-code.
   *
   * @param message The request name
   * @returns Promise
   */
  passbolt.request = function(message) {
    var token = passbolt.uuid();
    var p = $.Deferred();
    _port.postMessage({
      name: message,
      token: token,
      data: Array.prototype.slice.call(arguments, 1)
    });
    _stack[token] = p;
    return p;
  };

  _requestCompletedListener = function (msg) {
    if (typeof msg !== 'undefined' && msg.length >= 3) {
      var name = msg[0];
      var token = msg[1];
      var status = msg[2];
      var data = msg.slice(3);

      // if the message is in the stack
      // resolve the promise
      var p = _stack[token];
      if (status == 'SUCCESS') {
        p.resolveWith(this, data);
      } else {
        p.resolveWith(this, data);
      }
      delete _stack[token];
    }
  }

})(passbolt);