//figure out how to set process.argv[2] = to a function that makes corresponding api call

// if(process.argv[2] === my_tweets){
//     run twitter api call
// }else if(process.argv[2] === spotify-this-song){
//     run spotify api call
// }else if(process.argv[2] === movie-this){
//     run omdb api call
// }

//TWITTER DATA
var twitterKeys = require("./keys.js");
var twitter = require("twitter");

var T = new twitter(twitterKeys);

var twitterParams = {
    screen_name: "SchlenksTanks",
    count: 5
};


var my_tweets = process.argv[2];
if(my_tweets) {
    T.get("statuses/user_timeline", twitterParams, recievedData);

    function recievedData(error, response, data) {
        // console.log(response);
        for (var i = 0; i < response.length; i++) {
            console.log(response[i].created_at);
            console.log(response[i].text);
        }
    }
}

//SPOTIFY DATA

var keys = require("./keys.js");
var spotify = require("node-spotify-api");
var spotifyKeys = keys.spotifyKeys;
var spotifyQuery = "";
var S = new spotify(spotifyKeys);

for (var i = 2; i < process.argv.length; i++) {
    if(i > 2 && i < process.argv.length){
        spotifyQuery = spotifyQuery + "+" + process.argv[i];
    }else {
        spotifyQuery = spotifyQuery + process.argv[i];
    }
}

var spotifyParams = {
    type: 'track',
    query: spotifyQuery,
    limit: 2
};

    S.search(spotifyParams, getData);

    function getData(err, data) {
        if (err) {
            return console.log(err);
        }
        else {
            //console.log(data);
            // console.log(data.tracks);
            var items = data.tracks.items;
            //console.log(items);
            for (var i = 0; i < items.length; i++) {
                console.log("Artist: " + items[i].artists[0].name);
                console.log("Album Name: " + items[i].album.name);
                console.log("Track Name: " + items[i].name);
                console.log("Preview link: " + items[i].preview_url);
            }
        }
    }

// var request = require("request");
// var movieName = "";
// var nodeArgs = process.argv;
//
// for(var i = 2; i < nodeArgs.length; i++){
//     if(i > 2 && i < nodeArgs.length){
//         movieName = movieName + "+" + nodeArgs[i];
//         } else {
//         movieName = movieName + nodeArgs[i];
//     }
// }
//
// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
//
// request(queryUrl, function(err, response, body){
//     if(!err && response.statusCode === 200){
//         //console.log(body);
//         console.log("Movie Title: " + JSON.parse(body).Title);
//         console.log("Year: " + JSON.parse(body).Year);
//         console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
//         console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
//         console.log("Produced in: "+ JSON.parse(body).Country);
//         console.log("Plot: " + JSON.parse(body).Plot);
//         console.log("Notable Actors: " + JSON.parse(body).Actors);
//         //console.log(JSON.parse(body));
//     }
// });

