var mongoose = require("mongoose");
var playlistSchema = mongoose.Schema({

    _user: {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
    name: String,
    tracks: [{id: String, name: String, artist: String, uri: String}],
    dateCreated:  {type: Date, default: Date.now}

}, {collection: "playlist"});
module.exports = playlistSchema;