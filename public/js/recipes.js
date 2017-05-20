var app = angular.module('cookbook_app', []);

app.controller('mainController', ['$http', function($http) {
    this.message = "recipes controller works";
    this.notices = [];
    this.formdata = {};

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
    };













}]);
