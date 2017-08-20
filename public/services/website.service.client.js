(function () {
    angular
        .module("MOTF")
        .factory("websiteService", websiteService);

    function websiteService($http) {

        var api = {
            createWebsite:createWebsite,
            findWebsitesByUser:findWebsitesByUser,
            findWebsiteById:findWebsiteById,
            updateWebsite:updateWebsite,
            deleteWebsite:deleteWebsite
        };

        return api;

        function createWebsite(website) {
            var url = '/api/server/user/uid/website';
            return $http.post(url,website)
                .then(function (response) {
                    return response.data;
                })
        }

        function findWebsitesByUser(uid) {
            var url = '/api/server/user/' + uid + '/website';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            return resultSet;
        }

        function findWebsiteById(wid) {
            var url = '/api/server/user/uid/website/' + wid;
            return $http.get(url)
                .then(function (response ) {
                    return response.data;
                })
        }

        function updateWebsite(wid, newInfo) {
            var url = '/api/server/user/uid/website/'+wid;
            return $http.put(url, newInfo)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteWebsite(wid) {
            var url = '/api/server/user/uid/website/'+ wid;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();