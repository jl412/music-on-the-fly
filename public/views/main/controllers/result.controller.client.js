(function () {
    angular
        .module('MOTF')
        .controller('resultController',resultController);

    function resultController($rootScope, $scope, $window, currentUser, $routeParams, mainService, playlistService) {

        $scope.pageClass = 'page-result';

        var model = this;
        model.searchTerm = $routeParams['search'];
        model.addTrack = addTrack;
        model.alertLogin = alertLogin;
        model.play = play;

        // model.search = search;

        function init(){
            if (model.searchTerm){
                search(model.searchTerm);
            }else{
                model.message = "Page not available!"
            }

            if (currentUser){
                model.user = currentUser;
                playlistService
                    .findPlaylistsByUser(model.user._id)
                    .then(function (playlists) {
                        model.playlists = playlists;
                        console.log(model.playlists);
                    });
            }
        }

        function search(searchTerm) {
            mainService
                .searchSpotify(searchTerm)
                .then(function(response) {
                    model.tracks = response.tracks.items;
                    console.log(model.tracks);
                });

        }

        function addTrack(tid, tname, tartist, turi, playlistid) {
            var track = {
                "id": tid,
                "name": tname,
                "artist": tartist,
                "uri": turi
            }

            playlistService
                .findPlaylistById(playlistid)
                .then(function (playlist) {
                    playlist.tracks.push(track);
                    var newInfo = playlist;
                    playlistService
                        .updatePlaylist(playlistid, newInfo)
                        .then(function () {
                            model.message = "Track added to your playlist. Enjoy =]";
                        });
                })
        }
        
        function alertLogin() {
            $window.alert("Please login to add track to your playlists!");
        }

        function play(uri) {
            var convertedUri = 'https://open.spotify.com/embed?uri=' + uri.split(":").join("%3A");
            $rootScope.uri = convertedUri;
        }

        init();

    }

})();
