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

   		//It appears that the block below will be call automatically any time the users authentication status changes
	 	userService.getUserAsync(function(user){
	 				
	 				console.log("getUserAsync")
	 				console.log(user);
 					vm.user=user;

 		});
   		
	 		$rootScope.$on('$viewContentLoaded', function(event, toState, toParams, fromState, fromParams){ 


		});

	 

	 
	 
   	}
   	init();


   	vm.login = function(){
   		userService.login(function(user){

   			//oauth redirect reloads the page getUserAsync above will handle getting users after refresh
   			//if we use oauth popout (not sure which is better) we might need to do work here

   		});



   	}

   	vm.logout = function(){
   		userService.logout();
   		vm.user=null;
   	}
  	
   	
  });
