console.log('main');

// React when a browser action's icon is clicked.
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('clicked');
  var setupUrl = chrome.extension.getURL('data/setup.html');
  chrome.tabs.update(tab.id, {url: setupUrl});
});

