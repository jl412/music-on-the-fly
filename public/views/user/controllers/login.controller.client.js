(function () {
    angular
        .module('WAM')
        .controller('loginController',loginController);

    function loginController($location,
                             userService) {

        var model = this;

        model.login = function (username, password) {

            userService
                .findUserByCrendentials(username, password)
                .then(login, errorMessage);

            function errorMessage(error) {
                model.message = "Login failed. Please try again";
            }

            function login(found) {
                if(found !== null){
                    console.log("login success")
                    $location.url("/user/" + found._id);
                }
                else{
                    model.message = "Username " + username + " not found, please try again";
                }
            }
        }
    }

})();
