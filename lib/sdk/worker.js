var Port = require('sdk/port').Port;
var Tab = require('sdk/tab').Tab;

/**
 * PageMod Worker Chrome Wrapper
 *
 * @param port
 * @constructor
 */
var Worker = function(port) {
  this.port = new Port(port);
  this.tab = new Tab(port.sender);
};

Worker.prototype.on = function (eventName, callback) {
  switch (eventName) {
    case 'detach':
      console.log('not implemented');
      break;
  }
};

/**
 * Undocumented
 */
Worker.prototype.destroy = function () {
  console.log('not implemented');
};

exports.Worker = Worker;
