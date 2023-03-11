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