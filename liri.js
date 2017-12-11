//TWITTER DATA
var input = process.argv[2];
var keys = require("./keys.js");

if(input === "my-tweets") {
    var twitter = require("twitter");
    var twitterKeys = keys.twitterKeys;

    var T = new twitter(twitterKeys);

    var twitterParams = {
        screen_name: "SchlenksTanks",
        count: 5
    };
        T.get("statuses/user_timeline", twitterParams, recievedData);

        function recievedData(error, response, data) {
            if (error) {
                console.log("error yo");
            } else {
                for (var i = 0; i < response.length; i++) {
                    console.log(response[i].created_at);
                    console.log(response[i].text);
                }
            }
        }
    }
else if (input === "spotify-this-song") {

    var spotify = require("node-spotify-api");
    var spotifyKeys = keys.spotifyKeys;
    var spotifyQuery = "";

    var searchSpotify = new spotify(spotifyKeys);

        for (var y = 3; y < process.argv.length; y++) {
            if (y > 3 && y < process.argv.length) {
                spotifyQuery = spotifyQuery + "+" + process.argv[y];
            } else {
                spotifyQuery = spotifyQuery + process.argv[y];
            }
        }

    var spotifyParams = {
        type: 'track',
        query: spotifyQuery,
        limit: 1
    };

    searchSpotify.search(spotifyParams, getData);

    function getData(err, data) {
        if (err) {
            return console.log(err);
        }
        else {
            var items = data.tracks.items;
            for (var i = 0; i < items.length; i++) {
                //console.log(items[i]);
                console.log("Artist: " + items[i].artists[0].name);
                console.log("Album Name: " + items[i].album.name);
                console.log("Track Name: " + items[i].name);
                console.log("Preview link: " + items[i].preview_url);
            }
        }
    }
}

else if(input === "movie-this") {

    var request = require("request");
    var movieName = "";
    var nodeArgs = process.argv;

    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        }
        else {
            movieName = movieName + nodeArgs[i];
        }
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

    request(queryUrl, function (err, response, body) {
        if (!err && response.statusCode === 200) {
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Produced in: " + JSON.parse(body).Country);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Notable Actors: " + JSON.parse(body).Actors);
        }
    });
}

