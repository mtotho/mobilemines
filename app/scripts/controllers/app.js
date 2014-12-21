'use strict';

/**
 * @ngdoc function
 * @name mobileminesApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the mobileminesApp
 */
angular.module('mobileminesApp')
  .controller('AppCtrl', function ($scope, $rootScope, userService) {
   	var vm = this;

  

   	function init(){
	 

	 		$rootScope.$on('$viewContentLoaded', function(event, toState, toParams, fromState, fromParams){ 
	 			userService.checkUser(function(user){
	 		
 				vm.user=user;

	 		});

		});

	 

	 
	 
   	}
   	init();


   	vm.login = function(){
   		userService.login(function(user){
   			console.log(user);
   		
			vm.user=user;
   			window.location.reload();

   		});



   	}

   	vm.logout = function(){
   		userService.logout();
   		vm.user=null;
   	}
  	
   	
  });
