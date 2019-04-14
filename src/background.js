chrome.webNavigation.onHistoryStateUpdated.addListener(function () {
    notifyContent();
});

chrome.webNavigation.onCompleted.addListener(function () {
    notifyContent();
});

function notifyContent () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { 'message': 'yt' });
    });
}
