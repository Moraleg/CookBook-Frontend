var app = angular.module('cookbook_app', []);

app.controller('mainController', ['$http', function($http) {
  // this.test = "mainController is working!";

  //backend server location
  this.url = 'http://localhost:3000';
  //empty object for user
  this.user = {};
  this.notices = [];
  this.formdata = {};



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

    // Recipe controllers

//Get recipes

    $http({
        method: 'GET',
        url: 'http://localhost:3000/recipes',
    }).then(function(response) {
            console.log(response);
            this.notices = response.data;
            console.log(this.notices);
    }.bind(this));

// function to add recipes to the data base
    this.recipeForm = function() {
        console.log("recipeForm function ...");
        console.log('Recipe Form Data: ', this.formdata);
        $http({
            method: 'POST',
            url: 'http://localhost:3000/recipes',
            data:this.formdata
        }).then(function (result) {
            console.log('Data from server: ', result);
            this.formdata = {};
        }.bind(this));
    }; //end recipe form



}]); //End mainController
