DJournalApp.controller("SignUpController", function ($scope, $firebaseAuth, $firebaseArray, $firebaseObject, $location) {
  var ref = firebase.database().ref();
  var avatarRef = ref.child('avatars');
  var avatars = $firebaseArray(avatarRef);

//-------------------------Random Names for Generator-------------------------//

  $scope.avatars = avatars;
  $scope.randomNames = [
    'Maryanna Leanos',  
    'Ryann Jamison',
    'Tama Branch',
    'Donn Bast',
    'Elvie Kearse',  
    'Brandon Fitzpatrick', 
    'Versie Reardon',
    'Bryant Millener',
    'Rashida Lor',
    'Adrianne Swarey', 
    'Annemarie Chumley', 
    'Love Segal',
    'Hillary Mero', 
    'Paola Paradise', 
    'Ashly Stecklein', 
    'Sanda Hurless',
    'Dorothy Harford', 
    'Queen Beitz',
    'Nicki Lacey',
    'Brooke Weiskopf',
    'Zenaida Vanantwerp',  
    'Kandice Noland',  
    'Alise Toms',  
    'Elodia Chynoweth',  
    'Barry Runions',  
    'Corinna Rozell',  
    'Luanna Gee',  
    'Roselle Karlson',  
    'Stefani Calfee',  
    'Edra Limbaugh',  
    'Avis Bologna',  
    'Sherley Alloway',  
    'Harriett Lain',  
    'Zoila Mesta',  
    'Ginger Rezac',  
    'Sherlyn Veasey',  
    'Gwendolyn Broad',  
    'Edmundo Senn',  
    'Elisabeth Varnadoe',  
    'Shelley Mitra',
    'Sade Bridges',  
    'Grant Cearley',  
    'Micha Ulrey',  
    'Annalisa Maston',  
    'Jame Wargo',  
    'Oralee Mcnemar',  
    'Aisha Reeve',  
    'Charity Carlisle',  
    'Madeline Mclin',  
    'Yi Streiff',  
    'Parker Roig',  
    'Kennith Buentello',  
    'Samual Swindall',  
    'Lili Crary',  
    'Gisele Kolstad',  
    'Jerrold Hashimoto',  
    'Sherrill Tosi',  
    'Mari Deslauriers',  
    'Rhiannon Stach',  
    'Ha Kittleson',
    'Emerson Mcconkey',  
    'Ruben Gledhill',  
    'Monty Santee',  
    'Adrian Parkerson',  
    'Wade Rubel',  
    'Derick Smiddy',  
    'Felix Claypool',  
    'Rudolph Bylsma',  
    'Art Mosely',  
    'Jared Cazarez',  
    'Ashley Mulder',  
    'Gerard Oldaker',  
    'Gayle Geesey',  
    'Dorsey Rodden',  
    'Russ Flesher',  
    'Clayton Canez',  
    'Lee Kwong',  
    'Cole Rusk',  
    'Jason Villar',  
    'Lane Kimmell',
    'Elias Figaro', 
    'Errol Lerman',  
    'Jesus Vanwyk',  
    'Antone Kirsch',  
    'Eugenio Otter',  
    'Damon Boldt',  
    'Harry Obregon',  
    'Johnathon Alloway',  
    'Lonny Bellard',  
    'Enrique Gilkes',  
    'Quinton Linger',  
    'Winfred Annunziata',  
    'Mel Randall',  
    'Jed Kersh',  
    'Fernando Maisonet',  
    'Heath Swain',  
    'Brain Aube',  
    'Ross Goodell',  
    'Elijah Treece',  
    'Broderick Kittel',
    'Donita Baylon',  
    'Brigid Kirkham', 
    'Jone Seville',  
    'Gigi Stair',  
    'Alycia Fouche',  
    'Mirian Hedges',  
    'Samira Espinal',  
    'Margarette Redden',  
    'Trina Peele',  
    'Corinne Allmond',  
    'In Schippers',  
    'Karena Hilliker',  
    'Karleen Cyrus',  
    'Lottie Jorden',  
    'Cheryl Seaton', 
    'Ouida Gearhart',  
    'Lynda Helmuth',  
    'Dorris Noecker',  
    'Jodi Trundy',  
    'Milly Newquist'      
  ];

  $scope.authObj = $firebaseAuth();

  //-----------------------------------Avatar------------------------------//

  $scope.pickAvatar = function(avatar){
    $scope.choosenAvatar = avatar.$value;
    console.log('Picked me! ', $scope.choosenAvatar);
  };

  // Random Name Generator
  $scope.pickRandomName = function() {
    // Makes random number to pick from array
    var pickNumber = Math.floor(Math.random() * ($scope.randomNames.length)) + 1;
    // Picks from array with random number
    $scope.randomNameShow = $scope.randomNames[pickNumber];
  };


  //-----------------------------------Registration------------------------------//

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

});
