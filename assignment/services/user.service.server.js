var app = require('../../express');
var userModel = require("../model/user/user.model.server");

app.get('/api/assignment/user', findUser);
app.get('/api/assignment/user/:uid', findUserById);
app.post('/api/assignment/user', createUser);
app.put('/api/assignment/user/:uid', updateUser);
app.delete('/api/assignment/user/:uid', deleteUser);


function createUser(req, res) {

    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.send(user);
        });

}

function findUser(req, res) {

    var username = req.query['username'];
    var password = req.query['password'];

    console.log(username + " ; " + password);

    if(username&&password){
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                console.log(user + "log in");
                res.json(user);
                return;
            }, function (err) {
                res.sendStatus(404).send(err);
                return;
            });
    }else if(username){
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user === null) {
                    console.log("user can be registered");
                    res.send("0");
                    return;
                }
                res.json(user);
                console.log("user already exist");
                return;
            });
    }

    // res.sendStatus(404);
}

function findUserById(req, res) {
    userModel
        .findUserById(req.params.uid)
        .then(function (user) {
            res.json(user);
        });
}

function updateUser(req, res) {
    var uid = req.params.uid;
    var user = req.body;

    userModel
        .updateUser(uid, user)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function deleteUser(req, res) {
    var uid = req.params.uid;

    userModel
        .deleteUser(uid)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404).send(err);
        });

}