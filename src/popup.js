/**
 * Listeners
 */
document.getElementById('add-channel').addEventListener('click', () => {
    let name = getChannelNameFromForm();
    let newChannel = new Channel(name)
    saveChannel(newChannel, (c) => {
        addChannelToTable(newChannel)
        setInputFormEmpty();
    });
});

document.getElementById('clear-channels').addEventListener('click', () => {
    removeAllChannels();
    clearTable();
});

/**
 * Logics
 */

const CHANNEL_COLLECTION = 'channels'

// Executed when the toolbar button is clicked
getSavedChannels((array) => {
    array.forEach(element => {
        addChannelToTable(element)
    });
});


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
                callback(result[CHANNEL_COLLECTION])
            }
        });
}

/**
 * Save the passed channel
 * @param {Channel} channel to save
 * @param {function(Channel[])} callback
 */
function saveChannel(channel, callback) {
    getSavedChannels((channelList) => {
        channelList.push(channel);
        setChannels(channelList, callback(channelList))
    })
}

/**
 * Remove all channels from memory
 */
function removeAllChannels() {
    setChannels(new Array())
}

/**
 * Remove a channel from the memory
 * @param {Channel} channel 
 */
function removeChannel(channel) {
    getSavedChannels((channelList) => {
        channelList = removeElementFromArray(channelList, channel)
        setChannels(channelList)
    })
}

/**
 * Apply changes effectively to the memory
 * @param {Channel[]} channelList to save 
 * @param {function(Object)} callback
 */
function setChannels(channelList, callback) {
    let obj = {
        [CHANNEL_COLLECTION]: channelList
    }
    chrome.storage.sync.set(obj, callback)
}

/*
 *  Utils functions
 */

/**
 * Remove the selected element from the array (if present) and return the modified array
 * @param {any[]} array 
 * @param {any} element
 * @returns {any[]}
 */
function removeElementFromArray(array, element) {
    if (array === undefined ||
        element === undefined)
        return

    array.forEach(
        (value, index) => {
            if (value === element)
                array.splice(index, 1)
        })
    return array;
}


/*
 *  View functions
 */


/**
 * @param {Channel} channel to display
 */
function addChannelToTable(channel) {
    let newRow = getTable().insertRow(-1);
    let newChannelName = newRow.insertCell(0);
    let node = document.createTextNode(channel.name);
    newChannelName.appendChild(node);
}

/**
 * Remove all rows from the table body.
 */
function clearTable() {
    let table = getTable();
    let length = table.rows.length;
    let startFromPosition = 2;

    for (let i = 0; i < length - startFromPosition; i++) {
        table.deleteRow(startFromPosition);
    }
}

function setInputFormEmpty() {
    getInputFormChannel().value = '';
}

function getChannelNameFromForm() {
    return getInputFormChannel().value;
}

function getTable() {
    return document.getElementById('channels-table');
}

function getInputFormChannel() {
    return document.getElementById('channel-input');
}



class Channel {

    constructor(_name, _status = 'on') {
        this.name = _name;
        this.status = _status;
    }

    toString() {
        return 'Channel name: ' + this.name + ' status: ' + this.status;
    }
}