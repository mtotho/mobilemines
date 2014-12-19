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
    'uiGmapgoogle-maps'
  ])
  .config(function ($routeProvider, uiGmapGoogleMapApiProvider) {

    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });


    $routeProvider
      .when('/', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl as vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
