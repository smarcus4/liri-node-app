var Twitter = require("twitter");
var Spotify= require("node-spotify-api");
var request = require("request");
var keys = require("./keys");
var fs = require("fs");

var getMyTweets = function(){
  var client = new Twitter(keys.Twitter);

  var params = {screen_name: 'SchoolSmarcus'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      // console.log(tweets);
    for(var i=0; i<tweets.length; i++){
      console.log(tweets[i].created_at);
    
      console.log("    ");
      console.log(tweets[i].text);
      console.log("---------------------------")

      }
    }
    else{
      console.log(error + " There is an error fetching the information please check your credentials");
    }
    
  });

}


function getMeSpotify(x) {
  var spotify = new Spotify(keys.spotify);
  spotify.search({ type: 'track', query: x, limit: 5 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
      fs.appendFile('log.txt', "Error", function(err){
        console.log("Error in the file, "+ err);
      })
    }
    for (i = 0; i < data.tracks.items.length; i++) {
      var spotifyData = data.tracks.items[i];
      console.log(
        "Artist | " + spotifyData.artists[0].name +
        "\nSong | " + spotifyData.name +
        "\nAlbum | " + spotifyData.album.name +
        "\nAlbum Released | " + spotifyData.album.release_date +
        "\nPlay Track | " + spotifyData.external_urls.spotify + 
        "\n----------------------------------------------------------"
      )
      // fs.appendFile('log.txt', "\n" + spotifyData.artists[0].name)
      // fs.appendFile('log.txt', "\n" + spotifyData.name)
      // fs.appendFile('log.txt', "\n" + spotifyData.album.name)
      // fs.appendFile('log.txt', "\n" + spotifyData.album.release_date)
      // fs.appendFile('log.txt', "\n" + spotifyData.external_urls.spotify)
      // fs.appendFile('log.txt', "\n" + "--------------------------------------")

    }
    //  console.log(JSON.stringify(data,null,2))
  });
}
var getMeMovie = function(movieName){
  request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=d37af91c", function(error, response, body){
    if(!error && response.statusCode === 200){
      var jsonData = JSON.parse(body);
      console.log("Title: " + jsonData.Title);
      console.log("Year: " + jsonData.Year);
      console.log("Rated: " + jsonData.Rated);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      console.log("Country: " + jsonData.Country);
      console.log("Language: " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);
      console.log("Rotton Tomatoes URL: " + jsonData.tomatoURL);
    }
  });
}

var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    if (error) throw error;

    var dataArr = data.split(",");
    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    }
    else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }
  });
};

var pick = function(caseData, functionData){
  switch(caseData){
    case 'my-tweets':
      getMyTweets();
      break;
    case "spotify-this-song":
      getMeSpotify(functionData);
      break;
    case "movie-this":
      getMeMovie(functionData);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
    console.log("LIRI does not know that");
  }
}

var runThis = function(argOne, argTwo){
  pick(argOne,argTwo);
};

runThis(process.argv[2], process.argv[3]);





