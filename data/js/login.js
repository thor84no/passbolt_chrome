console.log('data/login.js content script inserted ok!');

var token = Math.round(Math.random() * Math.pow(2, 32));
console.log('content-' + token);

var port = chrome.runtime.connect({name: "login"});
port.postMessage({test: "Content->App", token: token });

port.onMessage.addListener(function(msg) {
  console.log(msg);
});
