(function () {
    angular
        .module("WAM")
        .factory("widgetService", widgetService);

    function widgetService($http) {


        var api = {
            createWidget:createWidget,
            findWidgetsByPid:findWidgetsByPid,
            findWidgetById:findWidgetById,
            updateWidget:updateWidget,
            deleteWidget:deleteWidget
        };

        return api;

        function createWidget(widget) {
            var url = '/api/server/user/uid/website/wid/page/pid/widget';
            return $http.post(url,widget)
                .then(function (response) {
                    console.log(response.data);
                    return response.data;
                })
        }

        function findWidgetsByPid(pid) {
            var url = '/api/server/user/uid/website/wid/page/' + pid + '/widget';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetById(wgid) {
            var url = '/api/server/user/uid/website/wid/page/pid/widget/' + wgid;
            return $http.get(url)
                .then(function (response ) {
                    return response.data;
                })
        }

        function updateWidget(wgid, newInfo) {
            var url = '/api/server/user/uid/website/wid/page/pid/widget/' + wgid;
            return $http.put(url, newInfo)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteWidget(wgid) {
            var url = '/api/server/user/uid/website/wid/page/pid/widget/' + wgid;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();