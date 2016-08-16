/**
 * Bootstrap.
 *
 * @copyright (c) 2015-present Bolt Softwares Pvt Ltd
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */

var passbolt = passbolt || {};
passbolt.bootstrap = passbolt.bootstrap || {};

(function($) {

  passbolt.setPortName('bootstrap');

  // check if the plugin is configured
  passbolt.request('passbolt.addon.isConfigured')
    .then(function (response) {
      console.log('response!');
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

  // Add classes relative to plugin.
  $('html')
    .removeClass('no-passboltplugin')
    .addClass('passboltplugin');

})(jQuery);
