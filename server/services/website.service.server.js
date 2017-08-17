var app = require('../../express');
var websiteModel = require("../model/website/website.model.server");

app.post('/api/server/user/:uid/website', createWebsite);
app.get('/api/server/user/:uid/website', findAllWebsitesForUser);
app.get('/api/server/user/uid/website/:wid', findWebsiteById);
app.put('/api/server/user/uid/website/:wid', updateWebsite);
app.delete('/api/server/user/uid/website/:wid', deleteWebsite);

function createWebsite(req, res) {
    var website = req.body;

    websiteModel
        .createWebsiteForUser(website)
        .then(function (website) {
            res.json(website);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function findWebsiteById(req, res) {
    var wid = req.params.wid;

    websiteModel
        .findWebsiteById(wid)
        .then(function (website) {
                res.json(website);
            },
            function (err) {
                res.sendStatus(404).send(err);
            });
}

function findAllWebsitesForUser(req, res) {
    var uid = req.params.uid;

    websiteModel
        .findAllWebsitesForUser(uid)
        .then(function (websites) {
            res.send(websites);
        });
}

function updateWebsite(req, res) {
    var wid = req.params.wid;
    var website = req.body;

    websiteModel
        .updateWebsite(wid, website)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function deleteWebsite(req, res) {

    var wid = req.params.wid;

    websiteModel
        .deleteWebsite(wid)
        .then(function (status) {
            res.sendStatus(200);
        });
}