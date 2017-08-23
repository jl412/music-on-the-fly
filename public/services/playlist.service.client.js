(function () {
    angular
        .module("MOTF")
        .factory("playlistService", playlistService);

    function playlistService($http) {

        var api = {
            createPlaylist:createPlaylist,
            findPlaylistsByUser:findPlaylistsByUser,
            findPlaylistById:findPlaylistById,
            updatePlaylist:updatePlaylist,
            deletePlaylist:deletePlaylist
        };

        return api;

        function createPlaylist(playlist) {
            var url = '/api/server/user/uid/playlist';
            return $http.post(url,playlist)
                .then(function (response) {
                    return response.data;
                })
        }

        function findPlaylistsByUser(uid) {
            var url = '/api/server/user/' + uid + '/playlist';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPlaylistById(plid) {
            var url = '/api/server/user/uid/playlist/' + plid;
            return $http.get(url)
                .then(function (response ) {
                    return response.data;
                })
        }

        function updatePlaylist(plid, newInfo) {
            var url = '/api/server/user/uid/playlist/'+plid;
            return $http.put(url, newInfo)
                .then(function (response) {
                    return response.data;
                })
        }

        function deletePlaylist(plid) {
            var url = '/api/server/user/uid/playlist/'+ plid;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();