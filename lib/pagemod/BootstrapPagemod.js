pageMod = require('sdk/page-mod');
var app = require('../main');

var domain = /passbolt\.dev/;

var bootstrapPageMod = pageMod.PageMod({
  portName: 'bootstrap',
  include: domain,
  contentScriptWhen: 'ready',
  contentStyleFile: [
    'css/external.min.css'
  ],
  contentScriptFile: [
    'js/vendors/jquery.min.js',
    'js/lib/request.js',
    'js/bootstrap.js'
  ],
  onAttach : function(worker) {
    app.events.config.listen(worker);
  }
});

exports.bootstrap = bootstrapPageMod;
