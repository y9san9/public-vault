const astroBox = document.getElementById('astro-box');

let clickTimer = null;
let resizeTimer = null;
let clicks = 0;
let hover = false;

function updateAstroBox() {
    if (clickTimer || hover) {
        let text = '';
        if (clicks > 1) {
            text = clicks.toString() + ' ';
        }
        text += '🖕';
        astroBox.textContent = text;
    } else {
        astroBox.textContent = '♐ Click ♐';
    }
}

astroBox.addEventListener('mouseenter', function() {
    hover = true;
    updateAstroBox();
});
astroBox.addEventListener('mouseleave', function() {
    hover = false;
    updateAstroBox();
});
astroBox.onclick = function() {
    if (clickTimer) {
        clearTimeout(clickTimer);
    }
    clickTimer = setTimeout(function() {
        clickTimer = null;
        updateAstroBox();
    }, 2_000);
    clicks++;
    updateAstroBox();
    if (resizeTimer) {
        clearTimeout(resizeTimer);
    }
    let maxScaleFactor;
    if (astroBox.style.scale === "") {
        maxScaleFactor = 1;
    } else {
        maxScaleFactor = parseFloat(astroBox.style.scale);
    }
    maxScaleFactor += 0.3;
    (async function() {
        for (let i = 0; i < 10; i++) {
            const scalePercent = 1 -  i / 10;
            astroBox.style.scale = 1 + (maxScaleFactor - 1) * scalePercent;
            await new Promise(resolve => {
                resizeTimer = setTimeout(resolve, 30);
            });
        }
    })();
};
