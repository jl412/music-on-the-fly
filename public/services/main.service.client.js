(function () {
    angular
        .module("MOTF")
        .factory("mainService", mainService);

    function mainService($http) {

        var api = {
            searchSpotify:searchSpotify
        };

        return api;

        function searchSpotify(query) {
            console.log("query:" + query + ", type:" + typeof query);
            var url = '/api/search?term=' + query;
            return $http.get(url,query)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();