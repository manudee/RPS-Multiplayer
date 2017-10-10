
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

  var count = 0;

  var wins1 = 0;
  var losses1=0;
  var wins2=0;
  var losses2=0;


  var choice = ["Rock", "Paper", "Scissors"];


  var player1 = {
      "1": {
        displayName: "",
        wins: 0,
        losses: 0
      }

    };

  var player2 = {
      "2": {
        displayName: "",
        wins: 0,
        losses: 0
      } 


  }

  function submitCreateAccount(){

  		var displayName = $("#add-player").val().trim();
  		count++;


      if(count ===1 ){
        		 database.ref("/players/" + count).set({
        		 	  displayName:displayName,
                wins: wins1,
                losses:losses1
                });

      }
      else {  
               database.ref("/players/" + count).set({
                displayName:displayName,
                wins: wins2,
                losses:losses2

             });       
}


     if(count === 2)
     		 	count = 0;

  }



function displayName(){
  		


      database.ref("/players/1").on("value", function(snapshot) {
           var player1 = snapshot.val().displayName;
           $("#player1").html(player1);
           console.log("Player1 " + player1);
            })
  		

      database.ref("/players/2").on("value", function(snapshot) {
           var player2 = snapshot.val().displayName;
           $("#player2").html(player2);
           console.log("Player2 " + player2);
            })

  	

  }




  $("body").on("click", "#submit", function(){
  		submitCreateAccount();
  		displayName();

  })