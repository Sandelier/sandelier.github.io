// We have to increase the zindex of the resize-handle because if you try to drag and it hits the iframe then it will glitch out.
const reziseHandlers = document.querySelectorAll('.resize-handle');
reziseHandlers.forEach((iframe) => {
    iframe.addEventListener('mousedown', (event) => {
        event.target.style.zIndex = maxZIndex++;
    });

    iframe.addEventListener('mouseup', (event) => {
        event.target.style.zIndex = -1;
    });
});

interact('.resize-handle')
    .resizable({
        edges: { top: true, left: true, bottom: true, right: true },
        listeners: {
            move: function(event) {
                let parent = event.target.parentElement;
                let { x, y } = parent.dataset;

                x = (parseFloat(x) || 0) + event.deltaRect.left;
                y = (parseFloat(y) || 0) + event.deltaRect.top;

                Object.assign(parent.style, {
                    width: `${event.rect.width}px`,
                    height: `${event.rect.height}px`,
                    transform: `translate(${x}px, ${y}px)`
                });

                Object.assign(parent.dataset, { x, y });
            }
        }
    });
