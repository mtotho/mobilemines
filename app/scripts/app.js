'use strict';

/**
 * @ngdoc overview
 * @name mobileminesApp
 * @description
 * # mobileminesApp
 *
 * Main module of the application.
 */

angular
  .module('mobileminesApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'uiGmapgoogle-maps',
    'firebase'
  ]);

  angular.module('mobileminesApp').constant('CONFIG',{
    firebase_url:'https://fiery-torch-4462.firebaseio.com/'

  });


 angular.module('mobileminesApp').config(function ($routeProvider,$locationProvider, uiGmapGoogleMapApiProvider) {

    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
    //$locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl as vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


//helper function
angular.isUndefinedOrNull = function(val) {
  console.log(val);
    return angular.isUndefined(val) || val === null 
}