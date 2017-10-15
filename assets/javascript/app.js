
  var config = {
    apiKey: "AIzaSyB_DKm5hWrvC0wY5bzspNeAjZCjvu3TcdI",
    authDomain: "multiplayergamerps.firebaseapp.com",
    databaseURL: "https://multiplayergamerps.firebaseio.com",
    projectId: "multiplayergamerps",
    storageBucket: "multiplayergamerps.appspot.com",
    messagingSenderId: "194144422802"
  };
  firebase.initializeApp(config);


  //database instance
  var database = firebase.database();


  //all our connections will be stored here
  var connectionsRef = database.ref("/connections");

  //info/connected returns a boolean to see if a client is connected to database
  var connectedRef = database.ref(".info/connected");

  var playersRef = database.ref("/playersRef");
  var players = database.ref().child("/players");
  var count = 0;


  var player1 = "waiting for player 1";
  var player2 = "waiting for player 2";

  var wins1   = 0;
  var losses1 = 0;
  var wins2   = 0;
  var losses2 = 0;


  var choice = ["Rock", "Paper", "Scissors"];



//create input text field and append to playerNames div
var input = $("<input id=playerName type=text placeholder=Name>");
$("#playerNames").append(input);


var button = $("<button id=addPlayer value=submit type=submit>Submit</button>");
button.addClass("btn btn-primary btn-default");
$("#playerNames").append(button);



var player1= function() {
  $("#player1").html(player1);

};


var player2 = function() {
  $("#player2").html(player2);
};


$('body').on('click', '#addPlayer', function(){


    connectionsRef.once("value", function(snapshot){

        console.log("line 64 " + snapshot.numChildren());

        //when only one player/client is connected
        if(snapshot.numChildren() === 1){
            var con = playersRef.push({
                 player1: $("#playerName").val(),
                 wins: 0,
                 losses: 0
               });
           con.onDisconnect().remove();
           $("#playerName").remove();
           $('#addPlayer').remove();

        }


        else if(snapshot.numChildren() === 2){
            var con = playersRef.push({
                 player2: $("#playerName").val(),
                 wins: 0,
                 losses: 0
               });
           con.onDisconnect().remove();
           $("#playerName").remove();
           $('#addPlayer').remove();
           
        }



    })



        players.on("child_added", function(snapshot){


            snapshot.forEach(function(child) {
              $("#player1Info").html("Hi " + child.val().player[1]);
              console.log(child.key+": "+child[1].val());
            });
            

        });




})






  connectedRef.on("value", function(snap) {

  console.log("line 31 " + snap.val());
  // If they are connected..
  if (snap.val()) {

    // Add user to the connections list.
    var con = connectionsRef.push(true);

    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});





  function submitCreateAccount(){

      var displayName = $("#add-player").val().trim();
      count++;


      if(count ===1 ){
             database.ref("/players/" + count).set({
                displayName:displayName,
                wins: wins1,
                losses:losses1
                });
            $(".submit").show();
            $(".playerName").show();

      }
      else {  
               database.ref("/players/" + count).set({
                displayName:displayName,
                wins: wins2,
                losses:losses2
                 
             });
              $(".submit").show();
              $(".playerName").show();      
}


     if(count === 2)
          count = 0;

  }



function displayName(){
      


      database.ref("/players/1").on("value", function(snapshot) {
          var player1 = snapshot.val().displayName;
           $("#player1").html(player1);
           $(".submit").hide();
           $(".playerName").hide();
           $("#player1Greeting").html("Hi " + player1 );
       
           console.log("Player1 " + snapshot.val().displayName);
            })
      

      database.ref("/players/2").on("value", function(snapshot) {
          var  player2 = snapshot.val().displayName;
           $("#player2").html(player2);
           $(".submit").hide();
           $(".playerName").hide();
           $("#player2Greeting").html("Hi " + player2 );
        
           console.log("Player2 " + player2);
            })

    

  }




  $("body").on("click", "#submit", function(){
      submitCreateAccount();
      displayName();

  })

