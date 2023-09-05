let isDragging = false;
let currentDraggable = null;
let offsetX, offsetY;

function startDrag(e) {
    if (e.target.classList.contains('iframe-handle')) {
        isDragging = true;
        currentDraggable = e.target.parentElement;
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
    currentDraggable.style.left = x + 'px';
    currentDraggable.style.top = y + 'px';
}

const handles = document.querySelectorAll('.iframe-handle');
handles.forEach((handle) => {
    handle.addEventListener('mousedown', startDrag);
});

document.addEventListener('mousemove', dragContainer);
document.addEventListener('mouseup', stopDrag);