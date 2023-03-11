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
