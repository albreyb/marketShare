var fs = require("fs");
var path = require('path');
// creating local read-in file variables
var local_consumer_key;
var local_consumer_secret;
var local_access_token_key;
var local_access_token_secret;
// variables to be exported to other files
var consumer_key;
var consumer_secret;
var access_token_key;
var access_token_secret;
var filename_local = "/Users/albreybrown/Desktop/AllThingsCode/Projects/marketShare/services/secrets/secrets.txt";

if(fs.existsSync(filename_local)) {
  // reads in our secrets.txt file
  var content = fs.readFileSync(filename_local, 'utf-8');
  // splits by line and sets to our variables
  var array = content.split('\n');
  local_consumer_key = array[0].trim();
  local_consumer_secret = array[1].trim();
  local_access_token_key = array[2].trim();
  local_access_token_secret = array[3].trim();
}
// sets environment variables for production server
consumer_key = process.env.consumer_key || local_consumer_key;
consumer_secret = process.env.consumer_secret || local_consumer_secret;
access_token_key = process.env.access_token_key || local_access_token_key;
access_token_secret = process.env.access_token_secret ||local_access_token_secret;
// exports secrets for later use within the application
module.exports.consumer_key = consumer_key;
module.exports.consumer_secret = consumer_secret;
module.exports.access_token_key = access_token_key;
module.exports.access_token_secret = access_token_secret;