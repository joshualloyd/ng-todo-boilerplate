'use strict';

todoApp.factory('TodoFactory', function($q, $http, FirebaseUrl){

	let getTodoList = (userId) => {
		console.log('user id', userId);
		return  $q((resolve, reject)=>{
			$http.get(`${FirebaseUrl}todos.json?orderBy="uid"&equalTo="${userId}"`)
			.then((todoData)=>{
				resolve(todoData);
			})
			.catch((err)=>{
				console.log('todo xhr error', err);
				reject(err);
			});

		});
	};

	let postNewItem = (newItem) => {
		return $q((resolve, reject)=>{
			$http.post(`${FirebaseUrl}todos.json`,
				angular.toJson(newItem))
			.then((newItemData)=>{
				resolve(newItemData);
			})
			.catch((err)=>{
				reject(err);
			});
		});
	};


	let updateTodoStatus = (todo) => {
		return $q((resolve, reject)=>{
			let itemId = todo.id;
			// Put the entire obj into FB
			if(itemId) {
				$http.put(`${FirebaseUrl}todos/${itemId}.json`,
					angular.toJson(todo))
				.then((data)=>{
					resolve(data);
				})
				.catch((err)=>{
					reject(err);
				});
			}
		});
	};

	let deleteTodoItem = (todoId) => {
		return $q((resolve, reject) => {
			if(todoId) {
				$http.delete(`${FirebaseUrl}todos/${todoId}.json`)
				.then((data)=>{
					resolve(data);
				})
				.catch((err)=>{
					reject(err);
				});
			} else {
				console.log('you did not provide a todo id');
			}
		});
	};

	return {getTodoList, updateTodoStatus, postNewItem, deleteTodoItem};
});