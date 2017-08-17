(function () {
    angular
        .module("WAM")
        .factory("pageService", pageService);

    function pageService($http) {


        var api = {
            createPage:createPage,
            findPageByWid:findPageByWid,
            findPageById:findPageById,
            updatePage:updatePage,
            deletePage:deletePage
        };

        return api;

        function createPage(page) {
            var url = '/api/assignment/user/uid/website/wid/page';
            return $http.post(url,page)
                .then(function (response) {
                    return response.data;
                })
        }

        function findPageByWid(wid) {
            var url = '/api/assignment/user/uid/website/' + wid + '/page';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPageById(pid) {
            var url = '/api/assignment/user/uid/website/wid/page/' + pid;
            return $http.get(url)
                .then(function (response ) {
                    return response.data;
                })
        }

        function updatePage(pid, page) {
            var url = '/api/assignment/user/uid/website/wid/page/' + pid;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                })
        }

        function deletePage(pid) {
            var url = '/api/assignment/user/uid/website/wid/page/' + pid;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

    }
})();