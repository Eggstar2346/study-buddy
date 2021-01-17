// Block blacklisted websites
findURL = function changeURL(text) {
    var current = window.location.href;
    if (current.startsWith(text)) {
        alert("This site is blocked! Go back to working?");
        chrome.runtime.sendMessage({ greeting: "GetURL" },
            function (response) {
                tabURL = response.navURL;
                $("#tabURL").text(tabURL);
            });
    }
}

findURL("https://www.facebook.com/");