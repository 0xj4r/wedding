'use strict';

// wedding controller
angular.module('app', [])
.controller('WeddingCtrl',  function($scope, $http) {
  $scope.user = {}; 
  $scope.userFound = false; 
  $scope.guests = []; 
  $scope.testFamily =  []; 
  $scope.rsvpSuccess = false; 

  var serverAddress = 'http://127.0.0.1:8080'; //'http://wedding-snagaflight.rhcloud.com';
  
  $scope.submitRsvp = function(family) {
    $http({
        url: serverAddress + '/updateGuests',      
        method: 'POST', 
        data: {
          guests: family
        }
      }).success(function(response) { 
        console.log('success: ' + response.message);
        $scope.rsvpSuccess = true; 
      }).error(function(response) {
        console.log('error ' + response.message);
        alert('There was an error handling your rsvp, please try again'); 
        $scope.user.address = ''; 
        $scope.userFound = false; 
      }) ;
  }; 
  
  $scope.findFamily = function(user) {
      $http({
        url: serverAddress + '/guests', 
        method: 'GET', 
        params: user
      }).success(function(data) {
        if (data.length > 0) {
        $scope.testFamily = data; 
        $scope.userFound = true; 
        }
        else {
          $scope.userFound = false; 
          alert('Could not locate your party, please try again');
          $scope.user.address = ''; 
        }
      }).error(function(data) {
        $scope.userFound = false; 
        alert('There was a problem handling your rsvp, please try again.'); 
        $scope.user.address = ''; 
      });
  }; 
  
  
  
}); 

