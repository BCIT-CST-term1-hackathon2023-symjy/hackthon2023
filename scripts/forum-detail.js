function writeReview() {
    console.log("inside write review")
    let comment = document.getElementById("comment").value;

    console.log(comment);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var comment = document.getElementById('comment').value;
            var userID = user.uid;
            //get the document for current user.


            db.collection("comments").add({
                userID: userID,
                comment: comment,
            })

        }
    });
}

function displayComments(collection) {
    
  const commentContainer = document.getElementById("comment-container");

  db.collection(collection).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const commentDiv = document.createElement("div");

        const commentText = document.createElement("p");
        const comment = doc.data().comment;
        commentText.textContent = comment;

        commentDiv.appendChild(commentText);

        commentContainer.appendChild(commentDiv);
      });
    })
    .catch((error) => {
      console.error("Error getting comments: ", error);
    });
}

displayComments("comments");
