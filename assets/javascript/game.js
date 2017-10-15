
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





$('body').on('click', '#addPlayer', function(){


    connectionsRef.once("value", function(snapshot){

        console.log("line 64 " + snapshot.numChildren());

        //when only one player/client is connected
        if(snapshot.numChildren() === 1){
          // var con = connectionsRef.push(true);
          database.ref("/playersRef/" + snapshot.numChildren()).set({
            
                 player1: $("#playerName").val(),
                 wins: 0,
                 losses: 0
          
               });

          var player1 = playersRef.child(1);
          console.log("Player 1" + player1);

        

          player1.onDisconnect().remove();
           $("#playerName").remove();
           $('#addPlayer').remove();

        }


        else if(snapshot.numChildren() === 2){
           // var con = connectionsRef.push(true);
           database.ref("/playersRef/" + snapshot.numChildren()).set({
            
                 player2: $("#playerName").val(),
                 wins: 0,
                 losses: 0
          
               });
          
           var player2 = playersRef.child(2);
           console.log("Player 2" + player2);
           player2.onDisconnect().remove();

           $("#playerName").remove();
           $('#addPlayer').remove();
           
        }



    })

displayName();
})





//this is to keep track of connections 
connectedRef.on("value", function(snap) {

//   console.log("line 31 " + snap.val());
//   // If they are connected..
if (snap.val()) {

//     // Add user to the connections list.
    var con = connectionsRef.push(true);

//     // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
}
 });





//   function submitCreateAccount(){

//   		var displayName = $("#add-player").val().trim();
//   		count++;


//       if(count ===1 ){
//         		 database.ref("/players/" + count).set({
//         		 	  displayName:displayName,
//                 wins: wins1,
//                 losses:losses1
//                 });
//             $(".submit").show();
//             $(".playerName").show();

//       }
//       else {  
//                database.ref("/players/" + count).set({
//                 displayName:displayName,
//                 wins: wins2,
//                 losses:losses2
                 
//              });
//               $(".submit").show();
//               $(".playerName").show();      
// }


//      if(count === 2)
//      		 	count = 0;

//   }



function displayName(){
  		

 connectionsRef.once("value", function(snapshot){

  if(snapshot.numChildren() === 1){
      database.ref("/playersRef/"+ snapshot.numChildren()).on("value", function(snap) {
           var player1 = snap.val().player1;
           // $("#playerNames").empty();
           $("#playerNames").html("Hi " + player1 + "You are player1");
           $("#playerNames").css({'text-align':'center'});
           $(".submit").hide();
           $(".playerName").hide();

       
            })
  		}

else   if(snapshot.numChildren() === 2){
      database.ref("/playersRef/" + snapshot.numChildren()).on("value", function(snap) {
           var  player2 = snap.val().player2;

           $("#playerNames").css({'text-align':'center'});
           $("#playerNames").html("Hi " + player2 + "You are player2");
           $(".submit").hide();
           $(".playerName").hide();

        
        
            })


  }

  })
}


