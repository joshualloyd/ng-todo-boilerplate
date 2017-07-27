'use strict';

todoApp.controller('UserController', function($scope, $window, UserFactory) {

	$scope.account = {
		email: "",
		password: ""
	};

	$scope.register = () => {
		// TODO validate that user doesn't exist
		console.log('you clicked register');
		UserFactory.createUser($scope.account)
		.then((userData)=>{
			console.log('new user!', userData);
			$scope.login();
		});
	};

	$scope.login = () => {
		UserFactory.loginUser($scope.account)
		.then((userData)=>{
			$window.location.href = '#!/todos/view';
		});
	};



});