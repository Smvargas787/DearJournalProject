DJournalApp.controller("LiveViewController", ["$scope", "$firebaseAuth", "$firebaseArray", "$firebaseObject", "$location", function ($scope, $firebaseAuth, $firebaseArray, $firebaseObject, $location) {
  var ref = firebase.database().ref();

  //----------------------------------- Display Username & Avatar ------------------------------//
  $scope.authObj = $firebaseAuth();

  // Displays logged in user's names on top of page with avatar
  $scope.authObj.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      console.log("Signed in as:", firebaseUser.uid);
      var userRef = ref.child('users/' + firebaseUser.uid + '/data');
      var user = $firebaseObject(userRef);
      $scope.loggedUser = user; // {{ user }}
      console.log('Logged in user: ', $scope.loggedUser);
    } else {
      $location.path("/login");
      console.log("Signed out");
    }
  });

  //----------------------------------- Display All Recent Journals ------------------------------//

  var log = [];
  var endTime = 1476579600;

  // Takes a copy of each user's recent posts and loads them onto the live-feed
  var query = firebase.database().ref("journals/").orderByKey();
  query.once("value")
    .then(function(snapshot) {
      console.log("CONNECT", snapshot.val());
      snapshot.forEach(function(childSnapshot) {
        // key will be the user's UID
        var key = childSnapshot.key;
        console.log('Object Key: ', key);
        var userRef = ref.child('users/' + key + '/data');
        var displayUser = $firebaseObject(userRef);
        displayUser.$loaded()
        .then(function(data) {
          console.log('Journal OWNER:', data.username );
          $scope.user = data.username;

          // childData will be the actual journals of the user
          var childData = childSnapshot.val();
          console.log('Object Data: ', childData);

          angular.forEach(childData, function(value, key) {
            if(value.date > endTime) {
              console.log('NEW:', value);
              value.user = $scope.user;
              value.key = key;
              this.push(value);
            } else {
              console.log('OLD:', value);
            }
          }, log);
        })
        .catch(function(error) {
          console.error("Error:", error);
        });

    });
    console.info('WHOLE: ', $scope.journals);
    $scope.journals = log;
  });

}]);
