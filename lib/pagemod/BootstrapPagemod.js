pageMod = require('sdk/page-mod');
var self = require('sdk/self');
var app = require('../main');
var Workers = require('../model/workers');
var domain = /passbolt\.dev/;

var bootstrapPageMod = pageMod.PageMod({
  include: domain,
  contentScriptWhen: 'ready',
  contentStyleFile: [
    'css/external.min.css'
  ],
  contentScriptFile: [
    self.data.url('js/vendors/jquery.min.js'),
    self.data.url('js/lib/request.js'),
    self.data.url('js/lib/message.js'),
    self.data.url('js/bootstrap.js')
  ],
  contentScriptOptions: {
    testScriptOptions: 'bootstrapPageMod testScriptOptions'
  },
  onAttach : function(worker) {
    Workers.add('Bootstrap', worker, {
      // Destroy the worker on tab url change.
      removeOnTabUrlChange: true,
      // If the user is redirected to the login page, that means it is logged out.
      // Destroy the passbolt application pagemod.
      onTabUrlChange: function() {
        console.log('onTabUrlChange pagemod callback ok');
        console.log(app.workers);
      }
    });
    app.events.config.listen(worker);
  }
});

exports.bootstrap = bootstrapPageMod;
