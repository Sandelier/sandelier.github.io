

// Dragging

let maxZIndex = 1;

let positions = [];

interact('.iframe-handle')
  .draggable({
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: document.getElementById('iframeContainer')
      })
    ],
    listeners: {
      start(event) {
        const handle = event.target;
        const index = Array.from(iframeHandles).indexOf(handle);

        if (!positions[index]) {
          positions[index] = { x: 0, y: 0 };
        }
      },
      move(event) {
        const handle = event.target;
        const parentElement = handle.parentElement;

        const index = Array.from(iframeHandles).indexOf(handle);

        positions[index].x += event.dx;
        positions[index].y += event.dy;

        parentElement.style.zIndex = maxZIndex++;

        parentElement.style.transform = `translate(${positions[index].x}px, ${positions[index].y}px)`;
        parentElement.dataset.x = positions[index].x;
        parentElement.dataset.y = positions[index].y;
      },
    },
});

const iframeHandles = document.querySelectorAll('.iframe-handle');
iframeHandles.forEach((iframe) => {
    iframe.addEventListener('mousedown', (event) => {
        event.target.style.height = "100%";
    });

    iframe.addEventListener('mouseup', (event) => {
        event.target.style.height = "40px";
    });
});


// Resizing

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


    
// Raise z index.

const raiseIndex = document.querySelectorAll('.raiseIndex');

raiseIndex.forEach(button => {
  button.addEventListener('click', () => {
    const containerName = button.getAttribute('data-container');
    const containers = document.querySelectorAll(`[data-container="${containerName}"]`);

    containers.forEach(container => {
      container.style.zIndex = maxZIndex++;
    });
  });
});