var app = require('../../express');
var widgetModel = require('../model/widget/widget.model.server');

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname +  '/../../public/uploads' });

app.get('/api/server/user/:uid/website/:wid/page/:pid/widget', findWidgetsByPid);
app.post('/api/server/user/:uid/website/:wid/page/:pid/widget', createWidget);
app.get('/api/server/user/:uid/website/:wid/page/:pid/widget/:wgid', findWidgetById);
app.put('/api/server/user/:uid/website/:wid/page/:pid/widget/:wgid', updateWidget);
app.put('/page/:pid/widget?', updateOrder);
app.delete('/api/server/user/:uid/website/:wid/page/:pid/widget/:wgid', deleteWidget);
app.post("/api/upload", upload.single('myFile'), uploadImage);



function findWidgetById(req, res) {
    var wgid = req.params.wgid;

    widgetModel
        .findWidgetById(wgid)
        .then(function (widget) {
            res.send(widget);
        });
}


function findWidgetsByPid(req, res) {
    var pid = req.params.pid;
    var resultSet = [];
    widgetModel
        .findAllWidgetsForPage(pid)
        .then(function (widgetsOfPage) {
            widgetModel
                .findWidgetsByPid(pid)
                .then(function (widgets) {
                    for(i = 0; i < widgetsOfPage.length; i++){
                        for (j = 0; j <  widgets.length; j++){
                            var wp = '' + widgetsOfPage[i];
                            var w = '' + widgets[j]._id;
                            if (wp === w){
                                resultSet.push(widgets[j]);
                            }
                        }
                    }
                    res.json(resultSet);
                })
        }, function(err) {
            res.sendStatus(404).send(err);
        });
}

function createWidget(req, res) {
    var widget = req.body;

    widgetModel
        .createWidget(widget)
        .then(function (widget) {
            res.json(widget);
        }, function (err) {
            console.log("create widget error");
            res.sendStatus(404).send(err);
        });

}


function updateWidget(req, res) {
    var wgid = req.params.wgid;
    var widget = req.body;

    widgetModel
        .updateWidget(wgid, widget)
        .then(function (status) {
            res.send(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function deleteWidget(req, res) {
    var wgid = req.params.wgid;

    widgetModel
        .deleteWidget(wgid)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function updateOrder(req, res) {

    var pid = req.params.pid;
    var initial = req.query['initial'];
    var final = req.query['final'];


    widgetModel
        .updateOrder(pid, initial, final)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404).send(err);
        });

}

function uploadImage(req, res) {

    var wgid      = req.body.wgid;
    var width         = req.body.width;
    var myFile        = req.file;

    if(myFile === undefined){
        res.sendStatus(204);
        return;
    }else{

        var uid = req.body.uid;
        var wid = req.body.wid;
        var pid = req.body.pid;


        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        console.log(originalname);
        console.log(filename);
        console.log(path);
        console.log(destination);

        widgetModel
            .findWidgetById(wgid)
            .then(function (widget) {
                widget.url = "/uploads/" + filename;
                widgetModel
                    .updateWidget(wgid, widget)
                    .then(function () {


                        var callbackUrl   = "/server/index.html#!/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/" + wgid;

                        res.redirect(callbackUrl);
                    });
            });

    }
}

