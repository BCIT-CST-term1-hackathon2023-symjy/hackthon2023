document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  let params = new URL( window.location.href ); //get URL of search bar
  let ID = params.searchParams.get( "docID" ); //get value for key "id"
  console.log(ID);

  var uid = null;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      uid = user.uid;

      var title = document.getElementById('title').value;
      var category = document.getElementById('category').value;
      var content = document.getElementById('content').value;
      var specialization = document.getElementById('specialization').value;


      db.collection("posts").add({
        title: title,
        interest: category,
        content: content,
        writer: uid,
        specialization: specialization,
        ditto:0
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        // alert("Post uploaded.");
        location.href = "forum-list.html?docID=" + ID;
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
        alert("Error.");
      });
    }
  });
});