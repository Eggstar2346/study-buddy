
var pageConditions = {
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { schemes: ['https','http'] }
      })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  }
  
  chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([pageConditions]);
    });
  });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.greeting === "GetURL") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.remove(tabs[0].id);
        });
    }
});