'use strict';

/**
 * @ngdoc function
 * @name mobileminesApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the mobileminesApp
 */
angular.module('mobileminesApp')
  .controller('MapCtrl', function ($scope, $rootScope,$mdDialog, $filter,userService,$mdToast, API,uiGmapGoogleMapApi,$mdSidenav) {
 		var vm=this;

 		vm.userMarkers = [];


 		function init(){
 			vm.map={
				
				zoom:17,
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


			//watch the client position
			userService.watchUserPosition(function(position, user){
				
				//set default position if position is not supported
				if(position===null){
					$scope.$apply(function(){
						vm.map.center={
							latitude:40,
							longitude:-80
						}
						vm.map.zoom=6;

					});

					 $mdDialog.show(
				      $mdDialog.alert()
				        .title('Oops')
				        .content('404 Location Not Found')
				        .ariaLabel('No Location')
				        .ok('Womp womp')
				    
				    );

				}else{
					//set the center of the map to be the users position
					$scope.$apply(function(){
					 	vm.map.center={
					 		latitude:position.coords.latitude,
					    	longitude:position.coords.longitude
					 	}
					});

					//bind user to map
					if(!angular.isUndefinedOrNull(user)){
						bindUserToMap(user);
					}
				}

				
			});

		

			//Get each user one by 1. Bind to map. This will also be invoked if new users are added. not invoked if there is a change to existing user
			API.users.getUsers(function(user){
				if(user.hasOwnProperty("location")){		
					bindUserToMap(user);
				}
				
				$mdToast.show({
	  					template:'<md-toast>'+user.google.displayName + ' has joined</md-toast>', 
	  					position:'top right',
	  					hideDelay:4000
  				});
			});

 			//This is invoked anytime a change to any users property is detected
 			API.users.getUserChangeFeed(function(user){
 				if(user.hasOwnProperty("location")){		
					bindUserToMap(user);
				}

				$mdToast.show({
  					template:'<md-toast>'+user.google.displayName + ' has moved!</md-toast>', 
  					position:'top right',
  					hideDelay:4000
  				});
 			});

 			

 		}
 		init();	
 		

 		vm.closeMenu = function(menu) {
	    	$mdSidenav(menu).close();
	  	};

 		vm.openMenu = function(menu) {
	    	$mdSidenav(menu).toggle();
	  	};


	  	//TODO: refactor
	  	//creates a marker unique to the user.
	  	//Checks all existing markers in the array for existing marker. if found, replaces old marker with updated, otherwise pushes to array
	  	function bindUserToMap(user){
	  			
	  		//uiGmapGoogleMapApi.then(function(maps){
				var userMarker = {
		  			id:user.uid,
		  			latitude:user.location.latitude,
		  			longitude:user.location.longitude,
		  			options:{
		  				"labelAnchor":"40 81",
		  				"labelClass":"marker-labels"
		  			}
		  		}
	  	
	  			userMarker.options.title=user.google.displayName;
				
				//bug with label anchor when update		  	
	  			var labelHtml="<div>";
	  			labelHtml += "<img class='face' style='width:48px; height:48px' src='"+ user.google.cachedUserProfile.picture +"' />";
	  			labelHtml += "<p>" + user.google.displayName + "</p>";
	  			labelHtml +="</div>";


	  			userMarker.icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
	  			userMarker.options.labelContent=labelHtml;
	  				

		  		//search the array for existing user marker
		  		var markerMatchIndex = $filter('getByParam')(vm.userMarkers, "id", userMarker.id);



		  		$scope.$apply(function(){
		  			userMarker.options.labelAnchor="40 81";
	  				//No match, add user to array
	  				if(markerMatchIndex===null){
	  					vm.userMarkers.push(userMarker);
	  				
	  				}else{
	  					//overwrite existing marker
	  					vm.userMarkers[markerMatchIndex]=userMarker;
	  				}

		  		});	
  			
	  			//});
	  		//});
	  	
	  	}


	 	//set the user location right away if they authenticate. 
 		$rootScope.$on("userAuthenticatedSuccess", function(){
			var user = userService.getUser();

			if(user){

				userService.setUserLocation({
					latitude:vm.map.center.latitude,
					longitude:vm.map.center.longitude
				});
			
			}
 		});

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