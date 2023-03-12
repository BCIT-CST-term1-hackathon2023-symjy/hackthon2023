// function insertNameFromFirestore(){
    
//    firebase.auth().onAuthStateChanged(user =>{
//         if (user){
//            console.log(user.uid); // let me to know who is the user that logged in to get the UID
//            currentUser = db.collection("posts").doc(user.uid); // will to to the firestore and go to the document of the user
//            currentUser.get().then(userDoc=>{
//                //get the user name
//                var userTitle= userDoc.data().title;
//                var userContent= userDoc.data().content;
//                console.log(userName);
//                //$("#name-goes-here").text(userName); //jquery
//                var storyDiv = document.querySelector(".story")
//                var storyH2 = storyDiv.querySelector("h2");
//                storyH2.innerText=userTitle;
               
//            })    
//        }    
//     })}

// insertNameFromFirestore();

function displayDetailsInfo() {
  console.log("ss");
  let params = new URL( window.location.href ); //get URL of search bar
  let ID = params.searchParams.get( "docID" ); //get value for key "id"
  console.log( ID );

  db.collection( "posts" )
      .doc( ID )
      .get()
      .then( doc => {
          thisDetail = doc.data();
          console.log("good");
          postCode = thisDetail.code;
          detailTitle = doc.data().title;
          detailContent = doc.data().content;
          
          // only populate title and content
          document.getElementById( "detailTitle" ).innerHTML = detailTitle;
          document.getElementById( "detailContent" ).innerHTML = detailContent;
          
      } );
}
displayDetailsInfo();

function writeReview() {
  console.log("inside write review")
  let comment = document.getElementById("comment").value;

  console.log(comment);

  firebase.auth().onAuthStateChanged(user => {
      if (user) {
          var params = new URL(window.location.href)
          var postID = params.searchParams.get("docID");
          localStorage.setItem('listDocID', postID);
          var currentUser = db.collection("users").doc(user.uid);
          var comment = document.getElementById('comment').value;
          var userID = user.uid;
          var timestamp = firebase.firestore.Timestamp.now();

          db.collection("comments").add({
              userID: userID,
              comment: comment,
              postID: postID,
              timestamp: timestamp,
          }).then(() => {
            displayComments("comments", postID);
        })

      }
  });
}

function displayComments(collection, postID) {
  const commentContainer = document.getElementById("comment-container");
  commentContainer.innerHTML = "";

  db.collection(collection)
    .where("postID", "==", postID)
    .orderBy("timestamp", "asc")
    .get()
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

var params = new URL(window.location.href);
var postID = params.searchParams.get("docID");
displayComments("comments", postID);

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    var params = new URL(window.location.href);
    var postID = params.searchParams.get("docID");
    localStorage.setItem('listDocID', postID);
  }
});

