const https = require('https');

function request({
      host,
      path,
      headers
    }) {
  return new Promise(function(resolve, reject) {
    https.get({
      host,
      path,
      headers
    }, function(res) {
      var data = '';
      res.on('data', function(chunk) {
        data += chunk;
      });
      res.on('end', function() {
        try {
          data = JSON.parse(data);
        } catch(e) {
          return reject(e);
        }
        resolve(data);
      });
    }).on('error', function(e) {
      reject(e);
    });
  });
}

module.exports = request;
