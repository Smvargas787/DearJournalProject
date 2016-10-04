angular.module('DJournalApp')
.controller('HomeController', ["$scope", "$firebaseArray", function($scope, $firebaseArray) {

  //Reference to DJournalApp Firebase
	var ref = firebase.database().ref();
  // Reference to all of the post that go into an object of Posts
	var postRef = ref.child('posts');
  // Make reference to previous code line
	var posts = $firebaseArray(postRef);
// 
	$scope.submitPost = function() {
		posts.$add($scope.newPost).then(
			console.log('Added to Firebase')
		);
	};

  $scope.removePost = function(post) {
  		posts.$remove(post).then(function(ref) {
  			console.log('Removed item key ',  ref.key);
  });
};

  $scope.editPost = function(post) {
    $scope.newPost = angular.copy(post);
    $scope.editing = !$scope.editing;
  };

  $scope.updatePost = function() {
    var index = posts.$indexFor($scope.newPost.$id);
    posts[index] = $scope.newPost;
    posts.$save(index).then(function(ref) {
      console.log("Updated item!");
      $scope.newPost = {};
      $scope.editing = false;
    });
  };

  $scope.posts = posts;
}]);
