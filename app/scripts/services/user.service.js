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





    this.isUserSet = function() {
        if(!angular.isUndefinedOrNull(userObject)){
          return true;
        }else{
          return false;
        }
        
    }

    this.getUser = function(){
        var ref = API.getRef();
        userObject = ref.getAuth();

       return userObject;
    }

    this.getUserAsync = function(callback){
        var ref = API.getRef();
      
        ref.onAuth(function(user){
          if(!angular.isUndefinedOrNull(user)){
             
              userObject= API.users.updateUser(user);;
          }
    
          callback(userObject);
        });
    }

    this.watchUserPosition = function(callback){
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function(position){
              
              //If we have a set userObject
              if(userObject){

                //set the location
                userObject.location={
                  latitude:position.coords.latitude,
                  longitude:position.coords.longitude
                } 

                //send the lcoation update to the firebase
                API.users.updateUser(userObject);

                //callback with the position and user
                callback(position, userObject);
              }

          });
        }else{
          console.log("browser does not support location ! or location denied");
        }
    }

    this.createUser = function(name){
      //firebase insert code
      //get id from firebase, set cookie
    }

    this.login = function(callback){
      var ref = API.getRef();

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
