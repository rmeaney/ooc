
// <script src="https://www.gstatic.com/firebasejs/4.1.3/firebase.js"></script>
// <!-- Button to create yt data -->
// <button type="submit" class="btn btn-primary" id="addYtBtn">Submit</button>


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCLPgcEMd90AqZanzcfmiGAJslssbsQJ80",
    authDomain: "oocdb-5989b.firebaseapp.com",
    databaseURL: "https://oocdb-5989b.firebaseio.com",
    projectId: "oocdb-5989b",
    storageBucket: "",
    messagingSenderId: "467106640313"
  };
  firebase.initializeApp(config);

// 2. Populate Firebase Database with initial data (in this case, I did this via Firebase GUI)
   var database= firebase.database(); 
   
// 3. Button for adding yt
$("#addYtBtn").on("click", function() {

  // Grabs user input
    var startTime = $("#startTimeInput").val().trim();
    var endTIme = $("#endTimeInput").val().trim();
    var ytUrl = moment($("#ytUrlInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var videoTitle = $("#videoTitleInput").val().trim();

     // Creates local "temporary" object for holding train data
    var newVideo = {
        name: startTime,
        destination: endTime,
        firstTrain: firstTrainUnix,
        frequency: frequency
    }

    // Upload to the database
    database.ref().push(newTrain);

    // Log  everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(firstTrainUnix);
    console.log(newTrain.frequency)

    // Alert
    alert("Train successfully added");

    // Clears all text-boxes
    $("#startTimeInput").val("");
    $("#endTimeInput").val("");
    $("#ytUrlInput").val("");
    $("#videoTitleInput").val("");

    //  Calculates when next train arrives.
    return false;
});


// 4. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    //bank
    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().firstTrain;

    //Calculate 
    var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
    var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency;
    var tMinutes = parseInt(tFrequency) - parseInt(tRemainder);


    var tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    console.log(tMinutes);
    console.log(tArrival);

    console.log(moment().format("hh:mm A"));
    console.log(tArrival);
    console.log(moment().format("X"));

    // Add train's data 
    $("#trainTable > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");

});




