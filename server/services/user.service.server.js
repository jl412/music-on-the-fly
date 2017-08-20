var app = require('../../express');
var userModel = require("../model/user/user.model.server");
var passport = require('passport');
var bcrypt = require("bcrypt-nodejs");

var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post('/api/login', passport.authenticate('local'), login);
app.post('/api/logout', logout);
app.get('/api/server/user', findUser);
app.get('/api/server/user/:uid', findUserById);
app.post('/api/server/user', createUser);
app.put('/api/server/user/:uid', updateUser);
app.delete('/api/server/user/:uid', deleteUser);


function login(req, res) {

    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function localStrategy(username, password, done) {

    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if(user.username === username && user.password === password) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        );

    // userModel
    //     .findUserByUsername(username)
    //     .then(function (user) {
    //         console.log("found password: " + user.password);
    //         console.log("entered password: " + password);
    //         console.log("pw-check: " + bcrypt.compareSync(password, user.password));
    //         if(bcrypt.compareSync(password, user.password)) {
    //             console.log("password matches");
    //             return userModel
    //                 .findUserByCredentials(username, user.password)
    //                 .then(function(user) {
    //                         if (!user) {
    //                             return done(null, false);
    //                         }
    //                         return done(null, user);
    //                     },
    //                     function(err) {
    //                         if (err) {
    //                             return done(err);
    //                         }
    //                     });
    //         }
    //     });
}


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