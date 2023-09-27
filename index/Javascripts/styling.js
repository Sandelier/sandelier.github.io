
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