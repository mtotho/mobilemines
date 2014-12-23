'use strict';

/**
 * @ngdoc service
 * @name mobileminesApp.user2
 * @description
 * # user
 * Service in the mobileminesApp.
 */
angular.module('mobileminesApp')
  .service('userService', function ($firebaseAuth, API) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var userObject;

    var instance=this;


    
    this.isUserSet = function() {
        if(!angular.isUndefinedOrNull(userObject)){
          return true;
        }else{
          return false;
        }
        
    }

    //Get the user syncronously. Not sure how this works but i would imagine it just attempts to read a potentially stale cookie.
    //this will check for a previously set userObject before attempting to get one from the auth service
    this.getUser = function(){
        var ref = API.getRef();
       
        if(userObject){
          return userObject;
        }else{
          userObject = ref.getAuth();
          return userObject;
        }
       
    }

    //Get the user as a callback. Probably more reliable then getUser. Not syncronous
    this.getUserAsync = function(callback){
        var ref = API.getRef();
      
        ref.onAuth(function(user){
          if(!angular.isUndefinedOrNull(user)){
             
              userObject= API.users.updateUser(user);;
          }
    
          callback(userObject);
        });
    }

    //update the users location in the firebase
    this.setUserLocation = function(position){
        if(userObject){
            userObject.location={
              latitude:position.latitude,
              longitude:position.longitude
            };

            //send the lcoation update to the firebase
            API.users.updateUser(userObject);
        }
    }

    //set a watcher on the users position. Updates the users position. returns positon and user
    this.watchUserPosition = function(callback){
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function(position){
              
      
              instance.setUserLocation({
                latitude:position.coords.latitude,
                longitude:position.coords.longitude
              });

              //callback with the position and user
              callback(position, userObject);
       
          });
        }else{
          callback(null,null);
          console.log("browser does not support location ! or location denied");
        }
    }

    this.createUser = function(name){
      //firebase insert code
      //get id from firebase, set cookie
    }

    //kick off login. on success updates user entry in database, calls back with user
    this.login = function(callback){
      var ref = API.getRef();

      //There are 2 options.. auth with redirect, auth with popup. 
      //auth with popup doesnt work on all mobiles and can be blocked by popup.. but redirect refreshes the page 
      //which is okay since we are refresh safe. but the callback is essentially not called it appears
      var auth = $firebaseAuth(ref);  
      auth.$authWithOAuthRedirect("google").then(function(authData) {

        //update the firebase entry for the user 
        userObject=API.users.updateUser(authData);
        

        callback(userObject);

        
       
      }).catch(function(error) {
        return false;
        console.error("Authentication failed: ", error);
      });
    }

    this.logout = function(){
      var ref = API.getRef();

      ref.unauth();
    }

  });
