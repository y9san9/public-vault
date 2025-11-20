// Birth date: December 20, 2003 at 13:25
const birthDate = new Date(2003, 11, 20, 13, 25, 0, 0);
let updateInterval;

function updateAge() {
    const hexElement = document.getElementById('hex-age');
    const realElement = document.getElementById('real-age');
    const hexSquare = document.getElementById('hex-square');

    const now = new Date();
    const ageInMilliseconds = now - birthDate;
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    const ageInHex = ageInYears.toString(16).substring(0, 11).padEnd(11, '0');
    const colorHex = ageInYears.toString(16).replace('.', '').substring(0, 6).padEnd(6, '0');
    const r = parseInt(colorHex.substr(0, 2), 16) / 255;
    const g = parseInt(colorHex.substr(2, 2), 16) / 255;
    const b = parseInt(colorHex.substr(4, 2), 16) / 255;
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    if (realElement) {
        realElement.textContent = ageInYears.toString().substring(0, 12).padEnd(12, '0');
    }
    if (hexElement) {
        hexElement.textContent = '#' + colorHex;
    }
    if (hexSquare) {
        hexSquare.style.backgroundColor = '#' + colorHex;
        hexSquare.style.border = `1px solid ${luminance > 0.5 ? '#000000' : '#FFFFFF'}`;
    }
}

function startCounter() {
    if (!updateInterval) {
        updateInterval = setInterval(updateAge, 50);
    }
}

function stopCounter() {
    if (updateInterval) {
        clearInterval(updateInterval);
        updateInterval = null;
    }
}

function showBirthday() {
    const realElement = document.getElementById('real-age');

    if (realElement) {
        realElement.textContent = '20.12.2003';
    }
}

function initializeCounter() {
    const realElement = document.getElementById('real-age');

    if (realElement) {
        realElement.addEventListener('mouseenter', function() {
            stopCounter();
            showBirthday();
        });
        realElement.addEventListener('mouseleave', function() {
            startCounter();
        });
    }

    startCounter();
}

initializeCounter();
