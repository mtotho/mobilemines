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

   	vm.user = {isSet:false};


   	vm.btnLogin = function(){
   		userService.login(function(snapshot){
   			console.log(snapshot.val());

   			$scope.$apply(function(){
   				vm.user=snapshot.val();
   			});
   			
   		});



   	}
  	
   	
  });
