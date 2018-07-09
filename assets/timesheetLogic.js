// Steps to complete:

// 1. Initialize Firebase



var config = {
  apiKey: "AIzaSyA1au2qzxfd5GIcbsfitibEclHJRclasbY",
  authDomain: "trainscheduler-82993.firebaseapp.com",
  databaseURL: "https://trainscheduler-82993.firebaseio.com",
  projectId: "trainscheduler-82993",
  storageBucket: "",
  messagingSenderId: "1014123017298"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#employee-name-input").val().trim();
  var trainDest = $("#role-input").val().trim();
  var trainTime = $("#start-input").val().trim();
  var trainFreq = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    Destination: trainDest,
    Frequency: trainTime,
    Time: trainFreq
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.Destination);
  console.log(newTrain.Frequency);
  console.log(newTrain.Time);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().Destination;
  var trainTime
   = childSnapshot.val().Frequency;
  var trainFreq = childSnapshot.val().Time;

  // Employee Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainTime);
  console.log(trainFreq);

  // Prettify the train start
  // var trainTime
  // Pretty = moment.minute(trainTime);

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  // var empMonths = moment().diff(moment(trainTime
  //   , "X"), "months");
  // console.log(empMonths);

  // Calculate the total billed rate
  // var empBilled = empMonths * trainFreq;
  // console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainTime),
    $("<td>").text(trainFreq),
    
  );

  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
});


