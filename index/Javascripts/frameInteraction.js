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
        interact.modifiers.restrictSize({
          min: { width: 500, height: 100 }
        })
    ],
    edges: { top: true, left: true, bottom: true, right: true },
    listeners: {
      move: function (event) {
        let { x, y } = event.target.dataset;

        x = (parseFloat(x) || 0) + event.deltaRect.left;
        y = (parseFloat(y) || 0) + event.deltaRect.top;

        const parentElement = event.target.parentElement;
        const dataContainer = parentElement.getAttribute("data-container");

        if (!positions[dataContainer]) {
          positions[dataContainer] = { x: 0, y: 0 };
        }

        const newX = positions[dataContainer].x + event.deltaRect.left;
        const newY = positions[dataContainer].y + event.deltaRect.top;

        // interact.js "restrictRect" dosent seem to be working for resizable so we have to check the iframecontainer ourself.
        const parentContainer = document.getElementById("iframeContainer");
        const parentRect = parentContainer.getBoundingClientRect();
        const resizedElementRect = event.rect;

        // Checking X / Width if it exceeds the iframecontainer
        const xExceedsBoundary = newX < 0 || newX + resizedElementRect.width > parentRect.width;

        const widthExceedsBoundary = event.rect.width > parentRect.width;

        if (!xExceedsBoundary && !widthExceedsBoundary) {
          parentElement.style.width = `${event.rect.width - (20 - 1)}px`; // 20px is resize-handle borders and 1px is from draggablecontainer border. 
          parentElement.style.transform = `translate(${newX}px, ${positions[dataContainer].y}px)`;
        }

        // Checking Y / Height if it exceeds the iframecontainer
        const yExceedsBoundary = newY < 0 || newY + resizedElementRect.height > parentRect.height;
        const heightExceedsBoundary = event.rect.height > parentRect.height;

        if (!yExceedsBoundary && !heightExceedsBoundary) {
          parentElement.style.height = `${event.rect.height - (20 - 1)}px`; // 20px is resize-handle borders and 1px is from draggablecontainer border. 
          parentElement.style.transform = `translate(${positions[dataContainer].x}px, ${newY}px)`;
        }

        // If both dosent exceed then we add the x and y to datacontainer.
        if (!xExceedsBoundary && !yExceedsBoundary) {
          Object.assign(event.target.dataset, { x, y });
          positions[dataContainer].x = newX;
          positions[dataContainer].y = newY;
        }
      }
    }
  });
    