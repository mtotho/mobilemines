'use strict';

/**
 * @ngdoc service
 * @name mobileminesApp.user2
 * @description
 * # user
 * Service in the mobileminesApp.
 */
angular.module('mobileminesApp')
  .service('User', function ($cookieStore) {
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



  });
