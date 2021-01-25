const crypto = require('crypto');
const cryptoRandomString = require('crypto-random-string');

module.exports = createHash

function createHash(password, salt) {
  salt = salt ?? cryptoRandomString({length: 32});
  const sha256 = crypto.createHash('sha256');
  sha256.update(`${password}$${salt}`);
  const pwdHash = sha256.digest('hex');

  return `${pwdHash}$${salt}`;
}