export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    loadFromStorage,
    saveToStorage,
    showTimeTxt,
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function showTimeTxt(pastDate) {
    // Convert string to Date object if necessary
    if (typeof pastDate === 'string') {
        pastDate = new Date(pastDate);
    }
    const now = new Date();
    const diff = now - pastDate; // Time difference in milliseconds

    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const year = day * 365;

    // Convert milliseconds difference to positive number
    const absDiff = Math.abs(diff);
    if (absDiff < 59 * 1000) { // Less than 30 seconds
        return 'now';
    } else if (absDiff < hour) {
        const minutes = Math.floor(absDiff / minute);
        return `${minutes}m`;
    } else if (absDiff < day) {
        const hours = Math.floor(absDiff / hour);
        return `${hours}h`;
    } else if (absDiff < week) {
        const days = Math.floor(absDiff / day);
        return `${days}d`;
    } else if (absDiff < year) {
        const weeks = Math.floor(absDiff / week);
        return `${weeks}w`;
    } else {
        const years = Math.floor(absDiff / year);
        return `${years}y`;
    }

}

