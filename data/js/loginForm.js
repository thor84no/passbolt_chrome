/**
 * Login page.
 *
 * @copyright (c) 2015-present Bolt Softwares Pvt Ltd
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */

var passbolt = passbolt || {};
passbolt.login = passbolt.login || {};

$(function() {

  function filePrompt() {
    passbolt.request('passbolt.file.prompt')
      .then(function (fileContent) {
        console.log(fileContent);
      });
  }
  $('h1').click(filePrompt);

  passbolt.message.on('passbolt.auth.dosomething', function() {
    $('h1').text('iframe talked back');
  });
});
