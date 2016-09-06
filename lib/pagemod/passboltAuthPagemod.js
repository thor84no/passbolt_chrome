/**
 * Passbolt App pagemod.
 *
 * This pagemod drives the main addon app
 * It is inserted in all the pages of a domain that is trusted.
 * Such trust is defined during the first step of the setup process (or in config-debug)
 *
 * @copyright (c) 2015-present Bolt Softwares Pvt Ltd
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */

var self = require('sdk/self');
var app = require('../main');
var pageMod = require('sdk/page-mod');
var domain = /passbolt\.dev/;
var Workers = require('../model/workers');

PassboltAuth = pageMod.PageMod({
  name: 'PassboltAuth',
  include: domain,
  contentScriptWhen: 'ready',
  contentStyleFile: [
    self.data.url('css/external.min.css')
  ],
  contentScriptFile: [
    self.data.url('js/vendors/jquery.min.js'),
    self.data.url('js/lib/request.js'),
    self.data.url('js/lib/message.js'),
    self.data.url('js/login.js')
  ],
  attachTo: ["existing", "top"],
  onAttach: function (worker) {
    Workers.add('Auth', worker, {
      removeOnTabUrlChange: true
    });
    app.events.auth.listen(worker);
  }
});

exports.PassboltAuth = PassboltAuth;
