var currentUser;          //put this right after you start script tag before writing any functions.

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userEmail = userDoc.data().email;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userEmail != null) {
                        document.getElementById("emailInput").value = userEmail;
                    }
                })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });
}
populateUserInfo();

var firebaseConfig = {
    // Your Firebase project configuration details
  };
  
  function addTask() {
    // Get the selected values from the dropdowns
    var specialList = document.getElementById("special");
    var specialChoice = specialList.options[specialList.selectedIndex].text;
    var positionList = document.getElementById("position");
    var positionChoice = positionList.options[positionList.selectedIndex].text;
    var careerList = document.getElementById("career");
    var careerChoice = careerList.options[careerList.selectedIndex].text;
    var interestList = document.getElementById("interest");
    var interestChoice = interestList.options[interestList.selectedIndex].text;
  
    //내 로그인 되어있으면
    firebase.auth().onAuthStateChanged((user) => {
        var currentUser = db.collection("users").doc(user.uid);
        var userUID = user.uid;
       
        //Add the selected values to the Firebase database
        db.collection("users").doc(userUID).update({
          secialization: specialChoice,
          position:positionChoice,
          career: careerChoice,
          interest: interestChoice
        }).then(function(){
          console.log("test success");
        }).catch(function(error){
          console.log('error' +error);
        })
    });
}
  