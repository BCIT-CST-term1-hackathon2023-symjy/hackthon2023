//Write Forums information to Firebase storage
// function writeForums() {
//     //define a variable for the collection you want to create in Firestore to populate data
//     var forumRef = db.collection("forums");

//     forumRef.add({
//         specialization: "Front-end",
//         description: "Refers to the part of a web application that the user interacts with directly. It involves the design, development, and implementation of the user interface, as well as the functionality of the application that the user can see and interact with.",
//         interest: "HTML, CSS, JavaScript, TypeScript, React, Angular, Vue, jQuery, Bootstrap"
//     });
//     forumRef.add({
//         specialization: "Back-end",
//         description: "Refers to the server-side of a web application, which includes the database, server, and application logic. It is responsible for processing and storing data, managing user authentication and authorization, and communicating with other services or APIs.",
//         interest: "Python, Java, PHP, C, C++, C#, Ruby on Rails, Node.js, .NET, Django, Flask, Laravel, Express"
//     });
// }

// // move to forum main page
// function goForum(){
//     window.location.href='forum-main.html';
// }

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayForumCards(collection) {
  let cardTemplate = document.getElementById("forumListCardTemplate");
  let params = new URL(window.location.href); //get URL of search bar
  let ID = params.searchParams.get("docID"); //get value for key "id"

  db.collection(collection)
    .get() //the collection called "forums"
    .then((allForumsList) => {
      allForumsList.forEach((doc) => {
        var compareSpeial;
        console.log(ID);
        if (ID == "L0fzq07tnQ8q9AlR2YBg") {
          compareSpecial = "Front-end";
        } else {
          compareSpecial = "Back-end";
        }

        var specialization = doc.data().specialization; // get value of the "interest" key
        if (compareSpecial == specialization) {
          var interest = doc.data().interest; // get value of the "interest" key
          var title = doc.data().title; // get value of the "title" key
          var writer = doc.data().writer; // get value of the "writer" key
          var docID = doc.id;

          let newcard = cardTemplate.content.cloneNode(true);
          db.collection("users")
            .doc(writer)
            .get()
            .then((doc) => {
              console.log("writer: " + writer);
              var name = doc.data().name;
              newcard.querySelector("small").innerHTML = name;
              newcard.querySelector("h5").innerHTML = interest;
              newcard.querySelector("p").innerHTML = title;
              newcard.querySelector("a").href =
                "forum-detail.html?docID=" + docID;

              document
                .getElementById(collection + "-go-here")
                .appendChild(newcard);
            });
        }
      });
    });
}
displayForumCards("posts"); //input param is the name of the collection

function goPost() {
  let params = new URL(window.location.href); //get URL of search bar
  let ID = params.searchParams.get("docID"); //get value for key "id"

  window.location.href = 'forum-write.html?docID=' + ID;
}

function goChat() {
  let params = new URL(window.location.href); //get URL of search bar
  let ID = params.searchParams.get("docID"); //get value for key "id"

  if (ID == "L0fzq07tnQ8q9AlR2YBg") {
    window.location.href = "front-chat.html";
  } else {
    window.location.href = "back-chat.html";
  }
}
