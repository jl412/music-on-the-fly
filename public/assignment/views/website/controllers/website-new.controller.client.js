(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);
    
    function websiteNewController($routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        model.uid = $routeParams['uid'];

        // event handlers
        model.createWebsite = createWebsite;

        function init() {
            websiteService
                .findWebsitesByUser(model.uid)
                .then(function (websites) {
                    model.websites = websites;
                });
        }
        init();

        // implementation
        function createWebsite(website) {
            website._user = model.uid;
            websiteService
                .createWebsite(website)
                .then(function (website) {
                    $location.url('/user/' + model.uid + '/website');
                })
        }
    }
})();