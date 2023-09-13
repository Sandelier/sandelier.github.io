

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
        const parentElement = handle.parentElement;
        const dataContainer = parentElement.getAttribute("data-container");
        if (!positions[dataContainer]) {
          positions[dataContainer] = { x: 0, y: 0 };
        }
      },
      move(event) {
        const handle = event.target;
        const parentElement = handle.parentElement;
        const dataContainer = parentElement.getAttribute("data-container");

        positions[dataContainer].x += event.dx;
        positions[dataContainer].y += event.dy;

        parentElement.style.transform = `translate(${positions[dataContainer].x}px, ${positions[dataContainer].y}px)`;
        parentElement.dataset.x = positions[dataContainer].x;
        parentElement.dataset.y = positions[dataContainer].y;
      },
    },
  });

// Increasing z indexes when clicked.

const iframeHandles = document.querySelectorAll('.iframe-handle');
iframeHandles.forEach((iframe) => {
    iframe.addEventListener('mousedown', (event) => {
        event.target.style.height = "100%";
        event.target.style.width = "100%";
        event.target.parentElement.style.zIndex = maxZIndex++;
    });

    iframe.addEventListener('mouseup', (event) => {
        event.target.style.height = "";
        event.target.style.width = "";
    });
});

// Resizing
// We have to increase the zindex of the resize-handle because if you try to drag and it hits the iframe then it will glitch out.
const reziseHandlers = document.querySelectorAll('.resize-handle');
reziseHandlers.forEach((iframe) => {
    iframe.addEventListener('mousedown', (event) => {
        event.target.parentElement.style.zIndex = maxZIndex++;
        event.target.style.zIndex = maxZIndex++;
    });

    iframe.addEventListener('mouseup', (event) => {
        event.target.style.zIndex = "";
    });
});



interact('.resize-handle')
  .resizable({
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: document.getElementById('iframeContainer')
      })
    ],
    edges: { top: true, left: true, bottom: true, right: true },
    listeners: {
      move(event) {
        const handle = event.target;
        const parentElement = handle.parentElement;
        const dataContainer = parentElement.getAttribute("data-container");

        if (!positions[dataContainer]) {
          positions[dataContainer] = { x: 0, y: 0 };
        }

        const x = positions[dataContainer].x + event.deltaRect.left;
        const y = positions[dataContainer].y + event.deltaRect.top;


        Object.assign(parentElement.style, {
          width: `${event.rect.width - 20}px`, // -20px is the border from resize-handle
          height: `${event.rect.height - 20}px`,
          transform: `translate(${x}px, ${y}px)`
        });

        positions[dataContainer].x = x;
        positions[dataContainer].y = y;

        parentElement.dataset.x = x;
        parentElement.dataset.y = y;
      },
    },
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