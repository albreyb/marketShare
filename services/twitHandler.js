var twit = require('twit');
var keys = require('../services/secrets/secrets.js');
var consumer_key = keys.consumer_key;
var consumer_secret = keys.consumer_secret;
var access_token = keys.access_token_key;
var access_token_secret = keys.access_token_secret;


var t = new twit({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  access_token: access_token,
  access_token_secret: access_token_secret
});

module.exports = {
  getFollowers: function(user){
    t.get('followers/list',
          {screen_name: user},
          function(err, data, response){
            console.log(data.users[1]['screen_name']);
          }
    );
  }
};