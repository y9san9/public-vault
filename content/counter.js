// Birth date: December 20, 2003 at 13:25
const birthDate = new Date(2003, 11, 20, 13, 25, 0, 0);
let updateInterval;

function updateAge() {
    const now = new Date();
    const ageInYears = (now - birthDate) / (1000 * 60 * 60 * 24 * 365.25);
    const ageInHex = ageInYears.toString(16).substring(0, 11);
    document.getElementById('hex-age').textContent = '0x' + ageInHex;
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
    const hexElement = document.getElementById('hex-age');
    hexElement.textContent = '20.12.2003';
}

function initializeCounter() {
    const hexElement = document.getElementById('hex-age');

    hexElement.addEventListener('mouseenter', function() {
        stopCounter();
        showBirthday();
    });

    hexElement.addEventListener('mouseleave', function() {
        startCounter();
    });

    startCounter();
}

initializeCounter();
