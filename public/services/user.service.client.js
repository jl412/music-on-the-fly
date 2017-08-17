(function () {
    angular
        .module("WAM")
        .factory("userService", userService);

    function userService($http) {

        var api = {
            createUser:createUser,
            findUserById:findUserById,
            findUserByUsername:findUserByUsername,
            findUserByCrendentials:findUserByCrendentials,
            updateUser:updateUser,
            deleteUser:deleteUser

        };

        return api;
        
        function createUser(user) {
            console.log("create user");
            var url = '/api/server/user'
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                })
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