DJournalApp.controller("LoginController", function ($scope, $firebaseAuth, $firebaseObject, $location) {
  var ref = firebase.database().ref();

  $scope.authObj = $firebaseAuth();

  // Authorizes user with their account to log in
  $scope.authObj.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      console.log("Signed in as:!!", firebaseUser.uid);
      $scope.firebaseUser = firebaseUser;
    } else {
      $scope.firebaseUser = false;
      console.log("Signed out!!", $scope.firebaseUser);
    }
  });

  // Once they click SignIn they will be checked for their email and Password
  //to make sure it is the correct user

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
