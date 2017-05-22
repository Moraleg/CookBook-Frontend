// var app = angular.module('cookbook_app', []);
//
// app.controller('mainController', ['$http', function($http) {
//
//   // this.test = "mainController is working!";
//   //backend server location
//   this.url = 'http://localhost:3000' ||
//    'https://hungry-for-more.herokuapp.com';
//   //empty object for user
//   this.user = {};
//   this.notices = [];
//   this.formdata = {};
//   this.updatedata = {};
//   //changed this.recipe from array to object
//   this.recipe = {};
//   //this.recipes = [];
//   this.getrecipe = [];
//   // this.recipeId = ();
//
// //========================================
// //            CREATE USER
// //========================================
//
//   //create a user
//   this.createAccount = function(user) {
//     console.log(user);
//
//     $http({
//        method: 'POST',
//        url: this.url + '/users',
//        data: {
//          user: {
//           username: user.username,
//           password: user.password
//           }
//        },
//      }).then(function(response) {//sucess
//        console.log(response);
//        this.user = response.data.user;
//      }.bind(this));
//   };
//
//   //========================================
//   //            USER LOGIN
//   //========================================
//
//   //login function
//   this.login = function(user) {
//     console.log(user);
//
//     $http({
//        method: 'POST',
//        url: this.url + '/users/login',
//        data: {
//          user: {
//           username: user.username,
//           password: user.password
//           }
//        },
//      }).then(function(response) {//sucess
//        console.log(response);
//        this.user = response.data.user;
//        localStorage.setItem('token', JSON.stringify(response.data.token));
//      }.bind(this));
//   };
//
//
//   //  =================================================
//   //                 USER UPDATE
//   // =================================================
//
//   // this.updateUser = function(user, id) {
//   //   $http({
//   //     method: 'PUT',
//   //     url: this.url + '/users/id',
//   //     data: user,
//   //     headers: {
//   //       Authorization: JSON.parse(localStorage.getItem('token'))
//   //     }
//   //   }).then(function(response) {
//   //     console.log(reponse);
//   //
//   //   }.bind(this));
//   // };//End updateUser()
//
//   //  =================================================
//   //                 USER DELETE
//   // =================================================
//   //
//   // this.deleteAccount = function(id) {
//   //   console.log('delete clicked');
//   //   this.user_id = id;
//   //   $http({
//   //     method: 'DELETE',
//   //     url: this.url + '/users/' + id
//   //   }).then(function(reponse) {
//   //     console.log(response);
//   //     this.user = response.data;
//   //     this.logout();
//   //   }.bind(this));
//   // };
//
//
//   //========================================
//   //            USER LOGOUT
//   //========================================
//   //logout function
//   this.logout = function() {
//     localStorage.clear('token');
//     location.reload();
//   };//End logout()
//
//   //see content
//   // this.getUsers = function() {
//   //   $http({
//   //     method: 'GET',
//   //     url: this.url + '/users',
//   //     headers: {
//   //       Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
//   //     }
//   //   }).then(function(response) {
//   //     console.log(response);
//   //     if (response.data.status == 401) {
//   //       this.error = "Unauthorized";
//   //     } else {
//   //       this.users = response.data;
//   //     }
//   //   }.bind(this))
//   // }; //End getUsers





// //==============EVENT LISTENERS=========================
//     //Event listener to close sign up modal
//   $('.close').on('click', function () {
//     $('#signup-modal').css('display', 'none');
//   });
//
//   //Event listener to close login modal
//   $('.close').on('click', function() {
//     $('#login-modal').css('display', 'none');
//   });
//
//   //Event listener to close edit-account modal
//   $('.close').on('click', function() {
//     $('#edit-user-modal').css('display', 'none');
//   });
//
//   //Event listener to open sign-up modal
//   $('.signup').on('click', function () {
//     $('#signup-modal').css('display', 'block');
//   });
//
//   //Event listener to open login modal
//   $('.login').on('click', function () {
//     $('#login-modal').css('display', 'block');
//   });
//
//   //Event listener to open edit-accout modal
//   $('.edit-account').on('click', function () {
//     $('#edit-user-modal').css('display', 'block');
//   });
//
//
// }]); //End mainController
