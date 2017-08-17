var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server.js");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);
var pageModel = require("../page/page.model.server");


widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetsByPid = findWidgetsByPid;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.updateOrder = updateOrder;

module.exports = widgetModel;

function createWidget( widget) {

    var pageId = widget._page;
    return widgetModel
        .create(widget)
        .then( function (widget) {
            pageModel
                .findPageById(pageId)
                .then(function (page) {
                    page.widgets.push(widget);
                    page.save();
                });
            return widget;
        });

}

function findWidgetsByPid(pageId) {
    return widgetModel.find({_page : pageId});
}

function findAllWidgetsForPage(pageId) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            // console.log(page.widgets);
            return page.widgets;
        });
    // return widgetModel.find({_page : pageId});
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId},
        {$set: widget});
}

function deleteWidget(widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function () {
            pageModel
                .findOne({widgets: widgetId})
                .then(function (page) {
                    var index = page.widgets.indexOf(widgetId);
                    page.widgets.splice(index, 1);
                    page.save();
                });
        });
}

function updateOrder(pageId, initial, final) {

    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var widget = page.widgets[initial];
            page.widgets.splice(initial, 1);
            page.widgets.splice(final, 0, widget);
            page.save();

            console.log(page.widgets);
        });
}