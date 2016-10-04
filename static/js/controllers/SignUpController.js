DJournalApp.controller("SignUpController", ["$scope", "$firebaseAuth", "$firebaseArray", "$firebaseObject", "$location", function ($scope, $firebaseAuth, $firebaseArray, $firebaseObject, $location) {
  var ref = firebase.database().ref();
  var avatarRef = ref.child('avatars');
  var avatars = $firebaseArray(avatarRef);

  $scope.avatars = avatars;
  $scope.randomNames = [
    'Maryanna Leanos',  
    'Ryann Jamison' ,
    'Tama Branch'  ,
    'Donn Bast'  ,
    'Elvie Kearse',  
    'Brandon Fitzpatrick' , 
    'Versie Reardon'  ,
    'Bryant Millener' ,
    'Rashida Lor',
    'Adrianne Swarey' , 
    'Annemarie Chumley' , 
    'Love Segal'  ,
    'Hillary Mero' , 
    'Paola Paradise' , 
    'Ashly Stecklein' , 
    'Sanda Hurless'  ,
    'Dorothy Harford' , 
    'Queen Beitz'  ,
    'Nicki Lacey'  ,
    'Brooke Weiskopf'  
  ];

  $scope.authObj = $firebaseAuth();

  $scope.pickAvatar = function(avatar){
    $scope.choosenAvatar = avatar.$value;
    console.log('Picked me! ', $scope.choosenAvatar);
  };

  $scope.pickRandomName = function() {
    // Makes random number to pick from array
    var pickNumber = Math.floor(Math.random() * ($scope.randomNames.length - 1 + 1)) + 1;
    // Picks from array with random number
    $scope.randomNameShow = $scope.randomNames[pickNumber];
  };

  $scope.EmailSignUp = function() {
    $scope.authObj.$createUserWithEmailAndPassword($scope.form.Email, $scope.form.Password)
    .then(function(firebaseUser) {
      console.log("Signed in as:", firebaseUser.uid);
      var userRef = ref.child('users/' + firebaseUser.uid + '/data');
      var user = $firebaseObject(userRef);
      user.avatar = $scope.choosenAvatar;
      user.username = $scope.randomNameShow;
      user.dob = $scope.form.Bday;
      user.$save().then(function(ref) {
        $location.path('/feed');
        console.log("WE SAVED DATA!!");
      }, function(error) {
        console.log("Error:", error);
      });
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  };

}]);
