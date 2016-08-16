/**
 * PageMod Worker Chrome Wrapper
 *
 * @param port
 * @constructor
 */
var Worker = function(port) {
  this.port = new Port(port);
};

/**
 * Port Chrome Wrapper
 *
 * @param port
 * @constructor
 */
var Port = function(port) {
  this._port = port;
};

/**
 * On() call a callback for a given message name
 *
 * @param msgName
 * @param callback
 */
Port.prototype.on = function(msgName, callback) {
  _this = this;
  this._port.onMessage.addListener(function (msg) {
    // the token is the first argument of the work.port.on callback
    // we add the data sent from the content code as optional additional arguments
    args = [msg.token].concat(msg.data);
    if (msg.name === msgName) {
      callback.apply(_this, args)
    }
  });
};

/**
 * Send a message to the content code
 *
 * @param msgName string
 * @param token uuid
 * @param status SUCCESS | ERROR
 */
Port.prototype.emit = function (msgName, token, status) {
  this._port.postMessage([
    msgName, token, status,
    arguments
  ]);
};
exports.Worker = Worker;
