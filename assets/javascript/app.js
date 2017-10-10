  (function () {var config = {
    apiKey: "AIzaSyB_DKm5hWrvC0wY5bzspNeAjZCjvu3TcdI",
    authDomain: "multiplayergamerps.firebaseapp.com",
    databaseURL: "https://multiplayergamerps.firebaseio.com",
    projectId: "multiplayergamerps",
    storageBucket: "",
    messagingSenderId: "194144422802"
  };
  firebase.initializeApp(config);





  const preObject = $("#object").val().trim();


  const dbRefObj = firebase.database().ref().child('player/losses');

  dbRefObj.on('value', snap => console.log(snap.val()));

} ());