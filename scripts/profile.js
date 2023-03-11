// Initialize Firebase
var firebaseConfig = {
    // Replace with your Firebase config
  };
  firebase.initializeApp(firebaseConfig);
  
  // Get references to Firebase database and authentication
  var database = firebase.database();
  var auth = firebase.auth();
  
  // Get references to HTML elements
  var nameInput = document.getElementById("name");
  var emailInput = document.getElementById("email");
  var locationInput = document.getElementById("location");
  var interestsInput = document.getElementById("interests");
  var positionSelect = document.getElementById("position");
  var careerSelect = document.getElementById("career");
  var addButton = document.querySelector(".Add");
  
  // Listen for changes to the form fields and update Firebase
  addButton.addEventListener("click", function() {
    // Get the user ID and check if they're logged in
    var userId = auth.currentUser.uid;
    if (!userId) {
      return;
    }
  
    // Get the values of the form fields
    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    var location = locationInput.value.trim();
    var interests = interestsInput.value.trim();
    var position = positionSelect.value;
    var career = careerSelect.value;
  
    // Update the data in Firebase
    var userRef = database.ref("users/" + userId);
    userRef.update({
      name: name,
      email: email,
      location: location,
      interests: interests,
      position: position,
      career: career
    });
  });
  
  // Listen for changes to the user authentication state
  auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in
      var userId = user.uid;
  
      // Retrieve the user's data from Firebase
      var userRef = database.ref("users/" + userId);
      userRef.once("value", function(snapshot) {
        var data = snapshot.val();
  
        // Set the values of the form fields
        nameInput.value = data.name || "";
        emailInput.value = data.email || "";
        locationInput.value = data.location || "";
        interestsInput.value = data.interests || "";
        positionSelect.value = data.position || "position-1";
        careerSelect.value = data.career || "career-1";
      });
    } else {
      // User is signed out
      // Clear the values of the form fields
      nameInput.value = "";
      emailInput.value = "";
      locationInput.value = "";
      interestsInput.value = "";
      positionSelect.value = "position-1";
      careerSelect.value = "career-1";
    }
  });
  