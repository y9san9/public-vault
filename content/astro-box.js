const astroBox = document.getElementById('astro-box');
astroBox.addEventListener('mouseenter', function() {
    this.textContent = '🖕';
});
astroBox.addEventListener('mouseleave', function() {
    this.textContent = '♑ Click ♑';
});
