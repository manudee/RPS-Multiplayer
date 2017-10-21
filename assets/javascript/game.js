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
  var p1choice;
  var p2choice;


  //variables for player1 and 2 wins and losses
  player1Wins = 0;
  player1Losses = 0;
  player2Wins = 0;
  player2Losses = 0


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
          otherPlayer = 2;
          console.log("Line 69 " + player);
        }
 
        else if(num === 1){
          player = 2;
          otherPlayer = 1;
         console.log("Line 74 " + player);
 
        }
 
})
 
 
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
       $('#p1WinsLosses').html("Wins " + player1.wins + "Losses" + player1.losses);

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
      $('#p2WinsLosses').html("Wins " + player2.wins + "Losses" + player2.losses);
 
    turnRef.set(1);
    // player = 2;
    // otherPlayer =1;
    console.log("line 104 " + player);
     
    }
})
 
 
turnRef.on("value", function(turn){
 
console.log("Line 137 " + turn.val());
console.log("line 138 " + player);
 
console.log(" I am in turnref");
 
  if(turn.val() === 1 && player === 1){
      console.log("I AM NOT HERE");
    for (var i = 0; i < choice.length; i++) {
 
 
         console.log("choices " + choice[i]);
         var newDiv = $('<div>');
         newDiv.html(choice[i]);
         newDiv.addClass('player1Choices');
         $("#player1Choices").append(newDiv);
         $("#player1Section").css('border','4px solid blue');
        }
       
        // $("#playerNote").html("Hi There! You are player " + otherPlayer);
        // $("#turnNote").html("It's your Turn");

  }
 
 
else if(turn.val() === 2 && otherPlayer === 1  ){
    for (var i = 0; i < choice.length; i++) {
 
         console.log("I CAME HERE");
         console.log("choices " + choice[i]);
         var newDiv = $('<div>');
         newDiv.html(choice[i]);
         newDiv.addClass('player2Choices');
         $("#player2Choices").append(newDiv);
         $("#player2Section").css('border','4px solid blue');
        }
       
        //$("#playerNote").html("Hi There! You are player " + turn.val());
        // $("#turnNote").html("waiting for Player ");

 
  }
 
 
else if(turn.val() === 3){
//call to decide wins and losses
    playersRef.on("child_added",function(choice_key){

      var key = choice_key.key;
      if(key === '1'){
        p1choice = choice_key.val().choice;
        
        }

      if(key === '2'){
        p2choice = choice_key.val().choice;
        
        }
  })

    calculateStats(p1choice,p2choice);
 
}
 
})

 
function calculateStats(p1C,p2C){
  console.log("p1 Choice " + p1choice);
  console.log("p2 Choice " + p2choice);

  var p1; //if p1 = 1 p1 wins, if p1 = 0 p2 wins

   if(p1choice === p2choice){
         console.log("This is a tie");
         $("#results").html("This is a tie");
        }
    

   else if(p1choice == "Rock" && p2choice == "Scissors"){
          console.log("This is a win for p1");
          $("#results").html("This is a win for p1");
          p1 = 1;
          console.log("p1 = " + p1);
         
          player1Wins++;
          player2Losses++;


          updateFirebase(player1Wins,player2Losses,p1);
      

      }
   else if(p1choice == "Rock" && p2choice == "Paper") {
          console.log("This is a win for p2");
          $("#results").html("This is a win for p2");
          p1 = 0;
          console.log("p1 = " + p1);

          player2Wins++;
          player1Losses++;

          updateFirebase(player1Wins,player2Losses,p1);
      }  

   else if(p1choice == "Scissors" && p2choice == "Paper") {
          console.log("This is a win for p1");
          $("#results").html("This is a win for p1");
          p1 = 1;
          console.log("p1 = " + p1);
          player1Wins++;
          player2Losses++;
          
          updateFirebase(player1Wins,player2Losses,p1);
      }  

   else if(p1choice == "Scissors" && p2choice == "Rock") {
          console.log("This is a win for p2");
          $("#results").html("This is a win for p2");
          p1 = 0;
          console.log("p1 = " + p1);
          player2Wins++;
          player1Losses++;
          
          updateFirebase(player2Wins,player1Losses,p1);
      }     

   else if(p1choice == "Paper" && p2choice == "Rock"){
          console.log("This is a win for p1");
          $("#results").html("This is a win for p1");
          p1 = 1;
          console.log("p1 = " + p1);
          player1Wins++;
          player2Losses++;
          
          updateFirebase(player2Wins,player1Losses,p1);
      }  
   else if(p1choice == "Paper" && p2choice == "Scissors"){
          console.log("This is a win for p2");
          $("#results").html("This is a win for p2");
          p1 = 0;
          console.log("p1 = " + p1);
          player2Wins++;
          player1Losses++;
          console.log("player = " + player);
          console.log("OtherPlayer = " + otherPlayer);
          updateFirebase(player2Wins,player1Losses,p1);
      }  

       $("#player1Choices").empty();
       $("#player2Choices").empty();
       // $("#player2").empty();
       

playersRef.on("child_changed", function(stats){

  var key = stats.key;
  console.log(" Key 375 " + key);

  if(key === '1'){

      player1.wins = stats.val().wins;
      console.log("Player 1 Wins" + player1.wins);
      player1.losses = stats.val().losses;
      console.log("Player 1 Losses" + player1.losses);
      $("#p1WinsLosses").html("Wins : " + player1.wins + " Losses: " + player1.losses );
  }

  else if(key === '2'){
      player2.wins = stats.val().wins;
      player2.losses = stats.val().losses;
      console.log("Player 2 Wins " + player2.wins);
      console.log("Player 2 Losses " + player1.losses);

      $("#p2WinsLosses").html("Wins : " + player2.wins + " Losses: " + player2.losses );
  }


})


       turnRef.set(1);

}




function updateFirebase(wins, losses,p1){
console.log("InUpdate database");
  if(p1 === 1){
          database.ref('/playersRef/1').update({
              wins:wins
            })

          database.ref('/playersRef/2').update({
            losses:losses
          })


          // $("#p1WinsLosses").html(" Wins=  " + wins + " Losses = "  + losses);
    }

  else if(p1 === 0 )
    {
          database.ref('/playersRef/2').update({
              wins:wins
            })

          database.ref('/playersRef/1').update({
            losses:losses
          })
    }
     // $("#p2WinsLosses").html(" Wins=  " + wins + " Losses = "  + losses);
}






$('body').on('click', '.player1Choices', function(){
      var player1Selection = $(this).text();
      console.log("Line 152 " + player1Selection);
     
      var newDiv = $('<div>');
      newDiv.html("Your Choice " + "<h2>" + player1Selection + "</h2>");
 
      $(".player1Choices").remove();
     
      $("#player1Choices").html(newDiv);
      //$("#player1").append(newDiv);
 
     database.ref('/playersRef/1').update({
      choice: player1Selection
    })
 
     turnRef.set(2);
     
})
 
 
$('body').on('click', '.player2Choices', function(){
      var player2Selection = $(this).text();
      console.log("Line 393 " + player2Selection);
     
      var newDiv = $('<div>');
      newDiv.html("Your Choice " +  "<h2>" + player2Selection + "</h2>");
     
      $(".player2Choices").remove();
      // $("#player2Choices").html(newDiv);
      $("#player2Choices").html(newDiv)
 
     database.ref('/playersRef/2').update({
       choice: player2Selection
    })
 
     turnRef.set(3);
     
})
 
 
})
 
})