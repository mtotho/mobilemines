'use strict';

/**
 * @ngdoc service
 * @name mobileminesApp.user2
 * @description
 * # user
 * Service in the mobileminesApp.
 */
angular.module('mobileminesApp')
  .service('userService', function ($cookieStore, $firebaseAuth, API) {
    // AngularJS will instantiate a singleton by calling "new" on this function
  // ...
    var userCookieName = "mobilemines-user";

    var userCookieObj = $cookieStore.get(userCookieName);
    var userObject;


    var sampleCookieObjLiteral={
      handle:"Brown Mike",
      id:"asd113r1d113141"
    }




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
     
        ref.onAuth(callback);
    }

    this.createUser = function(name){
      //firebase insert code
      //get id from firebase, set cookie
    }

    this.login = function(callback){
      var ref = API.getRef();

      var auth = $firebaseAuth(ref);  
      auth.$authWithOAuthRedirect("google").then(function(authData) {
        userObject = authData;


        //update the firebase entry for the user 
        API.users.updateUser(userObject);
        

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
