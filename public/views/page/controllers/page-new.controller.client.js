(function () {
    angular
        .module('MOTF')
        .controller('pageNewController',pageNewController);

    function pageNewController($routeParams, pageService, $location) {

        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.createPage = createPage;

        function init() {
            pageService
                .findPageByWid(model.wid)
                .then(function (pages) {
                    model.pages = pages;
                });
        }

        init();

        function createPage(page) {
            page._website = model.wid;
            pageService
                .createPage(page)
                .then(function (page) {
                    $location.url('/user/' + model.uid + '/website/' + model.wid + '/page');
                })
        }

    }

})();
