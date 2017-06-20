var app = angular.module('cookbook_app', []);


  app.controller("mainController", ["$http", "$scope", function($http, $scope) {

    this.message = "the app.js file is attached!";


    //set variables for usage in functions
    this.url = "https://hungry-for-more.herokuapp.com" ||
    "http://localhost:3000";

    // empty user object to get form data
    this.user = {};
    //form data for recipes
    this.recipeFormdData = {};
    //recipe empty object
    this.recipe = {};

    //toggle to change views when logged in versus logged out
    this.token = false;
    this.index = false;
    //toggle to change views from banner to index
    //this.homeToIndex = false;
    //toggle changes the show block to be visible
    this.seeRecipe = false;
    this.editable = false;

    //===========CREATE USER============//

    this.createAccount = function(user) {
      //console.log(user);
      $http({
        method: "POST",
        url: this.url + "/users",
        data: {
          user: {
            username: user.username,
            password: user.password
          }
        },
      }).then(function(response) {
        //console.log(response);
        if (response.status == 401) {
          this.error = "Please try again, the username may be taken or you have not filled these fields.";
        } else {
          this.user = response.data.user;
           $('#signup-modal').hide();
        }
      }.bind(this));
    };


    //==========LOGIN USER==========//

    this.login = function(user) {
      //console.log(user);
      $http({
        method: "POST",
        url: this.url + "/users/login",
        data: {
          user: {
            username: user.username,
            password: user.password
          }
        },
      }).then(function(response) {
        //console.log(response);
        if (response.data.status == 401) {
          // this is for if the user doesn't exist or if they have entered the wrong password or username or have left them blank
          this.error = "Please try again";
        } else {
          this.user = response.data.user;
          //give them a token
          localStorage.setItem("token", JSON.stringify(response.data.token));
          //toggle for token validation to make certain parts of the page show and not show with ngs
          this.token = true;
          this.index = true;
          $('#login-modal').hide();
        }
      }.bind(this));
    };

    //===========USER LOGOUT===========//

    this.logout = function() {
      this.index = false;
      this.token = false;
      localStorage.clear("token");
      location.reload();
    };

    //===========USER EDIT===========//

    this.updateUser = function(user, id) {
      //console.log(user);
      //console.log(id);
      $http({
        method: "PUT",
        url: this.url + "/users/" + id,
        data :{
          user: user
          // user: {
          //   favorite_block: user.favorite_block,
          //   years_quilting: user.years_quilting
          // }
        },
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
      }).then(function(response) {
        //console.log(response);
        if (response.data.status == 401) {
          this.error = "Unauthorized";
        } else {
          this.getUser(response.data.id);
          this.user = response.data;
          $('#edit-user-modal').hide();
        }
      }.bind(this));
    };


    //===========USER SHOW============//

    this.getUser = function(id) {
      $http({
        method: "GET",
        url: this.url + "/users/" + id, //localStorage.getItem("userId"),
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
      }).then(function(response) {
        //console.log(response);
        if (response.data.status == 401) {
          this.error = "Unauthorized";
        } else {
          this.user = response.data;
        }
      }.bind(this));
    };


    //==========USER DELETE===========//

    this.deleteAccount = function(id) {
      //console.log("delete clicked");
      $http({
        method: "DELETE",
        url: this.url + "/users/" + id,
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
      }).then(function(response) {
        //console.log(response + "delete");
        if (response.data.status == 401) {
          this.error = "Unauthorized";
        } else {
          this.logout();
          location.reload();
        }
      }.bind(this));
    };

    //========RECIPE CREATE========//

    //NEED TO PASS IN USERID
    this.recipeForm = function(recipe, id) {
      $http({
        method: "POST",
        url: this.url + "/recipes",
        data: {
          recipe: recipe
        },
        headers: {
          Authorization:
          'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
      }).then(function(response) {
        //console.log(response + "created quilt block");
        //if 401 error message please login
        if (response.data.status == 422) {
        this.error = "Please Login to create a quilt";
      } else {
        this.recipe = response.data.recipe;
        this.recipeFormData = {};
        this.getRecipes();
         $('#create-recipe').hide();
        }
      }.bind(this));
    };

    //========RECIPE SHOW========//

    this.getOneRecipe = function(id) {
      $http({
        method: "GET",
        url: this.url + "/recipes/" + id,
      }).then(function(response) {
        //console.log(response);
        this.seeRecipe = true;
        //this.index = false;
        this.recipe = response.data;
      }.bind(this));
    };

    this.backToIndex = function() {
      this.index = true;
      this.seeRecipe = false;
      this.editable = false;
    };

//========RECIPE EDIT========//



  this.showEdit = function() {
    this.seeRecipe = false;
    this.editable = true;
  };

  this.updateRecipe = function(recipe, id, userID) {
    //console.log('This is the update route');
    //console.log('Update Form Data: ',this.recipe);
    $http({
      method: 'PUT',
      url: this.url + '/recipes/' + id,
      data: {
        recipe: recipe
      },
      headers: {
        Authorization:
        'Bearer ' + JSON.parse(localStorage.getItem('token'))
      }
    }).then(function (response) {
      //console.log('Update data: ', response);
      //this.updatedata = {};
      if (this.response.status == 422) {
        this.error = "Unauthorized";
      } else {
        this.getOneRecipe(response.data.id);
        this.recipe = response.data;
        this.editable = false;
        this.seeRecipe = true;
        // $('#open-edit').hide();
      }
    }.bind(this));
  }; //end update data


  //========RECIPE DELETE========//

  this.deleteRecipe = function() {
    console.log('delete clicked');
  //   console.log(id);
  //   $http({
  //     method: 'DELETE',
  //     url: this.url + '/recipes/' + id,
  //     headers: {
  //       Authorization:
  //       'Bearer ' + JSON.parse(localStorage.getItem('token'))
  //     }
  //   }).then(function(reponse) {
  //     console.log(response);
  //     //this.notices = response.data;
  //     if (response.data.status == 401) {
  //       this.error = "Unauthorized";
  //     } else {
  //       //this.getRecipe(response.data.id);
  //       this.recipe = response.data;
  //       this.editable = false;
  //       this.seeRecipe = true;
      };
  //   }.bind(this));
  // // };


  //=========RECIPE INDEX=========//

  this.getRecipes = function() {
    $http({
      method: "GET",
      url: this.url + "/recipes",
    }).then(function(response) {
      //console.log(response);
      this.recipes = response.data;
    }.bind(this));
  };

  this.getRecipes();


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
        console.log("close clicked");
      $('#login-modal').css('display', 'none');
    });


    //Event listener to open/close edit-accout modal
    $('.edit-account').on('click', function () {
      $('#edit-user-modal').css('display', 'block');
    });
    $('.close').on('click', function() {
      $('#edit-user-modal').css('display', 'none');
    });

    //Event listener to open/close recipe-show modal
    // $('.recipe-index-img').on('click', function () {
    //   $('#recipe-show').css('display', 'block');
    // });
    // $('.close').on('click', function() {
    //   $('#recipe-show').css('display', 'none');
    // });

    // //Event listener to open/close edit-recipe modal
    // $('#open-edit').on('click', function () {
    //   $('#edit-recipe').css('display', 'block');
    // });
    // $('.close').on('click', function() {
    //   $('#edit-recipe').css('display', 'none');
    // });

    //Event listener to open/close create-recipe modal
    $('.create-recipe-open').on('click', function () {
      $('#create-recipe').css('display', 'block');
    });
    $('.close').on('click', function() {
      $('#create-recipe').css('display', 'none');
    });

  }]); //End mainController
