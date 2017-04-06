/*chrome.runtime.onMessage.addListener(function(msg, sender) {
    // First, validate the message's structure
    if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
        // Enable the page-action for the requesting tab
        chrome.pageAction.show(sender.tab.id);
    }
});*/

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "敲门");
  port.onMessage.addListener(function(msg) {
    if (msg.joke == "敲门")
      port.postMessage({question: "是谁？"});
    else if (msg.answer == "女士")
      port.postMessage({question: "哪位女士？"});
    else if (msg.answer == "Bovary 女士")
      port.postMessage({question: "我没听清楚。"});
  });
});