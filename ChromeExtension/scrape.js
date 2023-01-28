setInterval(() => {
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      console.log("Tab URL: " + tab.url);
    });
  });
}, 5000);
