document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();

  var uid = null;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      uid = user.uid;

      var title = document.getElementById('title').value;
      var category = document.getElementById('category').value;
      var content = document.getElementById('content').value;

      db.collection("posts").add({
        title: title,
        interest: category,
        content: content,
        writer: uid,
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        alert("Good.");
        location.href = "forum-list.html";
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
        alert("Bad.");
      });
    }
  });
});