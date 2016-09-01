pageMod = require('sdk/page-mod');
var self = require('sdk/self');
var app = require('../main');
var domain = /passbolt\.dev/;

var bootstrapPageMod = pageMod.PageMod({
  include: domain,
  contentScriptWhen: 'ready',
  contentStyleFile: [
    'css/external.min.css'
  ],
  contentScriptFile: [
    self.data.url('js/vendors/jquery.min.js'),
    self.data.url('js/lib/port.js'),
    self.data.url('js/lib/request.js'),
    self.data.url('js/lib/message.js'),
    self.data.url('js/bootstrap.js')
  ],
  contentScriptOptions: {
    //portname: 'bootstrap'
  },
  onAttach : function(worker) {
    app.events.config.listen(worker);
  }
});

exports.bootstrap = bootstrapPageMod;
