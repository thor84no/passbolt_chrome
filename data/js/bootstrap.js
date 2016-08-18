/**
 * Bootstrap.
 *
 * @copyright (c) 2015-present Bolt Softwares Pvt Ltd
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */

var passbolt = passbolt || {};
passbolt.bootstrap = passbolt.bootstrap || {};

(function($) {

  // check if the plugin is configured
  passbolt.request('passbolt.addon.isConfigured')
    .then(function (response) {
      console.log('req1: this is cool');
      if (response !== true) {
        $('html')
          .addClass('no-passboltplugin-config')
          .removeClass('passboltplugin-config');
      } else {
        $('html')
          .addClass('passboltplugin-config')
          .removeClass('no-passboltplugin-config');
      }
    });

  passbolt.message.on('passbolt.message.test', function(arg1, arg2) {
    console.log('msg2: message received!' + arg1 + arg2);
  });

  passbolt.message.on('passbolt.message.test', function() {
    console.log('msg3:' +'message received for another listener!');
  });

    // Add classes relative to plugin.
  $('html')
    .removeClass('no-passboltplugin')
    .addClass('passboltplugin');

})(jQuery);
