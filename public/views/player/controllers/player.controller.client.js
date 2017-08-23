(function () {
    angular
        .module('MOTF')
        .controller('playerController', playerController);

    function playerController($sce, $rootScope, $location, userService) {

        var model = this;
        model.getPlayerUrl = getPlayerUrl;

        function init() {
            $rootScope.uri ='https://open.spotify.com/embed?uri=spotify%3Atrack%3A7FXj7Qg3YorUxdrzvrcY25';
        }

        function getPlayerUrl(url) {
            return $sce.trustAsResourceUrl(url);
        }

        init();

    }

})();