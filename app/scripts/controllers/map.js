'use strict';

/**
 * @ngdoc function
 * @name mobileminesApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the mobileminesApp
 */
angular.module('mobileminesApp')
  .controller('MapCtrl', function ($scope, User, $mdSidenav) {
 		var vm=this;

 		


 		function init(){
 			vm.map={
				center:{
					latitude:45,
					longitude:-73
				},
				zoom:20,
	 			options:{
	 				panControl:false,
	 				streetViewControl:false,
	 				zoomControl:false
	 			},
	 			control:{},
	 			events:{}
			};


			setCurrentPosition();

 		}
 		init();	


 		

 		vm.closeMenu = function(menu) {
	    	$mdSidenav(menu).close();
	  	};

 		vm.openMenu = function(menu) {
	    	$mdSidenav(menu).toggle();
	  	};


	  	function setCurrentPosition(){
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position){
					$scope.$apply(function(){
					 	vm.map.center={
					 		latitude:position.coords.latitude,
					    	longitude:position.coords.longitude
					 	}
					});
				});
			}
	 	}


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