(function () {
    angular
        .module('WAM')
        .controller('profileController',profileController);

    function profileController($location,
                               $routeParams,
                               userService ) {

        var model = this;
        var uid = $routeParams["uid"];

        model.update = updateUser;


        function logout() {
            $location.url('/login');
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/login');
                });
        }

        function updateUser(user) {
            userService.updateUser(model.user._id, user)
                .then(function () {
                    model.message = 'user updated successfully'
                });
        }

        function init() {
            userService
                .findUserById(uid)
                .then(function (user) {
                    model.user = user;
                });
        }
        init();



    }

})();
