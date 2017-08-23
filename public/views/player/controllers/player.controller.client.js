(function () {
    angular
        .module('MOTF')
        .controller('playerController', playerController);

    function playerController($sce, $rootScope, $location, userService) {

        var model = this;
        model.getPlayerUrl = getPlayerUrl;

        function init() {
        }

        function getPlayerUrl(url) {
            return $sce.trustAsResourceUrl(url);
        }

        init();

    }

})();