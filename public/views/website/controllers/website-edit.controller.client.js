(function () {
    angular
        .module('MOTF')
        .controller('websiteEditController', websiteEditController);
    
    function websiteEditController($routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        model.uid = $routeParams.uid;
        model.wid = $routeParams.wid;

        // event handlers
        // model.createWebsite = createWebsite;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            websiteService
                .findWebsitesByUser(model.uid)
                .then(function (websites) {
                    model.websites = websites;
                })
            websiteService
                .findWebsiteById(model.wid)
                .then(function (website) {
                    model.website = website;
                })
        }
        init();


        function updateWebsite(website) {
            websiteService.updateWebsite(model.website._id, website)
                .then(function () {
                    model.message = "website updated successfully";
                });

        }

        function deleteWebsite(wid) {
            websiteService
                .deleteWebsite(model.website._id)
                .then(function () {
                    $location.url('/user/' + model.uid + '/website');
                });
        }
    }
})();