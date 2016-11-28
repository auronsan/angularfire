'use strict';


angular.module('myApp.home',['ngRoute','firebase'])
.config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/home',{
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])
.controller('HomeCtrl',['$scope', '$firebaseObject','$firebaseAuth',function($scope, $firebaseObject,$firebaseAuth){
  var ref = firebase.database().ref().child("data");
 // download the data into a local object
 var syncObject = $firebaseObject(ref);
 // synchronize the object with a three-way data binding
 // click on `index.html` above to see it used in the DOM!
 syncObject.$bindTo($scope, "data");
 var provider = new firebase.auth.GoogleAuthProvider();
 var auth = $firebaseAuth();

  // login with Facebook
  firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
}]);
