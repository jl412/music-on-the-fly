(function () {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);
    
    function websiteListController($routeParams, websiteService) {

        var model = this;
        model.uid = $routeParams['uid'];

        function init() {
            websiteService
                .findWebsitesByUser(model.uid)
                .then(function (websites) {
                    model.websites = websites;
                });
        }
        init();
    }
})();