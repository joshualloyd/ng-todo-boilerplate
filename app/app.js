"use strict";

let todoApp = angular.module("TodoApp", ["ngRoute"])
.constant("FirebaseUrl", "https://todos-2430e.firebaseio.com/");

let isAuth = (UserFactory) => {
  return new Promise( (resolve, reject) => {
    UserFactory.isAuthenticated()
    .then( (userBoolean) => {
      if(userBoolean) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

todoApp.config( ($routeProvider) => {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/login.html',
    controller: 'UserController'
  })
  .when('/todos/view', {
    templateUrl: 'partials/todo-list.html',
    controller: 'TodoListController',
    resolve: {isAuth}
  })
  .when('/todos/new', {
    templateUrl: 'partials/todo-form.html',
    controller: 'TodoAddController',
    resolve: {isAuth}
  })
  .when('/todos/detail/:todoId', {
    templateUrl: 'partials/todo-detail.html',
    controller: 'TodoDetailController',
    resolve: {isAuth}
  })
  .when('/todos/edit/:todoId', {
    templateUrl: 'partials/todo-form.html',
    controller: 'TodoEditController',
    resolve: {isAuth}
  })
  .otherwise('/');
});
