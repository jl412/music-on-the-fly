var mongoose = require("mongoose");
var userSchema = mongoose.Schema({

    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    admin: {type: Boolean, default: false},
    playlist: [{type: mongoose.Schema.Types.ObjectId, ref: "playlistModel"}],
    dateCreated: {type: Date, default: Date.now}

}, {collection: "user"});
module.exports = userSchema;