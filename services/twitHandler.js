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
  getFollowers: function(user1, user2){
      
    function similarityCount(userOne, userTwo){
      var count = 0;
      console.log('in similarity count');
      for (var screenName in userOne) {
        if (userTwo.hasOwnProperty(screenName)){
          count++;
        }
      }

      return count;
    }

    t.get('followers/id', {screen_name: user1}, function(err, data, response){
            var userOneFollowers = {}; // container for incoming follower usernames
            var userOneFollowerCount = 0;
            var count = null;

            if (err) { // catch rate limit error
              console.log('TAKE A BREAK, RATE LIMIT EXCEEDED');
            }

            for (var i = 0; i < data.users.length; i++) { // add userNames to container
              userOneFollowers[data.users[i]['screen_name']] = true;
              userOneFollowerCount++;
            }
            // get second users followers
            t.get('followers/id', {screen_name: user2}, function(err, data, response){

              if (err) { // second rate limt error catcher
                console.log('TAKE A BREAK, RATE LIMIT EXCEEDED');
              }

              var userTwoFollowers = {}; // container for second users followers
              var userTwoFollowerCount = 0;
              for (var i = 0; i < data.users.length; i++) { // add userNames to second container
                userTwoFollowers[data.users[i]['screen_name']] = true;
                userTwoFollowerCount++;
              }

              if (userOneFollowerCount > userTwoFollowerCount) {

                count = similarityCount(userTwoFollowers, userOneFollowers);
                console.log(count);

              } else {
                count = similarityCount(userOneFollowers, userTwoFollowers);
                console.log(count);
              }


            });
          }
    );
  }
};