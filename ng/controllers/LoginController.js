DJournalApp.controller("LoginController", function ($scope, $firebaseAuth, $firebaseObject, $location) {
  var ref = firebase.database().ref();

  $scope.authObj = $firebaseAuth();

  $scope.SignIn = function () {
    $scope.authObj.$signInWithEmailAndPassword($scope.form.Email, $scope.form.Password)
    .then(function(firebaseUser) {
        console.log("Signed in as:", firebaseUser.uid);
        $location.path('/feed');
    }).catch(function(error) {
      console.error("Login failed", error);
    });
  };
});
