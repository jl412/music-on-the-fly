var app = require('../../express');
var request = require('request'); // "Request" library

var client_id = 'da7d8df204ba403a872cff61b6f31f63'; // Your client id
var client_secret = 'acf22273f2f04ae59c1a2daf0ae173aa'; // Your secret

var baseUrl = "https://api.spotify.com/v1/search?q=QUERY&type=track"
// var baseUrl = "https://api.spotify.com/v1/search?q=QUERY&type=track&limit=9"

var accessToken;

app.get('/api/search', searchSpotify);

// your application requests authorization
var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};



function searchSpotify(req, res) {
    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {

            // use the access token to access the Spotify Web API
            var token = body.access_token;
            accessToken = token;
            var convertedQ =  req.query['term'].split(" ").join("+");
            console.log("search tearm=" + convertedQ);
            var url =  baseUrl.replace("QUERY", convertedQ);
            var options = {
                url: url,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                json: true
            };
            request.get(options, function(error, response, body) {
                res.json(body);
            });
        }
    });
}