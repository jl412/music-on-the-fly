(function () {
    angular
        .module('widgetDirectives',[])
        .directive("widgetSortable", widgetSortableDirective);

    function widgetSortableDirective($http, $routeParams) {
        function linkFunction(scope, element) {
            var widgetList = element.find("ul");
            // console.log(widgetList);
            var initial = -1;
            var final = -1;
            widgetList.sortable({
                axis: "y",
                handle: ".widget-control .glyphicon-menu-hamburger",
                start: function (event, ui) {

                    initial = $(ui.item).index();
                },
                stop: function (event, ui) {
                    final = $(ui.item).index();
                    console.log([initial, final]);
                    $http.put("/page/" + $routeParams.pid + "/widget?initial=" + initial + "&final=" + final);
                }
            });
        }
        return {
            templateUrl: "directives/widget-list.html",
            link: linkFunction
        }
    }

})();