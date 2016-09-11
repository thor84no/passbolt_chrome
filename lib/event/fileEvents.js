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
var fileController = require('../controller/fileController');

var listen = function (worker) {

  // Listen to the request to verify the server identity
  worker.port.on('passbolt.file.upload', function (token) {
    fileController.uploadFile().then(function(content){
      worker.port.emit('passbolt.file.upload', token, 'SUCCESS', content);
    }, function() {
      worker.port.emit('passbolt.file.upload', token, 'ERROR', true);
    });
  });

};

exports.listen = listen;
