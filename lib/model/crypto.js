/**
 * CHROME TESTING ONLY - NOT THE FULL FILE
 */
/**
 * Crypto model.
 *
 * @copyright (c) 2015-present Bolt Softwares Pvt Ltd
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */

var XRegExp = require('../vendors/xregexp').XRegExp;
var jsSHA = require('../vendors/sha');
var randomBytes = require('../vendors/crypto').randomBytes;

/**
 * The class that deals with Passbolt encryption and decryption operations
 */
var Crypto = function () {
};

/**
 * Generate a random text
 * @param size
 */
Crypto.generateRandomHex = function (size) {
  var text = '';
  var possible = 'ABCDEF0123456789';
  var random_array = randomBytes(size);
  for(var i=size; i > 0; i--) {
    text += possible.charAt(Math.floor(random_array[i] % possible.length));
  }
  return text;
};

/**
 * Create a predictable uuid from a sha1 hashed seed
 * @param seed
 * @returns {*}
 */
Crypto.uuid = function (seed) {
  var hashStr;

  // Generate a random hash if no seed is provided
  if(typeof seed === 'undefined') {
    hashStr = Crypto.generateRandomHex(32);
  }
  else {
    // Create SHA hash from seed.
    var shaObj = new jsSHA('SHA-1', 'TEXT');
    shaObj.update(seed);
    hashStr = shaObj.getHash('HEX').substring(0, 32);
  }
  // Build a uuid based on the hash
  var search = XRegExp('^(?<first>.{8})(?<second>.{4})(?<third>.{1})(?<fourth>.{3})(?<fifth>.{1})(?<sixth>.{3})(?<seventh>.{12}$)');
  var replace = XRegExp('${first}-${second}-3${fourth}-A${sixth}-${seventh}');

  // Replace regexp by corresponding mask, and remove / character at each side of the result.
  var uuid = XRegExp.replace(hashStr, search, replace).replace(/\//g, '');
  return uuid;
};

// Make the object available to other scripts
exports.Crypto = Crypto;
