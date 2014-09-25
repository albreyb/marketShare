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

    // counts how many similar ids there are between users
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

    // uses count to calculate follower ratio
    function ratio(user, count) {
      return count / user * 100;
    }

    t.get('followers/ids', {screen_name: user1}, function(err, data, response){
        var userOneFollowers = {}; // container for incoming follower usernames
        var userTwoFollowers = {};
        var userOneFollowerCount = 0; // keeps track of number of followers
        var userTwoFollowerCount = 0;
        var userOneRatio; // returned follower ratio
        var userTwoRatio;
        var count = null; // keeps count of for ratio calculation

        if (err) { // catch rate limit error
          console.log('TAKE A BREAK, RATE LIMIT EXCEEDED', err);
        }

        for (var i = 0; i < data['ids'].length; i++) { // add ids to container
          userOneFollowers[data['ids'][i]] = true;
          userOneFollowerCount++;
        }
        // get second users followers
        t.get('followers/ids', {screen_name: user2}, function(err, data, response){

          if (err) { // second rate limt error catcher
            console.log('TAKE A BREAK, RATE LIMIT EXCEEDED', err);
          }


          for (var i = 0; i < data['ids'].length; i++) { // add ids to second container
            userTwoFollowers[data['ids'][i]] = true;
            userTwoFollowerCount++;
          }

            // check which account has more followers, users with less followers
            // is base for similarity analysis
          if (userOneFollowerCount > userTwoFollowerCount) {
            // get # of similarities between followers
            count = similarityCount(userTwoFollowers, userOneFollowers);
            // get both similarity ratios of user1 & user 2
            userOneRatio = ratio(userOneFollowerCount, count);
            userTwoRatio = ratio(userTwoFollowerCount, count);

          } else {

            // see above
            count = similarityCount(userOneFollowers, userTwoFollowers);
            // see above
            userOneRatio = ratio(userOneFollowerCount, count);
            userTwoRatio = ratio(userTwoFollowerCount, count);

          }
        });
      }
    );
  }
};