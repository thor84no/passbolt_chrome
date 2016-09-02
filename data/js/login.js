/**
 * Login page.
 *
 * @copyright (c) 2015-present Bolt Softwares Pvt Ltd
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */

var passbolt = passbolt || {};
passbolt.login = passbolt.login || {};

$(function() {

  console.log(testScriptOptions);

  var passphraseIframeId = 'passbolt-iframe-login-form';

  /**
   * Insert the passphrase dialog
   */
  passbolt.login.onStep1RequestPassphrase = function () {

    // Inject the passphrase dialog iframe into the web page DOM.
    var $iframe = $('<iframe/>', {
      id: passphraseIframeId,
      src: 'about:blank?passbolt=' + passphraseIframeId,
      frameBorder: 0
    });
    $('.login.form').empty().append($iframe);

    // See passboltAuthPagemod and login-form for the logic
    // inside the iframe
  };


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
