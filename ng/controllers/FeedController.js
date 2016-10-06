DJournalApp.controller("FeedController", function ($scope, $firebaseAuth, $firebaseArray) {
  //Reference to DJournalApp Firebase
	var ref = firebase.database().ref();
  // Empty Object to store
  var journalsEntries = {};

  $scope.authObj = $firebaseAuth();

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

  $scope.removeJournalEntry = function(journal) {
  		journalsEntries.$remove(post).then(function(ref) {
  			console.log('Removed item key ',  ref.key);
  	});
	};

  $scope.editJournalEntry = function(journal) {
    $scope.newPost = angular.copy(post);
    $scope.editing = !$scope.editing;
  };

  $scope.updateJournalEntry = function() {
    var index = journalsEntries.$indexFor($scope.newPost.$id);
    journalsEntries[index] = $scope.newJournalEntry;
    journalsEntries.$save(index).then(function(ref) {
      console.log("Updated item!");
      $scope.newJournalEntry = {};
      $scope.editing = false;
    });
  };
});
