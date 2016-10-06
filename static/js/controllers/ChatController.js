DJournalApp.controller("ChatController", ["$scope", "$firebaseArray", "$firebaseAuth", "$firebaseObject", function ($scope, $firebaseArray, $firebaseAuth, $firebaseObject) {
  var ref = firebase.database().ref();
  var chatMessage = ref.child('messages');
  var messages = $firebaseArray(chatMessage);

  $scope.authObj = $firebaseAuth();
  $scope.newmessage = {};

  $scope.authObj.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      var userRef = ref.child('users/' + firebaseUser.uid + '/data');
      var displayUser = $firebaseObject(userRef);
      displayUser.$loaded()
      .then(function(data) {
        $scope.newmessage.user = data.username;
        //console.log(data === displayUser);
        console.log("My Data:: ", data);
        console.log("Display Name:: ", data.username);
        console.log("SCOPE:: ", $scope.newmessage.user);
      })
      .catch(function(error) {
        console.error("Error:", error);
      });
    } else {
      console.log("Error Displayed Name");
    }
  });

  $scope.messages = messages;

  $scope.insert = function() {
    console.log('In Function!!', $scope.newmessage);
    messages.$add($scope.newmessage)
    .then(function(ref) {
      $scope.newmessage.text = '';
    })
    .catch(function(error) {
      console.log("Error:", error);
    });
  };

}]);
