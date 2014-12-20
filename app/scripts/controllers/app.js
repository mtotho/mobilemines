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

  

   	function init(){
	 	vm.user =

	 	vm.user = userService.checkUser();
	 	console.log(vm.user);
   	}
   	init();


   	vm.login = function(){
   		userService.login(function(user){
   			console.log(user);
   		
			vm.user=user;
   			
   		});



   	}

   	vm.logout = function(){
   		userService.logout();
   		vm.user=null;
   	}
  	
   	
  });
