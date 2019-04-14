chrome.runtime.onMessage.addListener(
    function (request) {
        if (request.message === 'yt') {
            let channelName = getChannelNameFromForm();
            isSavedChannel(channelName, (result) => {
                if (result[channelName] === true) {
                    executeLike();
                }
            });
        }
    }
);

function getChannelNameFromForm () {
    return document.querySelector('#owner-container a').textContent;
}

/**
 * @param {String} channelName is the name of the channel
 * @param {*} callback callback function(result) where result is boolean
 */
function isSavedChannel (channelName, callback) {
    console.log('looking for: ' + channelName);
    chrome.storage.sync.get(channelName, callback);
}

/**
 * Likes the video in the current YT page.
 */
function executeLike () {
    if (isLiked() === false) {
        let likeBtn = document.querySelectorAll('#info .style-scope yt-icon-button')[0];
        likeBtn.click();
        console.log('liked');
    }
}

/**
 * returns {boolean}
 */
function isLiked () {
    return getLikeBtn().getAttribute('aria-pressed') === 'true';
}

function getLikeBtn () {
    return document.querySelector('#info').querySelector('yt-icon-button#button');
}
