(function () {
    angular
        .module('MOTF')
        .controller('mainController',mainController);

    function mainController($scope, $location,
                             userService) {

        $scope.pageClass = 'page-main';

    }

})();
