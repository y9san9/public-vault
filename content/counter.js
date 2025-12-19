// Birth date: December 20, 2003 at 13:25 UTC+3 (10:25 UTC)
const birthDate = new Date(Date.UTC(2003, 11, 20, 10, 25, 0, 0));

let updateInterval;

// Leap years are pain in the ass
//
// And I don't know JS that good to write some readable code. I will pay $5 to
// someone who will make it cleaner XD.
function calculatePreciseAge(birth, now) {
    const birthTime = birth.getTime();
    const nowTime = now.getTime();

    const birthYear = birth.getUTCFullYear();
    const birthMonth = birth.getUTCMonth();
    const birthDay = birth.getUTCDate();
    const birthHour = birth.getUTCHours();
    const birthMinute = birth.getUTCMinutes();
    const birthSecond = birth.getUTCSeconds();
    const birthMs = birth.getUTCMilliseconds();

    const nowYear = now.getUTCFullYear();
    const nowMonth = now.getUTCMonth();
    const nowDay = now.getUTCDate();
    const nowHour = now.getUTCHours();
    const nowMinute = now.getUTCMinutes();
    const nowSecond = now.getUTCSeconds();
    const nowMs = now.getUTCMilliseconds();

    let years = nowYear - birthYear;

    const hadBirthdayThisYear = nowMonth > birthMonth ||
        (nowMonth === birthMonth && nowDay > birthDay) ||
        (nowMonth === birthMonth && nowDay === birthDay && nowHour > birthHour) ||
        (nowMonth === birthMonth && nowDay === birthDay && nowHour === birthHour && nowMinute > birthMinute) ||
        (nowMonth === birthMonth && nowDay === birthDay && nowHour === birthHour && nowMinute === birthMinute && nowSecond > birthSecond) ||
        (nowMonth === birthMonth && nowDay === birthDay && nowHour === birthHour && nowMinute === birthMinute && nowSecond === birthSecond && nowMs >= birthMs);

    if (!hadBirthdayThisYear) {
        years--;
    }

    const lastBirthdayYear = hadBirthdayThisYear ? nowYear : nowYear - 1;
    const lastBirthday = new Date(Date.UTC(
        lastBirthdayYear,
        birthMonth,
        birthDay,
        birthHour,
        birthMinute,
        birthSecond,
        birthMs
    ));

    const nextBirthdayYear = hadBirthdayThisYear ? nowYear + 1 : nowYear;
    const nextBirthday = new Date(Date.UTC(
        nextBirthdayYear,
        birthMonth,
        birthDay,
        birthHour,
        birthMinute,
        birthSecond,
        birthMs
    ));

    const timeSinceLastBirthday = nowTime - lastBirthday.getTime();
    const timeUntilNextBirthday = nextBirthday.getTime() - lastBirthday.getTime();
    const fraction = timeSinceLastBirthday / timeUntilNextBirthday;

    return years + fraction;
}

function updateAge() {
    const hexElement = document.getElementById('hex-age');
    const realElement = document.getElementById('real-age');
    const hexSquare = document.getElementById('hex-square');
    const now = new Date();

    const ageInYears = calculatePreciseAge(birthDate, now);

    const ageInHex = ageInYears.toString(16).replace('.', '').substring(0, 6).padEnd(6, '0');
    const r = parseInt(ageInHex.substr(0, 2), 16) / 255;
    const g = parseInt(ageInHex.substr(2, 2), 16) / 255;
    const b = parseInt(ageInHex.substr(4, 2), 16) / 255;
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    const colorHex = '#' + ageInHex;

    if (realElement) {
        realElement.textContent = ageInYears.toString().substring(0, 12).padEnd(12, '0');
    }
    if (hexElement) {
        if (hexElement.textContent !== colorHex) {
            hexElement.textContent = colorHex;
        }
    }
    if (hexSquare) {
        hexSquare.style.backgroundColor = colorHex;
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

const lambda = 0.0007;
const alpha = 0.00008;
const beta = 0.095;

function annualProbFromHazardAtAge(ageYears) {
    const exp_x = Math.exp(beta * ageYears);
    const exp_x1 = Math.exp(beta * (ageYears + 1));
    const integral = lambda + (alpha / beta) * (exp_x1 - exp_x);
    const p = 1 - Math.exp(-integral);
    return p;
}

function updateMortality() {
    const mortalityCounter = document.getElementById('mortality-counter');
    if (!mortalityCounter) return;
    const now = new Date();
    const ageInYears = calculatePreciseAge(birthDate, now);
    const p = annualProbFromHazardAtAge(ageInYears);
    const percent = (p * 100);
    mortalityCounter.textContent = `${percent.toFixed(11)}% per year`;
}

setInterval(updateMortality, 50);
updateMortality();
