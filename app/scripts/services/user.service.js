'use strict';

/**
 * @ngdoc service
 * @name mobileminesApp.user2
 * @description
 * # user
 * Service in the mobileminesApp.
 */
angular.module('mobileminesApp')
  .service('userService', function ($cookieStore, $firebaseAuth, userFactory) {
    // AngularJS will instantiate a singleton by calling "new" on this function
  // ...
    var userCookieName = "mobilemines-user";

    var userCookieObj = $cookieStore.get(userCookieName);

    var sampleCookieObjLiteral={
      handle:"Brown Mike",
      id:"asd113r1d113141"
    }




    this.isUserSet = function() {
        if(!angular.isUndefinedOrNull(userCookieObj)){
          return true;
        }else{
          return false;
        }
        
    }

    this.checkUser = function(){
        //maybe compare cookie hash id to

    }

    this.createUser = function(name){
      //firebase insert code
      //get id from firebase, set cookie
    }

    this.login = function(){
      var ref = new Firebase("https://fiery-torch-4462.firebaseio.com/");

      var auth = $firebaseAuth(ref);
      auth.$authWithOAuthPopup("google").then(function(authData) {
        //console.log(authData);

      //update the firebase entry for the user 
      userFactory.updateUser(authData);
      console.log(userFactory.getUserById(authData.uid));


        console.log("Logged in as:", authData.uid);
      }).catch(function(error) {
        console.error("Authentication failed: ", error);
      });
    }



  });
