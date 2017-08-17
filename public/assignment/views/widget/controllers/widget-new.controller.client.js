(function () {
    angular
        .module('WAM')
        .controller('widgetNewController',widgetNewController);

    function widgetNewController($routeParams, widgetService, $location) {
        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];
        model.wgid = $routeParams['wgid'];

        model.createWidget = createWidget;

        function init() {
            widgetService
                .findWidgetsByPid(model.pid)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
        }

        init();

        function createWidget(string) {
            var widget = {
                "_page":model.pid,
                "widgetType":string
            };

            widgetService
                .createWidget(widget)
                .then(function (reponse) {
                    $location.url('/user/' + model.uid + '/website/' + model.wid + '/page/' + model.pid + '/widget/' + reponse._id);
                })
        }

    }

})();
