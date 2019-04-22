chrome.runtime.onMessage.addListener(
    function (request) {
        if (request.message === 'yt' && isLoggedIn()) {
            console.log('Logged')

            let channelName = getChannelNameFromForm();
            isSavedChannel(channelName, (result) => {
                if (result === true)    
                    executeLike()
            })
        }
    }
);

const CHANNEL_COLLECTION = 'channels'

/**
 * Check if the user is logged
 * @returns {boolean} true if the user is logged, false otherwise
 */
function isLoggedIn() {
    // if this element is found the user is not logged
    let logged = document.querySelector('ytd-masthead#masthead div#container div#end ytd-button-renderer')
    return logged === null
}

/**
 * @param {String} channelName 
 * @param {function(boolean)} callback 
 */
function isSavedChannel(channelName, callback) {
    console.log("channel name: " + channelName)
    getSavedChannels((result) => {
        console.log(result)
        let r = result.find((value) => {
            return value.name === channelName
        })
        callback(r !== undefined)
    })
}

/**
 * Get all saved channels
 * @param {function(Channel[])} callback
 */
function getSavedChannels(callback) {
    chrome.storage.sync.get(CHANNEL_COLLECTION,
        (result) => {
            if (result[CHANNEL_COLLECTION] === undefined) {
                console.log('Channels empty')
                callback(new Array())
            } else {
                console.log('Channels not empty')
                callback(result[CHANNEL_COLLECTION])
            }
        });
}

/**
 * Likes the video in the current YT page.
 */
function executeLike() {
    if (isLiked() === true) {
        return
    }
    setTimeout(() => {
        let likeBtn = document.querySelectorAll('#info .style-scope yt-icon-button')[0];
        likeBtn.click();
        console.log('Liked video');
    }, 1000)
}

/**
 * @returns {String}
 */
function getChannelNameFromForm() {
    return document.querySelector('#owner-container a').textContent;
}

/**
 * @returns {boolean}
 */
function isLiked() {
    return getLikeBtn().getAttribute('aria-pressed') === 'true';
}

function getLikeBtn() {
    return document.querySelector('#info').querySelector('yt-icon-button#button');
}