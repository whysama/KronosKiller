chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name == "Kronos");
    port.onDisconnect.addListener(function(msg) {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { from: 'popup', subject: 'Clear' },
                function(response) {
                    console.log("GoodJob!");
                });
        });
    });
});
