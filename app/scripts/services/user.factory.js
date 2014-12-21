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
       Ref.on("child_added", function(snapshot){

          callback(snapshot.val());
       });
    }


    // Public API here
    return {

      //This will watch changes to existing users
      getUserChangeFeed: function(callback){
        
        ref.on("child_changed", function(snapshot){
          callback(snapshot.val());
        });
      },

      //This will give each user back 1 by 1, and any additional future users added
      getUsers:function(callback){
         ref.on("child_added", function(snapshot){

            callback(snapshot.val());
         });
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
