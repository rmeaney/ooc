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
$("#sub").on("click", function() {

  // Grabs user input
    var videoTitle = $("#searchBtn").val().trim();
    var ytUrl = ($("#submitBTN").val().trim();  
    var startTime = $("#userHoursInputStartInput", "#userMinutesInputStartInput", "#userSecondsInputStartInput").val().trim();
    var endTime = $("#userHoursInputEndInput", "#userMinutesInputEnd", "#userSecondsInputEndInput").val().trim();

     // Creates local "temporary" object for holding train data
    var newVideo = {
        title: videoTitle,
        url: ytUrl,
        start: startTime,
        end: endTime, 
    }

    // Upload to the database
    database.ref().push(newVideo);

    // Log  everything to console
    console.log(newVideo.title);
    console.log(newVideo.url);
    console.log(newVideo.start);
    console.log(newVideo.end);

    // Alert
    alert("Youtube database successfully added");

    // Clears all text-boxes
    $("#searchBtn")).val("");
    $("#submitBTN").val("");
    $("#userHoursInputStartInput", "#userMinutesInputStartInput", "#userSecondsInputStartInput").val("");
    $("#userHoursInputEndInput", "#userMinutesInputEndInput", "#userSecondsInputEndInput").val("");

    //  Calculates when next train arrives.
    return false;
});


// 4. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    //bank
    var tVideoTitle = childSnapshot.val().title;
    var tUrl = childSnapshot.val().url;
    var tStartTime = childSnapshot.val().start;
    var tEndTime = childSnapshot.val().end;

    //Calculate 
    // var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
    // var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency;
    // var tMinutes = parseInt(tFrequency) - parseInt(tRemainder);


    // var tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    // console.log(tMinutes);
    // console.log(tArrival);

    // console.log(moment().format("hh:mm A"));
    // console.log(tArrival);
    // console.log(moment().format("X"));

    // Add train's data 
    $("#videoTable > tbody").append("<tr><td>" + tVideoTitle + "</td><td>" + tUrl + "</td><td>" + tStart + "</td><td>" + tEnd + "</td><td>");

});




