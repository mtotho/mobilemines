'use strict';

/**
 * @ngdoc service
 * @name mobileminesApp.mine.factory
 * @description
 * # mine.factory
 * Factory in the mobileminesApp.
 */
angular.module('mobileminesApp')
  .factory('mineFactory', function (CONFIG, $firebase) {
   
    var ref = new Firebase(CONFIG.firebase_url+"mines/");

    var returnDataFeed = function(Ref, callback){
       Ref.on("child_added", function(snapshot){
          callback(snapshot.val());
       });
    };

    // Public API here
    return {
      getMines: function(){
        returnDataFeed(ref, callback);
      },
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
