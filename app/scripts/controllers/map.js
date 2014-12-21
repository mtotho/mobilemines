'use strict';

/**
 * @ngdoc function
 * @name mobileminesApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the mobileminesApp
 */
angular.module('mobileminesApp')
  .controller('MapCtrl', function ($scope, $rootScope, $filter,userService, uiGmapGoogleMapApi,API,$mdSidenav) {
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

			//Get each user one by 1. Bind to map. This will also be invoked if new users are added. not invoked if there is a change to existing user
			API.users.getUsers(function(user){
				console.log("==New User Detected: " + user.uid);

				if(user.hasOwnProperty("location")){		
					bindUserToMap(user);
				}
	
			});

 			//This is invoked anytime a change to any users property is detected
 			API.users.getUserChangeFeed(function(user){
				console.log("==User Change Detected: " + user.uid);
 				if(user.hasOwnProperty("location")){		
					bindUserToMap(user);
				}
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

	  	function bindUserToMap(user){
	  		
	  		uiGmapGoogleMapApi.then(function(maps){
				var userMarker = {
		  			id:user.uid,
		  			latitude:user.location.latitude,
		  			longitude:user.location.longitude,
		  			options:{
		  				title:"No Name"
		  			}
		  		}
		  	
		  		if(user.hasOwnProperty("google")){
		  			console.log(user);
		  			userMarker.options.title=user.google.displayName;
		  			//userMarker.icon="";


		  		}

		  		//search the array for existing user marker
		  		var markerMatchIndex = $filter('getByParam')(vm.userMarkers, "id", userMarker.id);
//	$scope.$apply(function(){
		  				
  				//No match, add user to array
  				if(markerMatchIndex===null){
  					vm.userMarkers.push(userMarker);
  				
  				}else{
  					//overwrite existing marker
  					vm.userMarkers[markerMatchIndex]=userMarker;
  				}
	  			//});

	  		});
	  	
	  	
	  	}


	  	function watchPosition(){
  		 	if (navigator.geolocation) {
   				navigator.geolocation.watchPosition(setCurrentPosition);
		    } else {
		        x.innerHTML = "Geolocation is not supported by this browser.";
		    }
	  	}


	  	function setCurrentPosition(position){
			
	
			$scope.$apply(function(){
			 	vm.map.center={
			 		latitude:position.coords.latitude,
			    	longitude:position.coords.longitude
			 	}
			 	
			});

			var user = userService.getUser();

			if(user){

				API.users.setUserLocation(user.uid, {
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