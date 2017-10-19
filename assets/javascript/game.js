
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

  var turnRef = database.ref('/turn/');

  var choice = ["Rock", "Paper", "Scissors"];

  turnRef.onDisconnect().remove();

//create input text field and append to playerNames div
var input = $("<input id=playerName type=text placeholder=Name>");
$("#inputPlayer").append(input);


var button = $("<button id=addPlayer value=submit type=submit>Submit</button>");
button.addClass("btn btn-primary btn-default");


var player;
var otherPlayer;


$("#inputPlayer").append(button);


//this is to keep track of connections 
connectedRef.on("value", function(snap) {

if (snap.val()) {


    var con = connectionsRef.push(true);
    con.onDisconnect().remove();
    }
});



// $(document).on('ready', function(){
  database.ref().once('value', function(snapshot) {
        var playerObj = snapshot.child('/playersRef/');
        var num = playerObj.numChildren();
        console.log("Num is " + num);

        if (num === 0) {
         
          player = 1;
          otherPlayer =2;
          console.log("Line 69 " + player);
        }



})
// })



//         else if(num === 1){
//           player =2;
//           console.log("Line 74 " + player);

//         }

// })


$('body').on("click", "#addPlayer", function(){


connectionsRef.once("value", function(snapshot){

  

    if(snapshot.numChildren() === 1){
          database.ref('/playersRef/' + snapshot.numChildren()).set({
              player1: $("#playerName").val(),
              wins: 0,
              losses: 0

          })


    database.ref('/playersRef/' + snapshot.numChildren()).onDisconnect().remove();
    
    $("#addPlayer").hide();
    $("#playerName").hide();
    }

   if(snapshot.numChildren() === 2){
          database.ref('/playersRef/' + snapshot.numChildren()).set({
              player2: $("#playerName").val(),
              wins: 0,
              losses: 0

          })

    database.ref('/playersRef/' + snapshot.numChildren()).onDisconnect().remove();
   
   
    $("#addPlayer").hide();
    $("#playerName").hide();
    }



playersRef.on("child_added", function(childsnapshot){


var key = childsnapshot.key;
console.log("Key " + key);
console.log("Line 81 Key: "+ key);

if(key === '1' ){
      var player1 = {};

      player1.name = childsnapshot.val().player1;
      player1.wins = childsnapshot.val().wins;
      player1.losses = childsnapshot.val().losses;



      console.log("player1 name " + player1.name);
      console.log("player1 name " + player1.wins);
      console.log("player1 name " + player1.losses);

       //update html with the playerName
       $('#player1').html("Hi " + player1.name + " You are player 1" + '<br>');
  
}

else if(key === '2'){
      var player2 = {};

      player2.name = childsnapshot.val().player2;
      player2.wins = childsnapshot.val().wins;
      player2.losses = childsnapshot.val().losses;


      console.log("player1 name " + player2.name);
      console.log("player1 name " + player2.wins);
      console.log("player1 name " + player2.losses);

      //update html with the playerName
      $('#player2').html("Hi " + player2.name + " You are player 2" + '<br>');
     

    turnRef.set(1);
    player = 2;
    // otherPlayer =1;
    console.log("line 104 " + player);
      
}
})

 

turnRef.on("value", function(turn){

  console.log("Line 137 " + turn.val());
 console.log("line 138 " + player);

console.log(" I am in turnref");

  if(turn.val() === 1){
    for (var i = 0; i < choice.length; i++) {


         console.log("choices " + choice[i]);
         var newDiv = $('<div>');
         newDiv.html(choice[i]);
         newDiv.addClass('player1Choices');
         $("#player1").append(newDiv);
         // $("#player1").css('border','4px solid yellow');
        }
        
        // $("#playerNote").html("Hi There! You are player " + otherPlayer);
        // $("#turnNote").html("It's your Turn");
        // turnMessage(1);
  }


else if(turn.val() === 2 ){
    for (var i = 0; i < choice.length; i++) {


         console.log("choices " + choice[i]);
         var newDiv = $('<div>');
         newDiv.html(choice[i]);
         newDiv.addClass('player2Choices');
         $("#player2").append(newDiv);

        }
        
        //$("#playerNote").html("Hi There! You are player " + turn.val());
        // $("#turnNote").html("waiting for Player ");
        // turnMessage(2);

  }


else if(turn.val() === 3){

    //call function to show result and update wins and losses
  }


})



// function turnMessage(turnParam){

// if(turnParam === 1){
//   $("#playerNote").html("Hi There! You are player " + turnParam);
//   $("#turnNote").html("waiting for Player 2");

// }


// }

$('body').on('click', '.player1Choices', function(){
      var player1Selection = $(this).text();
      console.log("Line 152 " + player1Selection);
      
      var newDiv = $('<div>');
      newDiv.html("Your Choice " + player1Selection);

      $(".player1Choices").remove();
      
      // $(".player1Choices").html(newDiv);
      $("#player1").append(newDiv);

     database.ref('/playersRef/1').update({
      choice: player1Selection
    })

     turnRef.set(2);
      
})


$('body').on('click', '.player2Choices', function(){
      var player2Selection = $(this).text();
      console.log("Line 152 " + player2Selection);
      
      var newDiv = $('<div>');
      newDiv.html("Your Choice " + player2Selection);
      
      $(".player2Choices").remove();
      // $(".player2Choices").html(newDiv);
      $("#player2").append(newDiv)

     database.ref('/playersRef/2').update({
       choice: player2Selection
    })

     turnRef.set(3);
      
})


})

})







//add turnRef to DB
//On turn 1 show choices for Player 1
//capture his click
//show choices for player2
//capture his click 
//compare