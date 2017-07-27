'use strict';

todoApp.controller('TodoAddController', function($scope, $window, TodoFactory, UserFactory){

	$scope.todoItem = {
		assignedTo: '',
		dependencies: '',
		dueDate: '',
		isCompleted: false,
		location: '',
		task: '',
		urgency: '',
		uid: UserFactory.getUser()
	};

	$scope.saveTodoItem = () => {
		TodoFactory.postNewItem($scope.todoItem)
		.then((data)=>{
			console.log('did item save?', data);
			$window.location.href = '#!/todos/view';
		});
	};


});