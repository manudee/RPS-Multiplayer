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

  var name={}
  //all our connections will be stored here
  var connectionsRef = database.ref("/connections");

  //info/connected returns a boolean to see if a client is connected to database
  var connectedRef = database.ref(".info/connected");

  var playersRef = database.ref("/playersRef");



  //initial text for greeting
  // var player1 = "waiting for player 1";
  // var player2 = "waiting for player 2";

 // var playerName = "waiting for player 1";
 // var player2Name = "waiting for player 2";

  // var choices = ["Rock", "Paper", "Scissors"];



//create input text field and append to playerNames div
var input = $("<input id=playerName type=text placeholder=Name>");
$("#playerNames").append(input);


var button = $("<button id=addPlayer value=submit type=submit>Submit</button>");
button.addClass("btn btn-primary btn-default");
$("#playerNames").append(button);


// 1. if player 1 joins and clicks submit , add his object to the database
// 2. display his information on his screen
// 3. Till the 2nd person joins, player1 name should be displayed on every screen.
// 4. Once second person hits submit, player1 name and player2 name should be displayed on their divs area.

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



connectionsRef.once("value", function(snapshot){

  console.log("Number of Connections are " + snapshot.numChildren());

  if(snapshot.numChildren() !==0 ){
    database.ref('/playersRef/1').on("value", function(snapshot){

    // console.log("Player1 " + snapshot.val().player1);
    $('#player1').html("<h3>" + snapshot.val().player1 + "</h3>" );

  })

}

//   if(snapshot.numChildren() === 2 ){
//     database.ref('/playersRef/2').on("value", function(snapshot){

//     // console.log("Player1 " + snapshot.val().player1);
//     $('#player2').html("<h3>" + snapshot.val().player2 + "</h3>" );

//   })
  
// }


})



$('body').on("click", "#addPlayer", function(){  

var playerName = $("#playerName").val().trim();
console.log(player1);

connectionsRef.once("value", function(snapshot){


  if(snapshot.numChildren() === 1){
        database.ref('/playersRef/' + snapshot.numChildren()).set({
            player1: playerName,
            wins: 0,
            losses:0
        })

  database.ref('/playersRef').on("child_added", function(snap, prevChildKey){
    var p1 = snap.key;
    name[p1]=snap.val().player1;
    console.log("Player1 " + p1 );
    $('#player1').html("<h3>" + name[p1] + "</h3>" );

})
 

}

  else  if(snapshot.numChildren() === 2) {
        database.ref('/playersRef/' + snapshot.numChildren()).set({
            player2: playerName,
            wins: 0,
            losses:0
        })
  database.ref('/playersRef/2').on("value", function(snap){
      console.log("Player2 " + snap.val().player2);
      $('#player2').html("<h3>" + snap.val().player2 + "</h3>" );

    });


}

})

})