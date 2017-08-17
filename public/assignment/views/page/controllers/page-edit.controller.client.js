(function () {
    angular
        .module('WAM')
        .controller('pageEditController',pageEditController);

    function pageEditController($routeParams,
                                pageService,
                                $location) {

        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];

        // model.createPage = createPage;
        model.updatePage = updatePage;
        model.deletePage = deletePage

        function init() {
            pageService
                .findPageByWid(model.wid)
                .then(function (pages) {
                    model.pages = pages;
                })
            pageService
                .findPageById(model.pid)
                .then(function (page) {
                    model.page = page;
                })
        }

        init();

        // function createPage(website) {
        //     website.developerId = model.uid;
        //     pageService.createPage(website);
        //     $location.url('/user/' + model.uid + '/website/' + model.wid + '/page');
        // }

        function updatePage(page) {
            pageService
                .updatePage(model.page._id, page)
                .then(function () {
                    model.message = "page updated successfully";
                });
        }

        function deletePage(pid) {
            pageService
                .deletePage(model.page._id)
                .then(function () {
                    $location.url('/user/' + model.uid + '/website/'+ model.wid + '/page');
                });
        }

    }

})();
