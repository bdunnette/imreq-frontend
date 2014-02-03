'use strict';

angular.module('imreqFrontendApp')
  .controller('MainCtrl', function ($scope, $resource) {
    $scope.formData = {};
    var ImageRequest = $resource('http://160.94.51.184:1337/imagingrequest/:requestId');
    //var ImageRequest = $resource('http://127.0.0.1:1337/imagingrequest/:requestId');
    var requests = ImageRequest.query(function () {
        $scope.requests = requests;
    });
    
    $scope.gridOptions = { data: 'requests' };
      
    $scope.processForm = function () {
        var newRequest = new ImageRequest($scope.formData);
        newRequest.$save();
        $scope.formData = {};
    };
  });
