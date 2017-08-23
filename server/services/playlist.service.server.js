var app = require('../../express');
var playlistModel = require("../model/playlist/playlist.model.server");

app.post('/api/server/user/:uid/playlist', createPlaylist);
app.get('/api/server/user/:uid/playlist', findAllPlaylistsForUser);
app.get('/api/server/user/uid/playlist/:plid', findPlaylistById);
app.put('/api/server/user/uid/playlist/:plid', updatePlaylist);
app.delete('/api/server/user/uid/playlist/:plid', deletePlaylist);

function createPlaylist(req, res) {
    var playlist = req.body;

    playlistModel
        .createPlaylistForUser(playlist)
        .then(function (playlist) {
            res.json(playlist);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function findPlaylistById(req, res) {
    var plid = req.params.plid;

    playlistModel
        .findPlaylistById(plid)
        .then(function (playlist) {
                res.json(playlist);
            },
            function (err) {
                res.sendStatus(404).send(err);
            });
}

function findAllPlaylistsForUser(req, res) {
    var uid = req.params.uid;

    playlistModel
        .findAllPlaylistsForUser(uid)
        .then(function (playlists) {
            res.send(playlists);
        });
}

function updatePlaylist(req, res) {
    var plid = req.params.plid;
    var playlist = req.body;

    playlistModel
        .updatePlaylist(plid, playlist)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function deletePlaylist(req, res) {

    var plid = req.params.plid;

    playlistModel
        .deletePlaylist(plid)
        .then(function (status) {
            res.sendStatus(200);
        });
}