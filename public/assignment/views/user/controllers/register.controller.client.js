(function () {
    angular
        .module('WAM')
        .controller('registerController',registerController);

    function registerController($location, userService) {

        var model = this;



        model.register = register;

        function register(username,
                          password,
                          password2) {

            if(password !== password2){
                model.error = "Password must match";
                return;
            }

            var found = userService.findUserByUsername(username);
            found
                .then(function (repsonse) {

                    console.log(repsonse);

                    if(repsonse === "0"){
                        var user = {
                            username:username,
                            password:password,

                        };

                        userService
                            .createUser(user)
                            .then(function (user) {
                                $location.url("/user/" + user._id);
                            })

                    } else{
                        model.error = "Username is not available";
                    }

                })

        }
    }

})();
