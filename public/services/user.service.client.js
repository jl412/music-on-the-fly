(function () {
    angular
        .module("MOTF")
        .factory("userService", userService);

    function userService($http) {

        var api = {
            login: login,
            logout: logout,
            register: register,
            checkLoggedIn: checkLoggedIn,
            findUserById:findUserById,
            findUserByUsername:findUserByUsername,
            findUserByCrendentials:findUserByCrendentials,
            updateUser:updateUser,
            deleteUser:deleteUser

        };

        return api;

        function login(username, password) {
            var url = "/api/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(user) {
            var url = "/api/register";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkLoggedIn() {
            var url = "/api/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(uid) {
            var url = '/api/server/user/' + uid;
            return $http.get(url)
                .then(function (response ) {
                    return response.data;
                })
        }

        function findUserByUsername(username) {
            var url = "/api/server/user?username=" + username ;
            return $http.get(url)
                .then(function (response ) {
                    return response.data;
                })
        }

        function findUserByCrendentials(username, password) {
            var url = "/api/server/user?username=" + username + '&password=' + password;
            return $http.get(url)
                .then(function (response ) {
                    return response.data;
                });
        }
        
        function updateUser(uid, newInfo) {
            var url = '/api/server/user/' + uid;
            return $http.put(url, newInfo)
                .then(function (response) {
                    return response.data;
                })
        }
        
        function deleteUser(uid) {
            var url = '/api/server/user/' + uid;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();