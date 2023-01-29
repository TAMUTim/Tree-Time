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

setInterval(() => {
  chrome.tabs.query({}, function(tabs) {
    let links = []
    tabs.forEach(function(tab) {
      console.log(tab.url);
      links.push(tab.url);
    });
    db.collection("users").doc("links").set({
      urls:links
  })
  });
}, 5000);

// chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
//     if (chrome.runtime.lastError) {
//         console.log(chrome.runtime.lastError);
//         return;
//     }

//     // Use the token to authenticate a request to the Google People API
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', 'https://people.googleapis.com/v1/people/me');
//     xhr.setRequestHeader('Authorization', 'Bearer ' + token);
//     xhr.onload = function() {
//         var response = JSON.parse(xhr.responseText);
//         console.log(response.emailAddresses[0].value);
//     };
//     xhr.send();
// });
