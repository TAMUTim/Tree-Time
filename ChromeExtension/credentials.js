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


function initApp() {
    // Listen for auth state changes.
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        document.getElementById('quickstart-button').textContent = 'Sign out';
        document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
        document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
      } else {
        // Let's try to get a Google auth token programmatically.
        document.getElementById('quickstart-button').textContent = 'Sign-in with Google';
        document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
        document.getElementById('quickstart-account-details').textContent = 'null';
      }
      document.getElementById('quickstart-button').disabled = false;
    });
  
    document.getElementById('quickstart-button').addEventListener('click', startSignIn, false);
  }
  
  /**
   * Start the auth flow and authorizes to Firebase.
   * @param{boolean} interactive True if the OAuth flow should request with an interactive mode.
   */
  function startAuth(interactive) {
    // Request an OAuth token from the Chrome Identity API.
    chrome.identity.getAuthToken({interactive: !!interactive}, function(token) {
      if (chrome.runtime.lastError && !interactive) {
        console.log('It was not possible to get a token programmatically.');
      } else if(chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else if (token) {
        // Authorize Firebase with the OAuth Access Token.
        var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
        firebase.auth().signInWithCredential(credential).catch(function(error) {
          // The OAuth token might have been invalidated. Lets' remove it from cache.
          if (error.code === 'auth/invalid-credential') {
            chrome.identity.removeCachedAuthToken({token: token}, function() {
              startAuth(interactive);
            });
          }
        });
      } else {
        console.error('The OAuth Token was null');
      }
    });
  }
  
  /**
   * Starts the sign-in process.
   */
  function startSignIn() {
    document.getElementById('quickstart-button').disabled = true;
    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
    } else {
      startAuth(true);
    }
  }
  
  window.onload = function() {
    initApp();
  };