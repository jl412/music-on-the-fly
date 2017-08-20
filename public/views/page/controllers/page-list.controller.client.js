(function () {
    angular
        .module('MOTF')
        .controller('pageListController',pageListController);

    function pageListController($routeParams, pageService) {

        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];


        function init() {
            pageService
                .findPageByWid(model.wid)
                .then(function (pages) {
                    model.pages = pages;
                });
        }

        init();

    }

})();
