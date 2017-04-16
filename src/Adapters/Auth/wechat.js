// Helper functions for accessing the WeChat Graph API.
var Parse = require('parse/node').Parse;

// Returns a promise that fulfills iff this user id is valid.
function validateAuthData(authData) {
  return graphRequest('auth?access_token=' + authData.access_token + '&openid=' + authData.id).then(function (data) {
    if (data.errcode == 0) {
      return;
    }
    throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'qq auth is invalid for this user.');
  });
}

// Returns a promise that fulfills if this app id is valid.
function validateAppId() {
  return Promise.resolve();
}

// A promisey wrapper for WeChat graph requests.
function graphRequest(path) {
  return require('./request')({
    host: 'api.weixin.qq.com',
    path: '/sns/' + path
  });
}

module.exports = {
  validateAppId,
  validateAuthData
};
