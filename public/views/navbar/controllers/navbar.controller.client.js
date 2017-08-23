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

            userService
                .checkLoggedIn()
                .then(function (currentUser) {
                    if (currentUser === '0') {
                        $rootScope.currentUser = null;
                    }else{
                        $rootScope.currentUser = currentUser;
                    }
                });
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
                    $location.url("/user/" + found._id);
                    init();
                }
                else{
                    model.message = "Username " + username + " not found, please try again";
                }
            }

        }

        /*register functions*/
        model.register = function(username,
                                  password,
                                  password2) {

            if (username === null || username === '' || typeof username === 'undefined') {
                model.error = 'Username required!';
                return;
            }

            if (password === null || password === '' || typeof password === 'undefined') {
                model.error = 'Password required!';
                return;
            }

            if (password2 === null || password2 === '' || typeof password2 === 'undefined') {
                model.error = 'Verify password required!';
                return;
            }

            if(password !== password2){
                model.error = "Password must match";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(function (repsonse) {

                    console.log(repsonse);

                    if(repsonse === "0"){
                        var user = {
                            username:username,
                            password:password,

                        };

                        userService
                            .register(user)
                            .then(function (user) {
                                $location.url("/user/" + user._id);
                            })

                    } else{
                        model.error = "Username is not available";
                    }

                })

        }

        model.logout = function() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                    init();
                });
        }

    }

})();