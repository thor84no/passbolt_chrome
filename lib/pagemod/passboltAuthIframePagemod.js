/**
 * Passbolt Auth Form pagemod.
 *
 * This pagemod help with the authentication
 *
 * @copyright (c) 2015-present Bolt Softwares Pvt Ltd
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */
var self = require('sdk/self');
var pageMod = require('sdk/page-mod');
var app = require('../main');
var Workers = require('../model/workers');

var passboltAuthIframe = pageMod.PageMod({
  include: 'about:blank?passbolt=passbolt-iframe-test',
  contentScriptWhen: 'ready',
  contentStyleFile: [
    self.data.url('css/main_ff.min.css')
  ],
  contentScriptFile: [
    self.data.url('js/vendors/jquery.min.js'),
    self.data.url('js/inc/message.js'),
    self.data.url('js/inc/request.js'),
    self.data.url('js/inc/iframeTest.js')
  ],
  contentScriptOptions: {
    addonDataPath: self.data.url(),
    templatePath: './tpl/login/form.ejs'
  },
  onAttach: function (worker) {
    Workers.add('AuthIframe', worker, {
      removeOnTabUrlChange: true
    });
    //app.events.template.listen(worker);
    //app.events.user.listen(worker);
    //app.events.keyring.listen(worker);
    app.events.auth.listen(worker);
  }
});

exports.passboltAuthIframe = passboltAuthIframe;
