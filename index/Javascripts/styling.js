
const shortcutBtns = document.querySelectorAll('.program-shortcut-button');
function highLightSelection(clickedEle) {
    shortcutBtns.forEach(shortcut => {
    	shortcut.classList.remove('highlighted');
    });
    clickedEle.classList.add('highlighted');
}