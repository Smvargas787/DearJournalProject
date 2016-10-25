DJournalApp.controller("LoginController", ["$scope", "$firebaseAuth", "$firebaseObject", "$location", function ($scope, $firebaseAuth, $firebaseObject, $location) {
  var ref = firebase.database().ref();

  $scope.authObj = $firebaseAuth();

  $scope.authObj.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      console.log("Signed in as:!!", firebaseUser.uid);
      $scope.firebaseUser = firebaseUser;
    } else {
      $scope.firebaseUser = false;
      console.log("Signed out!!", $scope.firebaseUser);
    }
  });

  $scope.SignIn = function () {
    $scope.authObj.$signInWithEmailAndPassword($scope.form.Email, $scope.form.Password)
    .then(function(firebaseUser) {
        console.log("Signed in as:", firebaseUser.uid);
        $location.path('/feed');
    }).catch(function(error) {
      console.error("Login failed", error);
    });
  };
}]);
