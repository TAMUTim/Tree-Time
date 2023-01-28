setInterval(() => {
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      console.log(tab.url);
    });
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
