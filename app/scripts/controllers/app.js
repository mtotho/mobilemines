'use strict';

/**
 * @ngdoc function
 * @name mobileminesApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the mobileminesApp
 */
angular.module('mobileminesApp')
  .controller('AppCtrl', function ($scope, userService) {
   	var vm = this;


   	vm.btnLogin = function(){
   		userService.login();
   		
   	}
  	
   	
  });
