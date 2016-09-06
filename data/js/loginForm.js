/**
 * Login page.
 *
 * @copyright (c) 2015-present Bolt Softwares Pvt Ltd
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */

var passbolt = passbolt || {};
passbolt.login = passbolt.login || {};

$(function() {

  function verify() {
    passbolt.request('passbolt.auth.verify')
      .then(function (response) {
        console.log('iframe: request ok');
      });
  }
  verify();
  $('h1').click(verify);

  passbolt.message.on('passbolt.message.test', function() {
    console.log('iframe: message.on ok');
  });

});
