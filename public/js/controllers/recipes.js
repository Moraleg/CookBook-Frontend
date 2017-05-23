var app = angular.module('cookbook_app', []);

app.controller('mainController', ['$http', function($http) {

  // this.test = "mainController is working!";
  //backend server location
  this.url = 'https://hungry-for-more.herokuapp.com' || 'http://localhost:3000';


  //empty object for user
  this.user = {};
  this.notices = [];
  this.formdata = {};
  this.updatedata = {};
  //changed this.recipe from array to object
  this.recipe = {};
  //this.recipes = [];
  this.getrecipe = [];
  // this.recipeId = ();
  this.token = false;

//========================================
//            CREATE USER
//========================================

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

  //========================================
  //            USER LOGIN
  //========================================

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
        if (response.data.status == 401) {
          this.error = "Please try again";
        } else {
         this.user = response.data.user;
         localStorage.setItem('token', JSON.stringify(response.data.token));
         this.token = true;
        }
     }.bind(this));
  };


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


  //========================================
  //            USER LOGOUT
  //========================================
  //logout function
  this.logout = function() {
    localStorage.clear('token');
    location.reload();
  };//End logout()

  //see content
  // this.getUsers = function() {
  //   $http({
  //     method: 'GET',
  //     url: this.url + '/users',
  //     headers: {
  //       Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
  //     }
  //   }).then(function(response) {
  //     console.log(response);
  //     if (response.data.status == 401) {
  //       this.error = "Unauthorized";
  //     } else {
  //       this.users = response.data;
  //     }
  //   }.bind(this))
  // }; //End getUsers


// Recipe controllers

//========================================
//            RECIPE INDEX
//========================================

  //Get all recipes
  this.getRecipes = function() {
    $http({
      method: 'GET',
      url: this.url + '/recipes',
    }).then(function(response) {
      console.log(response);
      this.recipes = response.data;
      //console.log(this.recipes);
    }.bind(this));
  };
  this.getRecipes();

//========================================
//            RECIPE SHOW
//========================================

  //Get one Recipe
  // this.getOneRecipe = function(id){
  //   this.recipe_id = id;
  //   console.log("get one recipe ", id);
  //   $http({
  //     method: 'GET',
  //     url: this.url + '/recipes/' + id
  //   }).then(function(result){
  //     console.log(result);
  //     this.recipe = result.data;
  //     console.log('==============');
  //     console.log(this.recipe);
  //   });
  // };

  //========================================
  //            RECIPE CREATE
  //========================================
  // function to add recipes to the data base
  this.recipeForm = function() {
    console.log("recipeForm function ...");
    console.log('Recipe Form Data: ', this.formdata);
    $http({
      method: 'POST',
      url: this.url + '/recipes',
      data:this.formdata,
      headers: {
        Authorization: JSON.parse(localStorage.getItem('token'))
      }
    }).then(function (result) {
      console.log('Data from server: ', result);
      this.formdata = {};
    }.bind(this));
  }; //end recipe form

  //========================================
  //            RECIPE EDIT
  //========================================

  this.updateRecipe = function(id) {
    console.log('This is the update route');
    console.log('Update Form Data: ',this.updatedata);
    $http({
      method: 'PUT',
      url: this.url + '/recipes/:id',
      data: this.updatedata,
      headers: {
        Authorization: JSON.parse(localStorage.getItem('token'))
      }
    }).then(function (result) {
      console.log('Update data: ', result);
      this.updatedata = {};
    }.bind(this));
  }; //end update data

  //========================================
  //            RECIPE DELETE
  //========================================

  this.deleteRecipe = function(id) {
    console.log('delete clicked');
    console.log(id);
    $http({
      method: 'DELETE',
      url: this.url + '/recipes/' + id,
      headers: {
        Authorization: JSON.parse(localStorage.getItem('token'))
      }
    }).then(function(reponse) {
      console.log(response);
      this.notices = response.data;
    }.bind(this));
  };


  //==============EVENT LISTENERS=========================

    //Event listener to open/close sign-up modal
    $('.signup').on('click', function () {
      $('#signup-modal').css('display', 'block');
    });

    $('.close').on('click', function () {
      $('#signup-modal').css('display', 'none');
    });

    //Event listener to open/close login modal
    $('.login').on('click', function () {
      $('#login-modal').css('display', 'block');
    });

    $('.close').on('click', function() {
      $('#login-modal').css('display', 'none');
    });


    //Event listener to open/close edit-accout modal
    $('.edit-account').on('click', function () {
      $('#edit-user-modal').css('display', 'block');
    });
    $('.close').on('click', function() {
      $('#edit-user-modal').css('display', 'none');
    });

    // //Event listener to open/close recipe-show modal
    // $('.recipes').on('click', function () {
    //   $('#recipe-show').css('display', 'block');
    // });
    // $('.close').on('click', function() {
    //   $('#recipe-show').css('display', 'none');
    // });

    //Event listener to open/close edit-recipe modal
    $('.open-edit').on('click', function () {
      $('#edit-recipe').css('display', 'block');
    });
    $('.close').on('click', function() {
      $('#edit-recipe').css('display', 'none');
    });

    //Event listener to open/close create-recipe modal
    $('.create').on('click', function () {
      $('#create-recipe').css('display', 'block');
    });
    $('.close').on('click', function() {
      $('#create-recipe').css('display', 'none');
    });

  }]); //End mainController
