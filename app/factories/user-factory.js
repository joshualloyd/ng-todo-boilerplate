'use strict';

todoApp.factory('UserFactory', function($http, $q, FirebaseUrl, FBCreds) {

	let config = {
		apiKey: FBCreds.apiKey,
		authDomain: FBCreds.authDomain
	};

	firebase.initializeApp(config);

	let currentUser = null;

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			currentUser = user.uid;
		} else {
			currentUser = null;
		}
	});

	let getUser = () => {
		return currentUser;
	};

	let createUser = (userObj) => {
		return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
		.catch((err)=>{
			console.log("user creation error", err);
		});
	};

	let loginUser = (userObj) => {
		return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
		.catch((err) => {
			console.log('user login error', err);
		});
	};

	let logoutUser = () => {
		return firebase.auth().signOut()
		.catch((err)=>{
			console.log("logout error", err);
		});
	};

	console.log('firebase', firebase);

	return {getUser, createUser, loginUser, logoutUser};

});