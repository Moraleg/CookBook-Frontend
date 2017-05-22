var app = angular.module('cookbook_app', []);

app.controller('mainController', ['$http', function($http) {
  // this.test = "mainController is working!";

  //this.url = 'http://hungry-for-more.herokuapp.com';
  this.user = {};//empty object for user
  this.url = 'http://localhost:3000';



  //create a user
  this.createAccount = function(user) {
    console.log(user);

    $http({
       method: 'POST',
       url: this.url + '/users',
       data: {
         user: {
          username: user.username,
          password: user.password
          }
       },
     }).then(function(response) {//sucess
       console.log(response);
       this.user = response.data.user;
     }.bind(this));
  };


  //login function
  this.login = function(user) {
    console.log(user);

    $http({
       method: 'POST',
       url: this.url + '/users/login',
       data: {
         user: {
          username: user.username,
          password: user.password
          }
       },
     }).then(function(response) {//sucess
       console.log(response);
       this.user = response.data.user;
       localStorage.setItem('token', JSON.stringify(response.data.token));
     }.bind(this));
  };

  //see content
  this.getUsers = function() {
    $http({
      method: 'GET',
      url: this.url + '/users',
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      }
    }).then(function(response) {
      console.log(response);
      if (response.data.status == 401) {
        this.error = "Unauthorized";
      } else {
        this.users = response.data;
      }
    }.bind(this));

    //logout function
    this.logout = function() {
      localStorage.clear('token');
      location.reload();
    };//End logout()


  }; //End getUsers




}]); //End mainController
