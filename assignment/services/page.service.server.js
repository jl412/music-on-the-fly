var app = require('../../express');
var pageModel = require('../model/page/page.model.server');

app.post('/api/assignment/user/:uid/website/:wid/page', createPage);
app.get('/api/assignment/user/:uid/website/:wid/page/:pid', findPageById);
app.get('/api/assignment/user/:uid/website/:wid/page', findPageByWid);
app.put('/api/assignment/user/:uid/website/:wid/page/:pid', updatePage);
app.delete('/api/assignment/user/:uid/website/:wid/page/:pid', deletePage);



function createPage(req, res) {
    var page = req.body;
    pageModel
        .createPage( page)
        .then(function (page) {
            res.json(page);
        });
}

function findPageById(req, res) {
    var pid = req.params.pid;
    pageModel
        .findPageById(pid)
        .then(function (page) {
            res.json(page);
        }, function(err) {
            res.sendStatus(404).send(err);
        });
}

function findPageByWid(req, res) {
    var wid = req.params.wid;
    pageModel
        .findAllPagesForWebsite(wid)
        .then(function (pages) {
            res.json(pages);
        });
}

function updatePage(req, res) {
    var page = req.body;
    var pid =  req.params.pid;

    pageModel
        .updatePage(pid, page)
        .then(function (status) {
            res.json(status);
        }, function(err) {
            res.sendStatus(404).send(err);
        });
}

function deletePage(req, res) {

    var pid = req.params.pid;
    pageModel
        .deletePage(pid)
        .then(function (status) {
            res.sendStatus(200);
        });
}