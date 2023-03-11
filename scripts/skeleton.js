//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------

function loadSkeleton() {
    $('#navbarPlaceholder').load('./text/nav.html');
    // firebase.auth().onAuthStateChanged(function (user) {
    //     if (user) {
    //         // User is signed in.
    //         // Do something for the user here.
    //         console.log($('#navbarPlaceholder').load('./text/nav.html'));
    //     } else {
    //         // No user is signed in.
    //         console.log($('#loginNavbarPlaceholder').load('./text/loginNav.html'));
    //     }
    // });
}
loadSkeleton(); //invoke the function
