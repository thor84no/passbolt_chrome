/**
 * iframe test page.
 *
 * @copyright (c) 2015-present Bolt Softwares Pvt Ltd
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */
$(function() {
  console.log('iframeTest OK');

  function talkBack() {
    console.log('talkback');
    passbolt.request('passbolt.auth.talkBack')
      .then(function (response) {
        console.log('iframe: talkback ok');
      });
  }
  $('h1').click(talkBack);
});
