'use strict';

/**
 * @ngdoc service
 * @name mobileminesApp.userFactory
 * @description
 * # userFactory
 * Factory in the mobileminesApp.
 */
angular.module('mobileminesApp')
  .factory('userFactory', function ($firebase, API) {
     
    
    



    // Public API here
    return {
      getUserById: function (uid, callback) {
        var ref = API.getRef().child("users").child(uid);
    
      
        ref.on("value", callback);
       
      },

      //update the firebase user data
      updateUser: function(googleObject){
        var ref = API.getRef().child("users");

        var user={
          uid:googleObject.uid,
          displayName:googleObject.google.displayName,
          cachedUserProfile:googleObject.google.cachedUserProfile
        };

         ref.child(user.uid).update(user);
      }
    };
  });
