// Helper functions for accessing the instagram API.
var Parse = require('parse/node').Parse;

// Returns a promise that fulfills iff this user id is valid.
function validateAuthData(authData) {
  return request("users/self/?access_token=" + authData.access_token)
    .then((response) => {
      if (response && response.data && response.data.id == authData.id) {
        return;
      }
      throw new Parse.Error(
        Parse.Error.OBJECT_NOT_FOUND,
        'Instagram auth is invalid for this user.');
    });
}

// Returns a promise that fulfills iff this app id is valid.
function validateAppId() {
  return Promise.resolve();
}

// A promisey wrapper for api requests
function request(path) {
  return require('./request')({
    host: 'api.instagram.com',
    path: 'v1/' + path
  });
}

module.exports = {
  validateAppId: validateAppId,
  validateAuthData: validateAuthData
};
