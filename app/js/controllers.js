'use strict';

/* Controllers */

var smokiesHikerGuideApp = angular.module('smokiesHikerGuideApp', []);

smokiesHikerGuideApp.controller('HikerGuideCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('hikes/hikes.json').success(function(data) {
    $scope.hikes = data;
  });


}]);
