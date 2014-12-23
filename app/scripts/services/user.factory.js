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
     

    // Public API here. Attempt to use these through a service layer which can handle more businessy logic
    return {

        //This will watch changes to existing users. only the relevant user returned each callback
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

        //updateUser - call this to set or update user. Acts as the datamodel of what goes into the user. add properties here or refactor
        updateUser: function(userObject){
            var user= {
               uid:userObject.uid,
               google:userObject.google,
               location:{}
            };
            
            if(userObject.hasOwnProperty('location'))
                user.location=userObject.location;

             ref.child(user.uid).update(user);

             return user;
        },  
        
        getUserById: function (uid, callback) {
            var userRef = ref.child(uid);

            userRef.on("child_added", function(snapshot){

                callback(snapshot.val());
            });
        }

    };
  });
