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

};

exports.listen = listen;
