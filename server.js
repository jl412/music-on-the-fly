var app = require('./express');
var express = app.express;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
// app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(session({ secret: "put some text here" }));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));


require("./server/app.js");

var port = process.env.PORT || 3000;

app.listen(port);