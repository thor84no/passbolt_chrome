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

    Workers.get('Bootstrap', worker.tab.id).port.emit('passbolt.message.test', 'hello2', 'whatsup2');
    Workers.get('AuthForm', worker.tab.id).port.emit('passbolt.message.test', 'hello3', 'whatsup3');

    worker.port.emit('passbolt.auth.verify.complete', token, 'SUCCESS', true);
  });

};

exports.listen = listen;
