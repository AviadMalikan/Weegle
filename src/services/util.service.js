export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    loadFromStorage,
    saveToStorage,
    convertTime,
    convertFullTime,
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

function convertTime(dateString) {
    const date = new Date(dateString)
    const now = new Date();

    const isToday = date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate();

    if (isToday) {
        const hours = String(date.getHours()).padStart(2, '0'); // Zero padding for hours
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Zero padding for minutes
        return `${hours}:${minutes}`;
    } else {
        const day = String(date.getDate()).padStart(2, '0'); // Zero padding for day
        const month = date.toLocaleString('default', { month: 'short' }).toUpperCase(); // Get month in short form and upper case
        return `${day} ${month}`;
    }
}

function convertFullTime(dateString) {
    const date = new Date(dateString)
    const now = new Date(); // Get the current date
    const diffInTime = now - date; // Difference in milliseconds
    const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24)); // Convert difference to days

    // Format the day and time
    const day = date.getDate(); // Day of the month
    const month = date.toLocaleString('default', { month: 'short' }); // Short month name
    const year = date.getFullYear(); // Full year
    const hours = String(date.getHours()).padStart(2, '0'); // Zero-padded hours
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Zero-padded minutes

    // Generate the output string
    const formattedDate = `${day} ${month} ${year}, ${hours}:${minutes}`;

    // Add "(before X days)" part
    const beforeDays = diffInDays === 0 ? 'today' : `before ${diffInDays} days`;

    return `${formattedDate} (${beforeDays})`;
}