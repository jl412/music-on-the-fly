var mongoose = require("mongoose");
var playlistSchema = require("./playlist.schema.server.js");
var playlistModel = mongoose.model("playlistModel", playlistSchema);
var userModel = require("../user/user.model.server");

playlistModel.createPlaylistForUser = createPlaylistForUser;
playlistModel.findAllPlaylistsForUser = findAllPlaylistsForUser;
playlistModel.findPlaylistById = findPlaylistById;
playlistModel.updatePlaylist = updatePlaylist;
playlistModel.deletePlaylist = deletePlaylist;
module.exports = playlistModel;


function createPlaylistForUser(playlist) {
    var userId = playlist._user._id;
    return playlistModel
        .create(playlist)
        .then(function (playlist) {
            userModel
                .findUserById(userId)
                .then(function (user) {
                    user.playlists.push(playlist);
                    user.save();
                });
        });
}

function findAllPlaylistsForUser(userId) {
    return playlistModel
        .find({_user: userId})
        .populate('_user', 'username')
        .exec();
}

function findPlaylistById(playlistId) {
    return playlistModel.findById(playlistId);
}

function updatePlaylist(playlistId, playlist) {
    return playlistModel.update({_id: playlistId},
        {$set: playlist});
}

function deletePlaylist(playlistId) {
    return playlistModel
        .remove({_id: playlistId})
        .then(function (status) {
            userModel
                .findOne({playlists: playlistId})
                .then(function (user) {
                    var index = user.playlists.indexOf(playlistId);
                    user.playlists.splice(index, 1);
                    user.save();
                });
        });
}