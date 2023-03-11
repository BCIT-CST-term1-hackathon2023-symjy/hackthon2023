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

// move to forum main page
function goForum(){
    window.location.href='forum-main.html';
}

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayForumCards(collection) {
    let cardTemplate = document.getElementById("forumCardTemplate");

    db.collection(collection).get()   //the collection called "forums"
        .then(allForums=> {
            allForums.forEach(doc => { //iterate thru each doc
                var specialization = doc.data().specialization;       // get value of the "specialization" key
                var description = doc.data().description;       // get value of the "description" key
                var interest= doc.data().interest;       // get value of the "interest" key

                var docID = doc.id;
                console.log(docID);
                let newcard = cardTemplate.content.cloneNode(true);
                newcard.querySelector('h2').innerHTML = specialization;

                const pSelector = newcard.querySelectorAll('p');

                pSelector.item(0).innerHTML = description;
                pSelector.item(1).innerHTML = interest;
                
                newcard.querySelector('a').href = "forum-list.html?docID="+docID;

                document.getElementById(collection + "-go-here").appendChild(newcard);
            })
        })
}
displayForumCards("forums");  //input param is the name of the collection