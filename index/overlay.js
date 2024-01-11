

/* Overlay */
const aboutmeBtn = document.getElementById('aboutme-button');

const overlay = document.getElementById('overlay');

aboutmeBtn.addEventListener('click', function() {
    overlay.style.display = 'block';
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 50);
});



const overlayBackground = document.getElementById('overlay-background');
overlayBackground.addEventListener('click', function() {
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 50);
});