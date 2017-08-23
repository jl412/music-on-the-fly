var app = require('../express');


require('./services/user.service.server');
require('./services/playlist.service.server');
require('./services/main.service.server');



require("./model/models.server.js");

// console.log("app.js");
//
// app.get('/websites', getWebsites);
//
//
// function getWebsites(req, res) {
//     var websites = [
//         {name:'facebook'},
//         {name:'twitter'}
//     ]
//
//     res.send(websites);
//
// }
