'use strict';

/**
 * @ngdoc service
 * @name mobileminesApp.API
 * @description
 * # API
 * Factory in the mobileminesApp.
 */
angular.module('mobileminesApp')
  .factory('API', function ($firebase, CONFIG, userFactory, mineFactory) {
   // var firebase_url="https://fiery-torch-4462.firebaseio.com/";
  
    //var sync = $firebase(ref);

  
    // Public API here
    return {
      getRef: function () {
       
        var ref = new Firebase(CONFIG.firebase_url);
     
        return ref;
      },
      users:userFactory,
      mines:mineFactory


    };
  });
