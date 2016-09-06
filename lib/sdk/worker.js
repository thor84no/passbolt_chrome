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
  this.tab = new Tab(port.sender.tab);
};

Worker.prototype.on = function (eventName, callback) {
  switch (eventName) {
    case 'detach':
      console.warn('Worker.prototype.on:detach not implemented');
      break;
  }
};

/**
 * Undocumented
 */
Worker.prototype.destroy = function () {
  console.warn('Worker.prototype.destroy not implemented');
};

exports.Worker = Worker;
