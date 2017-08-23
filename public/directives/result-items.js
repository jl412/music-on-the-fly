(function () {
    angular
        .module('resultItemsDirectives',[])
        .directive('resultItems', resultItems);

    function resultItems() {
        function linkFunction($scope, $element, $attrs) {
            var targetModal = $element.find(".modal");
            targetModal.on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget); // Button that triggered the modal
                var trackId = button.data('trackid');
                var trackName = button.data('trackname');
                var trackArtist = button.data('trackartist');
                // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
                // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
                var modal = $(this);
                $scope.trackId = trackId;
                $scope.trackName = trackName;
                $scope.trackArtist = trackArtist;
                // $scope.$apply(function() {
                //     modal.find('#track-id').val(trackId);
                //     modal.find('#track-name').val(trackName);
                // });
            })

        }
        return {
            templateUrl: "directives/result-items.html",
            link: linkFunction
        }
    }

    // function navbarSizeDirectives() {
    //     return {
    //         restrict: 'A'
    //     }
    // }

})();