  var config = {
    apiKey: "AIzaSyB_DKm5hWrvC0wY5bzspNeAjZCjvu3TcdI",
    authDomain: "multiplayergamerps.firebaseapp.com",
    databaseURL: "https://multiplayergamerps.firebaseio.com",
    projectId: "multiplayergamerps",
    storageBucket: "",
    messagingSenderId: "194144422802"
  };
  firebase.initializeApp(config);



  var database = firebase.database();

  function submitCreateAccount(){

  		var displayName = $("#add-player").val().trim();

		// firebase.auth().creteUserWithName(displayName)
  // 		.then(function(user){

  // 			user.updateProfile({displayName:displayName});
  // 		});

  		 database.ref().push({
  		 	displayName:displayName	
  		 });

  }


  $("body").on("click", "#submit", function(){
  		submitCreateAccount();

  })