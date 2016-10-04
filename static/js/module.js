var DJournalApp = angular.module('DJournalApp', ['ngRoute', 'firebase'])
.config(function() {
  // Intializing DJournalApp Firebase
	var config = {
    apiKey: "AIzaSyCXcq5HKabZOvYa9PCnIdYKiLyvYbpqaTk",
     authDomain: "djournalapp.firebaseapp.com",
     databaseURL: "https://djournalapp.firebaseio.com",
     storageBucket: "",
     messagingSenderId: "864547183352"
  };
  firebase.initializeApp(config);
});
