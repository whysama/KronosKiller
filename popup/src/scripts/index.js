import React from 'react';
import { render } from 'react-dom';
import App from './components/app/App';

function renderApp(info) {
    render( <App projects = { info.projects }
        period = { info.period }
        disabled = { info.disabled }
        />, document.getElementById('app')
    );
}

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { from: 'popup', subject: 'DOMInfo' }, renderApp);
    });

    var port = chrome.runtime.connect({name: "敲门"});
    port.postMessage({joke: "敲门"});
    port.onMessage.addListener(function(msg) {
      if (msg.question == "是谁？")
        port.postMessage({answer: "女士"});
      else if (msg.question == "哪位女士？")
        port.postMessage({answer: "Bovary 女士"});
    });
});

window.addEventListener("unload", function (event) {
    // background.console.log(event);
    background.console.log(id);
    chrome.tabs.sendMessage(id, { from: 'popup', subject: 'Clear' }, function(response) {
        console.log("GoodJob!");
    });
}, true);