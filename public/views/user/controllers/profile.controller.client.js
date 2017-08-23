(function () {
    angular
        .module('MOTF')
        .controller('profileController',profileController);

    function profileController($scope, currentUser, $location, $routeParams, userService, playlistService ) {

        $scope.pageClass= "page-profile";

        var model = this;
        model.user = currentUser;


        model.update = updateUser;
        model.logout = logout;

        model.createPlaylist = createPlaylist;
        model.deletePlaylist = deletePlaylist;
        model.deleteTrack = deleteTrack;

        function init(){
            playlistService
                .findPlaylistsByUser(model.user._id)
                .then(function (playlists) {
                    model.playlists = playlists;
                })
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/login');
                });
        }

        function updateUser(user) {
            userService.updateUser(model.user._id, user)
                .then(function () {
                    model.message = 'user updated successfully'
                });
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }


        /*-- Playlist functions--*/
        function createPlaylist(name) {
            var playlist = {
                "_user": model.user,
                "name": name,
                "tracks": []
            };

            playlistService
                .createPlaylist(playlist)
                .then(function (reponse) {
                    console.log("playlistCreated");
                    init();
                })
        }

        function deletePlaylist(plid) {
            playlistService
                .deletePlaylist(plid)
                .then(function () {
                    init();
                });
        }

        function deleteTrack(tid ,playlistid) {

            playlistService
                .findPlaylistById(playlistid)
                .then(function (playlist) {
                    for (t in playlist.tracks){
                        if(t.id === "tid"){
                            var track = t;
                        }
                    }
                    var index = playlist.tracks.indexOf(track);
                    playlist.tracks.splice(index, 1);
                    var newInfo = playlist;
                    // console.log(newInfo);
                    playlistService
                        .updatePlaylist(playlistid, newInfo)
                        .then(function () {
                            init();
                        });
                })
        }

        init()



    }

})();
