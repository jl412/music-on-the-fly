var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server.js");
var pageModel = mongoose.model("PageModel", pageSchema);
var websiteModel = require("../website/website.model.server");

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
module.exports = pageModel;


function createPage(page) {
    var websiteId = page._website;
    return pageModel
        .create(page)
        .then(function (page) {
            websiteModel
                .findWebsiteById(websiteId)
                .then(function (website) {
                    website.pages.push(page);
                    website.save();
                });
        });
}

function findAllPagesForWebsite(websiteId) {
    return pageModel
        .find({_website: websiteId})
        .populate('_website', 'name')
        .exec();
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function updatePage(pageId, page) {
    return pageModel.update({_id: pageId},
        {$set: page});
}

function deletePage(pageId) {
    return pageModel
        .remove({_id: pageId})
        .then (function () {
            websiteModel
                .findOne({pages: pageId})
                .then(function (website) {
                    var index = website.pages.indexOf(pageId);
                    website.pages.splice(index, 1);
                    website.save();
                });
        });
}
