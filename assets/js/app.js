/**
 * Created by ttn on 13/06/17.
 */
'use strict';

var todoApp = angular.module('todoApp', ['ngRoute', 'ui.bootstrap']);
todoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/templates/home.html'
      })
      .when('/login', {
        templateUrl: '/templates/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: '/templates/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/todo', {
        templateUrl: '/templates/todo.html',
        controller: 'TodoCtrl'
      })
      .otherwise({
        redirectTo: '/',
        caseInsensitiveMatch: true
      })
  }]);

todoApp.controller('TodoCtrl', ['$scope', '$rootScope', 'TodoService','LoginService', '$location', function($scope, $rootScope, TodoService,LoginService, $location) {
  $scope.formData = {};
  $scope.todos = [];

  TodoService.getTodos().then(function(response) {
    $scope.todos = response;
  });

  $scope.addTodo = function() {
    TodoService.addTodo($scope.formData).then(function(response) {
      $scope.todos.push($scope.formData)
      $scope.formData = {};
    });
  }

  $scope.removeTodo = function(todo) {
    TodoService.removeTodo(todo).then(function(response) {
      $scope.todos.splice($scope.todos.indexOf(todo), 1)
    });
  }

  $scope.logout = function(){
    LoginService.logout().then(function(result){
      $location.path('/')
    })
  }

}]);

todoApp.controller('LoginCtrl',
  ['$scope', '$rootScope', 'LoginService','$location', function($scope, $rootScope, LoginService, $location){

    $scope.login = function(email, password){
      LoginService.login(email, password).then(function(result){
        $location.path('/todo')
      })
    }
}]);

todoApp.controller('SignupCtrl',
  ['$scope', '$rootScope', 'LoginService','$location', function($scope, $rootScope, LoginService, $location){

    $scope.signup = function(name, email, password){
      LoginService.signup(name, email, password).then(function(result){
        $location.path('/todo')
      })
    }
}]);
