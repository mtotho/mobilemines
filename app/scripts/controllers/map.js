'use strict';

/**
 * @ngdoc function
 * @name mobileminesApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the mobileminesApp
 */
angular.module('mobileminesApp')
  .controller('MapCtrl', function ($scope,  uiGmapGoogleMapApi, uiGmapIsReady) {
 		var vm=this;

 		vm.map={
 			center:{
 				latitude:45,
 				longitude:-73
 			},
 			zoom:8,
 			control:{},
 			events:{}
 		};


		$scope.$on('$viewContentLoaded', function () {
			setMapHeight();
	    });

  });


function setMapHeight(){
  var headerheight=0;
  var windowheight=$(window).outerHeight();

  var targetheight = windowheight - headerheight;

  $(".angular-google-map-container").css('height',targetheight+'px');
}

$(window).resize(function(){
 	setMapHeight();
});