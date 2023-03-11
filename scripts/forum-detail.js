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
