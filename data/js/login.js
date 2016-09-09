/**
 * Login page.
 *
 * @copyright (c) 2015-present Bolt Softwares Pvt Ltd
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */

var passbolt = passbolt || {};
passbolt.login = passbolt.login || {};

$(function() {
  var passphraseIframeId = 'passbolt-iframe-login-form';
  var iframeUrl;

  // @TODO more elegant browser check and iframe URL definition
  if(typeof chrome !== 'undefined') {
    iframeUrl = chrome.runtime.getURL('data/authForm.html');
  } else {
    iframeUrl = 'about:blank';
  }
  iframeUrl += '?passbolt=' + passphraseIframeId;

  /**
   * Insert the passphrase dialog
   */
  passbolt.login.onStep1RequestPassphrase = function () {
    // Inject the passphrase dialog iframe into the web page DOM.
    var $iframe = $('<iframe/>', {
      id: passphraseIframeId,
      src: iframeUrl,
      frameBorder: 0
    });
    $('.login.form').empty().append($iframe);

  };

  /**
   *
   */
  passbolt.message.on('passbolt.auth.iframeTest', function() {
    console.log('passbolt.auth.testIframe');
    var $iframe = $('<iframe/>', {
      id: 'passbolt-iframe-test',
      src: chrome.runtime.getURL('data/iframeTest.html?passbolt=passbolt-iframe-test'),
      frameBorder: 0
    });
    $('.login.form').append($iframe);
  });

  passbolt.message.on('passbolt.auth.iframeTest.close', function() {
    $('#passbolt-iframe-test').remove();
  });

  /* ==================================================================================
   *  Content script init
   * ================================================================================== */

  /**
   * Check if the addon says we are ready for login
   */
  passbolt.login.init = function() {
    passbolt.login.onStep1RequestPassphrase();
  };

  passbolt.login.init();

});
