(function () {
    angular
        .module('MOTF')
        .controller('resultController',resultController);

    function resultController($scope, $routeParams, mainService) {

        $scope.pageClass = 'page-result';

        var model = this;
        model.searchTerm = $routeParams['search'];

        // model.search = search;

        function init(){
            if (model.searchTerm){
                search(model.searchTerm);
            }else{
                model.message = "Page not available!"
            }
        }

        function search(searchTerm) {
            console.log(searchTerm);
            mainService
                .searchSpotify(searchTerm)
                .then(function(response) {
                    model.tracks = response.tracks.items;
                    console.log(model.tracks);
                });

        }

        init();

    }

})();
