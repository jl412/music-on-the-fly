(function () {
    angular
        .module('MOTF')
        .config(configuration);
    
    function configuration($routeProvider) {

        $routeProvider

            .when( '/', {
                templateUrl: 'views/main/templates/main.view.client.html',
                controller: 'mainController',
                controllerAs: 'model'
            })
            .when('/login',  {
                // templateUrl: 'views/main/templates/main.view.client.html',
                // controller: 'mainController',
                // controllerAs: 'model',
                resolve: {
                    currentUser: preventDoublelogin
                }
            })
            .when('/register', {
                // templateUrl:'views/main/templates/main.view.client.html',
                // // controller:"mainController",
                // // controllerAs:"model"
            })
            .when('/user/:uid', {
                templateUrl:'views/user/templates/profile.view.client.html',
                controller:"profileController",
                controllerAs:"model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/result', {
                templateUrl:'views/main/templates/result.view.client.html',
                controller:"resultController",
                controllerAs:"model",
                resolve: {
                    currentUser: checkCurrentUser
                }
            })


    }

    function checkLoggedIn($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else{
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function preventDoublelogin($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.resolve(currentUser);
                } else{
                    deferred.reject();
                }
            });
        return deferred.promise;
    }

    function checkCurrentUser($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }
}) ();