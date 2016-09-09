/**
 * Auth events.
 *
 * Used to handle the events related to authentication.
 *
 * @copyright (c) 2015-present Bolt Softwares Pvt Ltd
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */
//var app = require('../main');
var Workers = require('../model/workers');

var listen = function (worker) {

  // Listen to the request to verify the server identity
  worker.port.on('passbolt.auth.verify', function (token) {
    worker.port.emit('passbolt.auth.verify.complete', token, 'SUCCESS', true);
  });

  worker.port.on('passbolt.auth.iframeCreate', function (token) {
    Workers.get('Auth', worker.tab.id).port.emit('passbolt.auth.iframeTest');
    worker.port.emit('passbolt.auth.iframeCreate', token, 'SUCCESS', true);
  });

  // List to application config check
  worker.port.on('passbolt.auth.talkBack', function(token) {
    worker.port.emit('passbolt.auth.talkBack', token, 'SUCCESS', true);
    Workers.get('AuthForm', worker.tab.id).port.emit('passbolt.auth.dosomething');
    Workers.get('Auth', worker.tab.id).port.emit('passbolt.auth.iframeTest.close');
  });
};

exports.listen = listen;
