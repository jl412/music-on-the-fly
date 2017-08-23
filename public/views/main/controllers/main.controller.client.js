(function () {
    angular
        .module('MOTF')
        .controller('mainController',mainController);

    function mainController($rootScope, $scope, $location,
                             mainService) {

        $scope.pageClass = 'page-main';

        var model = this;

        model.search = search;

        function search(searchTerm) {
            $location.url("/result?search=" + searchTerm);
        }

    }

})();
