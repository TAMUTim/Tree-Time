const firebaseConfig = {
    apiKey: "AIzaSyDQZDZvHw_A-C1JeaCoQf-wAuX1ktguOjw",
    authDomain: "aquarium-16311.firebaseapp.com",
    projectId: "aquarium-16311",
    storageBucket: "aquarium-16311.appspot.com",
    messagingSenderId: "1076310005415",
    appId: "1:1076310005415:web:987e4a527840e272386d82",
    measurementId: "G-2VFRWS6FL9"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();


function initApp() {
var today = new Date();   
    // Listen for auth state changes.
    firebase.auth().onAuthStateChanged(function(user) {
      console.log('User state change detected from the Background script of the Chrome Extension:', user);
      if (user) {
        console.log("Accessing db");
        setInterval(() => {
            chrome.tabs.query({}, function(tabs) {
              let links = []
              tabs.forEach(function(tab) {
                console.log(tab.url);
                links.push(tab.url);
              });
              console.log("Putting db");
              db.collection("users").doc(user.uid).set({
                urls:links,
                time: today.getTime()
            })
            });
          }, 5000);
    } else {
      // No user is signed in.
    };


    });
  }
  
  window.onload = function() {
    initApp();
  };
    