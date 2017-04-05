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
        chrome.tabs.sendMessage(
            tabs[0].id, { from: 'popup', subject: 'DOMInfo' },
            renderApp);
    });
});

window.onbeforeunload = function() {
    return function(){
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id, { from: 'popup', subject: 'Clear' });
        });
    }
};
