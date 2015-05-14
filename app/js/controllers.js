'use strict';

/* Controllers */

var smokiesHikerGuideApp = angular.module('smokiesHikerGuideApp', ['ngMaterial']);

smokiesHikerGuideApp.controller('HikerGuideCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('hikes/hikes.json').success(function(data) {
    $scope.hikes = data;
    $scope.orderProp = 'length';
    $scope.featureFilter = {};

    /*  This filter function reads the dictionary of feature filters.
        For those that have 'true', it checks if a hike has that feature.
        If it doesn't, then it fails.
        If none fail, then it succeeds.
     */
    $scope.filterByFeature = function(hike) {
      for (var feature in $scope.featureFilter) {
        if ($scope.featureFilter.hasOwnProperty(feature)) {
          if ($scope.featureFilter[feature]) {
            if (hike.goodfor.indexOf(feature) < 0) {
              return false;
            }
          }
        }
      }
      return true;
    }
  });
}]);
