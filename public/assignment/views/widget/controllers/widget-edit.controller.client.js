(function () {
    angular
        .module('WAM')
        .controller('widgetEditController',widgetEditController);

    function widgetEditController($routeParams, widgetService, $location) {

        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];
        model.wgid = $routeParams['wgid'];


        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function init() {
            widgetService
                .findWidgetsByPid(model.pid)
                .then(function (widgets) {
                    model.widgets = widgets;
                })
            widgetService
                .findWidgetById(model.wgid)
                .then(function (widget) {
                    model.widget = widget;
                    console.log(model.widget);
                })

        }

        init();



        function updateWidget(widget) {
            widgetService
                .updateWidget(model.widget._id, widget)
                .then(function () {
                    model.message = "widget updated successfully";
                });
        }

        function deleteWidget(wgid) {
            widgetService
                .deleteWidget(model.widget._id)
                .then(function () {
                    $location.url('/user/' + model.uid + '/website/'+ model.wid + '/page/' + model.pid + '/widget');
                });
        }

    }

})();
