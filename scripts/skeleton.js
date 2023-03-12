//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------

function loadSkeleton() {
    $('#navbarPlaceholder').load('./text/nav.html');
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Do something for the user here.
            if(document.getElementById("goForum")!=null){
                document.getElementById("goForum").style.display = 'inline';
            }
            $('#navbarPlaceholder').load('./text/nav.html');
        } else {
            // No user is signed in.
            if(document.getElementById("goForum")!=null){
                document.getElementById("goForum").style.display = 'none';
            }
            $('#navbarPlaceholder').load('./text/nav-before-login.html');
        }
    });
}
loadSkeleton(); 

//invoke the function
function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");
        window.location.href="index.html";
      }).catch((error) => {
        // An error happened.
      });
  }
