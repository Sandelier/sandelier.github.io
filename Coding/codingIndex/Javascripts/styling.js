



// Note
//// Maybe it would be better to make it have like an object pool 
//// so we dont need to keep destroying each pulsecontainer in pulseanimation instead we could just hide them.


const shortcutBtns = document.querySelectorAll('.program-shortcut-button');
function highLightSelection(clickedEle) {
    shortcutBtns.forEach(shortcut => {
    	shortcut.classList.remove('highlighted');
    });
    clickedEle.classList.add('highlighted');
}

// Pulsing event when clicking background.
iframeContainer.addEventListener('click', (event) => {
    if (event.target.id == "iframeContainer") {

        const left = `${event.clientX - 15}px`; // 15 is magic number. 10 is from the width an dheight and 5 is just to make to bbe in front of cursor.
        const top = `${event.clientY - 15}px`;
        for (let i = 0; i < 2; i++) {
            const delay = 100 * i;
            pulseAnimation(delay, left, top);
        }

        // Removing highlight from shortcuts.
        shortcutBtns.forEach(shortcut => {
    	    shortcut.classList.remove('highlighted');
        });
    }
})

function pulseAnimation(delay, left, top) {
    setTimeout(() => {
        const pulseContainer = document.createElement('div');
        pulseContainer.classList.add('pulse-effect');
        pulseContainer.style.left = left
        pulseContainer.style.top = top
        iframeContainer.appendChild(pulseContainer);
        pulseContainer.addEventListener('animationend', () => {
            pulseContainer.remove();
        });
    }, delay);
}


let lastPulseTime = 0;
let lastMousePosition = { x: 0, y: 0 };
const miniumTime = 300; // milliseconds.

// Mouse moving pulse animation
iframeContainer.addEventListener('mousemove', (event) => {
    const currentPosition = { x: event.clientX, y: event.clientY };
    const isDistance = calculateDistance(lastMousePosition, currentPosition);

    if (event.target.id == "iframeContainer" && Date.now() - lastPulseTime >= miniumTime && isDistance) {
        const left = `${event.clientX - 15}px`;
        const top = `${event.clientY - 15}px`;
        for (let i = 0; i < 2; i++) {
            const delay = 100 * i;
            pulseAnimation(delay, left, top);
        }
        lastPulseTime = Date.now(); 
        lastMousePosition = currentPosition;
    }
});

// https://stackoverflow.com/a/33743107
const miniumDistance = 100;
function calculateDistance(point1, point2) {
    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;
    return Math.sqrt(dx * dx + dy * dy) >= miniumDistance;
}
