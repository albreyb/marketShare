var app = require('express')();
var twitHandler = require('./twitHandler.js');

// setting port &/or environment variables
var port = process.env.port || 3000;

var server = app.listen(port, function(){
  console.log('listening on port 3000');
});
// testing read-in files
// console.log(twitHandler.getFollowers('RexxLifeRaj', 'AlbreyPreston'));