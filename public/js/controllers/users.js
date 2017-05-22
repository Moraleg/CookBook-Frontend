var app = angular.module('cookbook_app', []);

app.controller('mainController', ['$http', '$scope', function($http, $scope) {
  // this.test = "mainController is working!";

  //backend server location
  this.url = 'http://localhost:3000';
  //empty object for user
  this.user = {};

// =================================================
//                    USER LOGIN
// =================================================
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
  }; //End getUsers

    //  =================================================
    //                    USER LOGOUT
    // =================================================
    //logout function
    this.logout = function() {
      localStorage.clear('token');
      location.reload();
    };//End logout()

  //  =================================================
  //                 USER UPDATE
  // =================================================

  // this.updateUser = function(user, id) {
  //   $http({
  //     method: 'PUT',
  //     url: this.url + '/users/id',
  //     data: user,
  //     headers: {
  //       Authorization: JSON.parse(localStorage.getItem('token'))
  //     }
  //   }).then(function(response) {
  //     console.log(reponse);
  //
  //   }.bind(this));
  // };//End updateUser()

  //  =================================================
  //                 USER DELETE
  // =================================================
  //
  // this.deleteAccount = function(id) {
  //   console.log('delete clicked');
  //   this.user_id = id;
  //   $http({
  //     method: 'DELETE',
  //     url: this.url + '/users/' + id
  //   }).then(function(reponse) {
  //     console.log(response);
  //     this.user = response.data;
  //     this.logout();
  //   }.bind(this));
  // };



  //  =================================================
  //                 RECIPE DELETE
  // =================================================

  this.deleteRecipe = function(id) {
    console.log('delete clicked');
    $http({
      method: 'DELETE',
      url: this.url + '/recipes/' + id,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(reponse) {
      console.log(response);
      this.notices = response.data;
    }.bind(this));
  };

  //  =================================================
  //                 RECIPE SHOW
  // =================================================

  this.showRecipe = function() {
    $http({
      method: 'GET',
      url: this.url + '/recipes/' + id,
    }).then(function(response) {
      this.getrecipe = response.data;
    });
  };//End showRecipe

}]); //End mainController
