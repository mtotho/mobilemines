'use strict';

/**
 * @ngdoc service
 * @name mobileminesApp.userFactory
 * @description
 * # userFactory
 * Factory in the mobileminesApp.
 */
angular.module('mobileminesApp')
  .factory('userFactory', function ($firebase, CONFIG) {
    
    var ref = new Firebase(CONFIG.firebase_url+"users/");
     


    var returnDataFeed = function(Ref, callback){
       Ref.on("value", function(snapshot){
          callback(snapshot.val());
       });
    }


    // Public API here
    return {

      getUsers:function(callback){

        returnDataFeed(ref, callback);

      },

      setUserLocation: function(uid, location){

        var user={
            location:{
              latitude:location.latitude,
              longitude:location.longitude
            }
        };

        console.log("updating user location");
         ref.child(uid).update(user);

      },  

      getUserById: function (uid, callback) {
        var userRef = ref.child(uid);

        returnDataFeed(userRef,callback);
      },

      //update the firebase user data
      updateUser: function(googleObject){
    

        var user={
          uid:googleObject.uid,
          google:googleObject.google
        };

        ref.child(user.uid).update(user);
      }
    };
  });
