DJournalApp.controller("ChatController", function ($scope, $firebaseArray, $firebaseAuth, $firebaseObject) {
  var ref = firebase.database().ref();
  var chatMessage = ref.child('messages');
  var messages = $firebaseArray(chatMessage);

  // Creating Message Arrays to capture new messages
  $scope.authObj = $firebaseAuth();
  $scope.newmessage = {};

  // Connecting message w/username to display
  $scope.authObj.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      var userRef = ref.child('users/' + firebaseUser.uid + '/data');
      var displayUser = $firebaseObject(userRef);
      displayUser.$loaded()
      .then(function(data) {
        $scope.newmessage.user = data.username;
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

  // Allowing user to post new message
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

});
