/**
 * Config Listeners
 *
 * @copyright (c) 2015-present Bolt Softwares Pvt Ltd
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */

var listen = function (worker) {

  // List to application config check
  worker.port.on('passbolt.addon.isConfigured', function(token) {

    // a message for example loading
    worker.port.emit('passbolt.message.test', 'hello2', 'whatsup2');

    // the response
    worker.port.emit('passbolt.addon.isConfigured.complete', token, 'SUCCESS', false);

  });

};
exports.listen = listen;
