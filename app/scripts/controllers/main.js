'use strict';

angular.module('imreqFrontendApp')
  .controller('MainCtrl', function ($scope, $resource) {
    $scope.formData = {};
    var ImageRequest = $resource('http://160.94.51.184:1337/imagingrequest/:requestId');
    //var ImageRequest = $resource('http://127.0.0.1:1337/imagingrequest/:requestId');
    var requests = ImageRequest.query(function () {
        $scope.requests = requests;
    });
    
    $scope.gridOptions = { 
        data: 'requests',
        columnDefs: [
            {field:'id', displayName:'Request ID'},
            {field:'specimenID', displayName:'Specimen ID'},
            {field:'modality', displayName:'Imaging Type'},
            {field:'requestor', displayName:'Requestor', width:'**'},
            {field:'status', displayName:'Status', cellTemplate: '<div ng-class="{green: row.getProperty(col.field) == \'uploaded\'}"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>'},
            {field:'updatedAt', displayName:'Last Updated', width:'**'},
            {field:'delete', displayName:'Delete', cellTemplate: '<div ng-click=removeRequest(row)><span class="glyphicon glyphicon-remove-circle"></span></div>'}
        ],
        sortInfo: {fields:['updatedAt'], directions:['desc']}
    };
      
    $scope.processForm = function () {
        var newRequest = new ImageRequest($scope.formData);
        $scope.requests.push(newRequest);
        newRequest.$save();
        $scope.formData = {};
    };
      
    $scope.removeRequest = function(row) {
        var index = $scope.requests.indexOf(row.entity);
        $resource('http://160.94.51.184:1337/imagingrequest/' + row.entity.id).delete(function (response) {
            $scope.requests.splice(index, 1);
        });
    };
  });
