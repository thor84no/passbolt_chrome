/**
 * Login page.
 *
 * @copyright (c) 2015-present Bolt Softwares Pvt Ltd
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */

var passbolt = passbolt || {};
passbolt.login = passbolt.login || {};

$(function() {

  function createIframe() {
    console.log('create iframe');
    passbolt.request('passbolt.auth.iframeCreate')
      .then(function (response) {
        console.log('iframeCreated');
        $('h1').text('create an iframe');
      });
  }
  $('h1').click(createIframe);

  passbolt.message.on('passbolt.auth.dosomething', function() {
    $('h1').text('iframe talked back');
  });
});
