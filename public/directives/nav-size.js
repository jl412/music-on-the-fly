(function () {
    angular
        .module('navbarSizeDirectives',[])
        .directive('navbarSize', navbarSize);

    function navbarSize() {
        function linkFunction($scope, $element, $attrs) {
            // console.log($scope.model.state);
            // console.log($element);

            if($scope.model.state === "/login" || $scope.model.state === "/registewr"){
                $element.addClass("navbar-full");
            }
        }
        return {
            restrict: 'A',
            link: linkFunction
        }
    }

    // function navbarSizeDirectives() {
    //     return {
    //         restrict: 'A'
    //     }
    // }

})();