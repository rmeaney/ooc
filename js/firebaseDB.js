
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCJ6899v8Dn_6PkVktN1nDID6XvtB8P1Gg",
    authDomain: "outofcontextdatabase.firebaseapp.com",
    databaseURL: "https://outofcontextdatabase.firebaseio.com",
    projectId: "outofcontextdatabase",
    storageBucket: "outofcontextdatabase.appspot.com",
    messagingSenderId: "25545536521"
  };
  firebase.initializeApp(config);
 var database = firebase.database()

    // Setting initial value of our click counter variable to 0
    var clickCounter = 0;

    // FUNCTIONS + EVENTS
    // --------------------------------------------------------------------------------

    // On Click of Button
    $(document).on("click","#submitToDbBTN", function() {

      //  Store Click Data to Firebase in a JSON property called clickCount
      // Note how we are using the Firebase .set() method
      
        event.preventDefault();



        // grab user input
         var itemUrl = $('#outputLink').text();
         console.log(itemUrl);
         var itemTitle = $("#userTitle").val().trim();
         console.log(itemTitle);
         var itemStart = $('#videoStartTime').text();
         console.log(itemStart)
         var itemStop = $('#videoEndTime').text();
         console.log(itemStop);
         var itemButton = '<a href = '+ itemUrl + ' target = "_blank"><button class = "dbButton">Click Here</button></a>'

         if (itemTitle == ''){
          $('#noTitleModal').modal('show');
         }else{

         //upload employee data to the database
         var newVid ={
          ytUrl: itemUrl,
          ytTitle: itemTitle,
          ytStart: itemStart,
          ytStop: itemStop,
          ytButton: itemButton
         };

         //log the local vars in the object
         //console.log(newVid.ytUrl);
         //console.log(newVid.ytTitle);
         //console.log(newVid.ytStart);
         //console.log(newVid.ytStop);

         database.ref().push(newVid);
         $('#dbSuccessModal').modal('show');
       }
     
    });

    // 3. Create Firebase event for adding video to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

    // Store everything into a variable.
  var itemUrl = childSnapshot.val().ytUrl;
  var itemTitle = childSnapshot.val().ytTitle;
  var itemStart = childSnapshot.val().ytStart;
  var itemStop = childSnapshot.val().ytStop;
  var itemButton = childSnapshot.val().ytButton;

  //log the video info
  // Add each train's data into the table
  $("#trainTable > tbody").append("<tr><td>" + itemTitle + "</td><td>" + itemStart + "</td><td>" +
  itemStop + "</td><td>" + itemUrl + "</td><td>" + itemButton + "</td>");

});

    // MAIN PROCESS + INITIAL CODE
    // --------------------------------------------------------------------------------
