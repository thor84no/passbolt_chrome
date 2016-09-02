var browserWindow = window;

exports.randomBytes = function(size) {
  var buf = new Uint8Array(size);
  browserWindow.crypto.getRandomValues(buf);
  return buf;
};
