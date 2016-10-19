DJournalApp.controller("FeedController", ["$scope", "$firebaseAuth", "$firebaseObject", "$firebaseArray", function ($scope, $firebaseAuth, $firebaseObject, $firebaseArray) {
  //Reference to DJournalApp Firebase
	var ref = firebase.database().ref();
  var moodRef = ref.child('moods');
  var moods = $firebaseArray(moodRef);
  // Empty Object to store
  var journalsEntries = {};






  $scope.moods = moods;
  $scope.newJournalEntry = {};

  $scope.authObj = $firebaseAuth();

  //----------------------------------- Mood ------------------------------//
  $scope.pickMood = function(mood) {
    $scope.newJournalEntry.mood = mood.$value;
    console.log('Picked Mood ',   $scope.newJournalEntry.mood);
  };

  //----------------------------------- Journal Entry Submit ------------------------------//
  $scope.authObj.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      var userJournalRef = ref.child('journals/' + firebaseUser.uid);
      journalsEntries = $firebaseArray(userJournalRef);
      $scope.journalsEntries = journalsEntries;
      console.log('ALL JOURNALS: ', $scope.journalsEntries);
    } else {
      console.log("Error Displayed Name");
    }
  });

	$scope.submitJournalEntry = function() {
    $scope.newJournalEntry.date = firebase.database.ServerValue.TIMESTAMP;
    console.log('DATE: ', $scope.newJournalEntry.date);
		journalsEntries.$add($scope.newJournalEntry).then(function(ref) {
        $scope.newJournalEntry = {};
        console.log('SAVED!');
    });
	};

  //----------------------------------- Journal Entry Remove ------------------------------//
  $scope.removeJournalEntry = function(journal) {
  		journalsEntries.$remove(journal).then(function(ref) {
  			console.log('Removed item key ',  ref.key);
  	});
	};

  //----------------------------------- Journal Entry Edit ------------------------------//
  $scope.editJournalEntry = function(journal) {
    $scope.newJournalEntry = angular.copy(journal);
    $scope.editing = !$scope.editing;
  };

  //----------------------------------- Journal Entry Update ------------------------------//
  $scope.updateJournalEntry = function() {
    var index = journalsEntries.$indexFor($scope.newJournalEntry.$id);
    console.log('Before we update: ', $scope.newJournalEntry);
    journalsEntries[index] = $scope.newJournalEntry;
    journalsEntries.$save(index).then(function(ref) {
      console.log("Updated item!");
      $scope.newJournalEntry = {};
      $scope.editing = false;
    });
  };
}]);
