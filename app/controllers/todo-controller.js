'use strict';

todoApp.controller('TodoListController', function($scope, TodoFactory, UserFactory) {

//
function fetchTodos(){
	TodoFactory.getTodoList(UserFactory.getUser())
	.then((todoList)=>{
		console.log('todo data', todoList);
		let todoData = todoList.data;
		Object.keys(todoData).forEach((key)=>{
			todoData[key].id = key;
		});
		$scope.todos = todoData;
	})
	.catch((err)=>{
		console.log('err', err);
	});
}

fetchTodos();
//viewing all todos


//deleting todos
$scope.deleteTask = (taskId) => {
	console.log('delete called', taskId);
	TodoFactory.deleteTodoItem(taskId)
	.then((data)=>{
		console.log('removed item', data);
		fetchTodos();
	});
};

//updating completed todos
$scope.updateTaskStatus = (todoObj) => {
	console.log('status update', todoObj);
	TodoFactory.updateTodoStatus(todoObj)
	.then((data)=>{
		console.log('Updated completed status', data);
	});
};


});