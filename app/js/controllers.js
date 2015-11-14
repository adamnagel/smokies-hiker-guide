'use strict';

/* Controllers */

var smokiesHikerGuideApp = angular.module('smokiesHikerGuideApp', ['ngMaterial']);

smokiesHikerGuideApp.controller('HikerGuideCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('hikes/hikes.json').success(function (data) {
        $scope.hikes = data;
        $scope.orderProp = 'length';
        $scope.filters = {
            goodfor: {
                Backpacking: false,
                Dayhiking: false,
                Horses: false
            },
            features: {
                Summit: false,
                Ridgeline: false,
                Stream: false,
                Vistas: false,
                Swimming: false
            },
            difficulty: {
                minimum: 1,
                maximum: 5
            },
            length: {
                minimum: 1.0,
                maximum: 30.0
            }
        };

        /*  This filter function reads the dictionary of feature filters.
         For those that have 'true', it checks if a hike has that feature.
         If it doesn't, then it fails.
         If none fail, then it succeeds.
         */
        $scope.filterHikes = function (hike) {

            for (var goodfor in $scope.filters.goodfor) {
                if ($scope.filters.goodfor.hasOwnProperty(goodfor)) {
                    if ($scope.filters.goodfor[goodfor]) {
                        if (hike.goodfor == undefined ||
                            hike.goodfor.indexOf(goodfor) < 0) {
                            return false;
                        }
                    }
                }
            }

            for (var feature in $scope.filters.features) {
                if ($scope.filters.features.hasOwnProperty(feature)) {
                    if ($scope.filters.features[feature]) {
                        if (hike.features == undefined ||
                            hike.features.indexOf(feature) < 0) {
                            return false;
                        }
                    }
                }
            }

            if (hike.difficulty > $scope.filters.difficulty.maximum ||
                hike.difficulty < $scope.filters.difficulty.minimum) {
                return false;
            }

            if (hike.length > $scope.filters.length.maximum ||
                hike.length < $scope.filters.length.minimum) {
                return false;
            }

            return true;
        }
    });
}]);
