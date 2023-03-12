//Write Statistics information to Firebase storage
// function writeStatistics() {
//     //define a variable for the collection you want to create in Firestore to populate data
//     var forumRef = db.collection("statistics");

//     forumRef.add({
//         reference: "CNN",
//         content: "Approximately 17,800 people work in  Software engineers and designers in British Columbia."
//     });
//     forumRef.add({
//         reference: "New York times",
//         content: "69% of software engineers and designers work all year, while 31% work only part of the year, compared to 56% and 43% respectively among all occupations. "
//     });
//     forumRef.add({
//         reference: "CBC",
//         content: "8% of software engineers and designers are self-employed compared to an average of 14% for all occupations."
//     });
// }

function displayStatisticsCards(collection) {
    let cardTemplate = document.getElementById("statisticsCardTemplate");

    db.collection(collection)
    .get() //the collection called "forums"
    .then((allStatisticsList) => {
        allStatisticsList.forEach((doc) => {

        var content = doc.data().content; // get value of the "content" key
        var reference = doc.data().reference; // get value of the "reference" key
        
        let newcard = cardTemplate.content.cloneNode(true);
        newcard.querySelector("p").innerHTML = content;
        newcard.querySelector(".blockquote-footer").innerHTML = reference;

        document.getElementById(collection + "-go-here").appendChild(newcard);
        var firstCarouselItem = document.querySelector('.carousel-item:first-child');
        firstCarouselItem.classList.add('active');
        });
    });
}
displayStatisticsCards("statistics");  //input param is the name of the collection

// function goForum(){
//     firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//             // Create a new a element
//             var a = document.createElement("a");
            
//             // Set the a element properties
//             a.className = "btn btn-primary btn-lg";
//             a.innerHTML = "Go Forum";
//             a.href = "forum-main.html";
//             a.role = "button";
            
//             // Append the a element to the forumSection element
//             document.getElementById("forumSection").appendChild(a);
//         }else{
            
//         }
//     });
// }
// goForum();

function displayDittoCards(collection) {
    let cardTemplate = document.getElementById("dittoPostTemplate");

    db.collection(collection)
    .orderBy("ditto","desc")
    .limit(3)
    .get() //the collection called "forums"
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // Extract the post data from the document
            var ditto = doc.data().ditto;
            var title = doc.data().title;
      
            let newcard = cardTemplate.content.cloneNode(true);
            newcard.querySelector("h3").innerHTML = ditto;
            newcard.querySelector("p").innerHTML = title;
      
            document.getElementById(collection + "-go-here").appendChild(newcard);
          });
    });
}
displayDittoCards("posts");  //input param is the name of the collection