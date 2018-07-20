var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys");


var client = new Twitter(keys.Twitter);

var params = {screen_name: 'SchoolSmarcus'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }else{
      console.log("test test test");
  }

  
});


// var spotify = new Spotify(keys.Spotify);
 
// spotify.search({ type: 'track', query: 'Hit me baby one more' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
 
// console.log(JSON.stringify(data,null, 2)); 
// });




