(function () {
    angular
        .module('MOTF')
        .controller('navbarController', navbarController);

    function navbarController($rootScope, $location, userService) {

        var model = this;

        $rootScope.$on( "$routeChangeSuccess", function(){
            init();
        });

        function init() {
            model.state = $location.url();

            if(model.state === "/login" || model.state === "/register"){
                model.class = "navbar-fixed-top navbar-full";
            }else{
                model.class = "navbar-fixed-top";
            }
        }

        init();


        /*login functions*/
        model.login = function (username, password) {

            if (username === null || username === '' || typeof username === 'undefined') {
                model.error = 'Username required!';
                return;
            }

            if (password === null || password === '' || typeof password === 'undefined') {
                model.error = 'Password required!';
                return;
            }

            // userService
            //     .findUserByCrendentials(username, password)
            //     .then(login, errorMessage);

            userService
            //.findUserByCredentials(username, password)
                .login(username, password)
                .then(login, errorMessage);

            function errorMessage(error) {
                model.message = "Login failed. Please try again";
            }

            function login(found) {
                if(found !== null){
                    console.log("login success")
                    $location.url('/profile');
                }
                else{
                    model.message = "Username " + username + " not found, please try again";
                }
            }

            function logout() {
                userService
                    .logout()
                    .then(function () {
                        $location.url('/');
                    });
            }
        }

        /*register functions*/
        model.register = function(username,
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