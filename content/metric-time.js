const stMillisecondsInStDay = 1_000 * 60 * 60 * 24;
const stMillisecondsInMTSecond = stMillisecondsInStDay / 10 / 100 / 100;

const metricTime = document.getElementById('metric-time');

setInterval(() => {
    // Date.now() returns since Unix, I need in local timezone
    const now = new Date();
    const stMilliseconds = now.getHours() * 3600_000
                         + now.getMinutes() * 60_000
                         + now.getSeconds() * 1000
                         + now.getMilliseconds();
    const mtSeconds = stMilliseconds / stMillisecondsInMTSecond;
    const mtSecondsString = String(Math.trunc(mtSeconds % 100))
        .padStart(2, '0');
    const mtMinutes = mtSeconds / 100;
    const mtMinutesString = String(Math.trunc(mtMinutes % 100))
        .padStart(2, '0');
    const mtHours =  mtMinutes / 100;
    const mtHoursString = String(Math.trunc(mtHours)).padStart(2, '0');
    metricTime.textContent = `${mtHoursString}:${mtMinutesString}:${mtSecondsString} MT`;
}, stMillisecondsInMTSecond / 2);
