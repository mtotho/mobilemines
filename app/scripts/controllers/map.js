'use strict';

/**
 * @ngdoc function
 * @name mobileminesApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the mobileminesApp
 */
angular.module('mobileminesApp')
  .controller('MapCtrl', function ($scope, $rootScope, userService, API,$mdSidenav) {
 		var vm=this;

 		vm.userMarkers = [];


 		function init(){
 			vm.map={
				
				zoom:19,
	 			options:{
	 				panControl:false,
	 				streetViewControl:false,
	 				zoomControl:false
	 			},
	 			control:{},
	 			markersControl:{},
	 			userMarkerEvents:{},
	 			events:{}
			};

			//Get list of users. This is updated anytime user is added or updated
			API.user.getUsers(function(users){
							
				vm.userMarkers = new Array();
				angular.forEach(users,function(value,key){
					if(value.hasOwnProperty("location")){
						//console.log(key);
					
						bindUserToMap(key,value);
					}
				
				});

			});
 			

 			//watch the client position
			watchPosition();

 		}
 		init();	
 		

 		vm.closeMenu = function(menu) {
	    	$mdSidenav(menu).close();
	  	};

 		vm.openMenu = function(menu) {
	    	$mdSidenav(menu).toggle();
	  	};

	  	function bindUserToMap(uid,user){
	  		
	  		var userMarker = {
	  			id:uid,
	  			latitude:user.location.latitude,
	  			longitude:user.location.longitude,
	  		}
	  		
	  		if(user.hasOwnProperty("cachedUserProfile")){
	  			
	  			userMarker.icon=user.cachedUserProfile.picture;
	  		}
	  		$scope.$apply(function(){
	  				vm.userMarkers.push(userMarker);
	  			});
	  	
	  		//console.log(user);
	  	}


	  	function watchPosition(){
  		 	if (navigator.geolocation) {
   				navigator.geolocation.watchPosition(setCurrentPosition);
		    } else {
		        x.innerHTML = "Geolocation is not supported by this browser.";
		    }
	  	}


	  	function setCurrentPosition(position){
			
	  		console.log("Set Position");
	  		console.log(position);

			$scope.$apply(function(){
			 	vm.map.center={
			 		latitude:position.coords.latitude,
			    	longitude:position.coords.longitude
			 	}
			 	
			});

			var user = userService.getUser();

			if(user){

				API.user.setUserLocation(user.uid, {
						latitude:position.coords.latitude, 
						longitude:position.coords.longitude
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