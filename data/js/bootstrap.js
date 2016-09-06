/**
 * Bootstrap.
 *
 * @copyright (c) 2015-present Bolt Softwares Pvt Ltd
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */

var passbolt = passbolt || {};
passbolt.bootstrap = passbolt.bootstrap || {};

(function($) {
  console.log('BOOSTRAP CONTENT CODE');

  // check if the plugin is configured
  $('.plugin-check.firefox.error').click(function(){
    passbolt.request('passbolt.addon.isConfigured')
      .then(function (response) {
        console.log('request works');
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
  });

  passbolt.message.on('passbolt.message.test', function() {
    console.log('message received for another worker');
  });

    // Add classes relative to plugin.
  $('html')
    .removeClass('no-passboltplugin')
    .addClass('passboltplugin');

})(jQuery);
