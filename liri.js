//const util = require("util");
//^attempting to use util to help display JSON objects more clearly

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
            //console.log(data.tracks);
            var items = data.tracks.items;
            //console.log(items);
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
        // if(nodeArgs === null){
        //     movieName = "Mr Nobody";
        // }
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

    request(queryUrl, function (err, response, body) {
        if (!err && response.statusCode === 200) {
            //console.log(body);
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Produced in: " + JSON.parse(body).Country);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Notable Actors: " + JSON.parse(body).Actors);
            //console.log(JSON.parse(body));
        }
    });
}

/*Having trouble getting this to run whatever function corresponds to the input in "random.txt".
I've required "fs" to read and append random.txt. My thought process was to split the strings in random.txt into an array,
and then call the appropriate function using the indexes of that array. If there were more than one command/string, I would loop through the array
instead of just using dataArr[0] and dataArr[1]. Close but no cigar.
*/

// else if(input === "do-what-it-says") {
//     var fs = require("fs");
//     fs.readFile("random.txt", "utf-8", function (err, data) {
//         if (err) {
//             return console.log(err);
//         } else {
//             var dataArr = data.split(",");
//                 if(dataArr[0] === "spotify-this-song"){
//                     spotifyParams = {
//                         type: "track",
//                         query: dataArr[1]
//                     };
//
//                 }
//             // process.argv[3] = dataArr[0];
//             // process.argv[4] = dataArr[1];
//             // for (var i = 3; i < process.argv.length; i++) {
//             //     if (i > 3 && i < process.argv.length) {
// //             movieName = movieName + "+" + process.argv[i];
// //         }
// //         else {
// //             movieName = movieName + nodeArgs[i];
// //         }
//         }
//     });
// }