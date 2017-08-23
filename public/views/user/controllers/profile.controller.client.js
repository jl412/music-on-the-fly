(function () {
    angular
        .module('MOTF')
        .controller('profileController',profileController);

    function profileController($rootScope, $scope, currentUser, $location, $routeParams, userService, playlistService ) {

        $scope.pageClass= "page-profile";

        var model = this;
        model.routeID = $routeParams['uid'];



        model.update = updateUser;
        model.logout = logout;

        model.createPlaylist = createPlaylist;
        model.deletePlaylist = deletePlaylist;
        model.deleteTrack = deleteTrack;
        model.play = play;

        function init(){

            console.log(currentUser);
            if(currentUser.admin) {
                model.ownPage = 1;
                userService
                    .findUserById(model.routeID)
                    .then(function (user) {
                        model.user = user;
                        model.admin = 1;
                    });
            }else if(currentUser._id === model.routeID){
                model.user = currentUser;
                model.ownPage = 1;
                model.admin = 0;
            }else{
                model.ownPage = 0;
                userService
                    .findUserById(model.routeID)
                    .then(function (user) {
                        model.user = user;
                        model.admin = 0;
                    })
            }
            // console.log(model.user._id === model.routeID);
            playlistService
                .findPlaylistsByUser(model.routeID)
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

        function play(uri) {
            var convertedUri = 'https://open.spotify.com/embed?uri=' + uri.split(":").join("%3A");
            $rootScope.uri = convertedUri;
        }

        init()



    }

})();
