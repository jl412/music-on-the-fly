var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server.js");
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);
var userModel = require("../user/user.model.server");

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
module.exports = websiteModel;


function createWebsiteForUser(website) {
    var userId = website._user
    return websiteModel
        .create(website)
        .then(function (website) {
            userModel
                .findUserById(userId)
                .then(function (user) {
                    user.websites.push(website);
                    user.save();
                });
        });
}

function findAllWebsitesForUser(userId) {
    return websiteModel
        .find({_user: userId})
        .populate('_user', 'username')
        .exec();
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website) {
    return websiteModel.update({_id: websiteId},
        {$set: website});
}

function deleteWebsite(websiteId) {
    return websiteModel
        .remove({_id: websiteId})
        .then(function (status) {
            userModel
                .findOne({websites: websiteId})
                .then(function (user) {
                    var index = user.websites.indexOf(websiteId);
                    user.websites.splice(index, 1);
                    user.save();
                });
        });
}