let isDragging = false;
let currentDraggable = null;
let offsetX, offsetY;
let maxZIndex = 1;

function startDrag(e) {
    if (e.target.classList.contains('iframe-handle')) {
        isDragging = true;
        currentDraggable = e.target.parentElement;
        currentDraggable.style.zIndex = maxZIndex++;
        const containerRect = currentDraggable.getBoundingClientRect();
        offsetX = e.clientX - containerRect.left;
        offsetY = e.clientY - containerRect.top;
    }
}

function stopDrag() {
    isDragging = false;
    currentDraggable = null;
}


function dragContainer(e) {
    if (!isDragging) return;

    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    // Making sure the drag dosent go to negatives
    const newX = Math.max(0, x);
    const newY = Math.max(0, y);

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Making sure that elements dont go beyond the viewport
    const maxX = Math.min(newX, viewportWidth - currentDraggable.offsetWidth);
    const maxY = Math.min(newY, viewportHeight - currentDraggable.offsetHeight);

    currentDraggable.style.left = maxX + 'px';
    currentDraggable.style.top = maxY + 'px';
}

const handles = document.querySelectorAll('.iframe-handle');
handles.forEach((handle) => {
    handle.addEventListener('mousedown', startDrag);
});

document.addEventListener('mousemove', dragContainer);
document.addEventListener('mouseup', stopDrag);



