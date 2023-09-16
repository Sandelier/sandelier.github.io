// Dragging

let maxZIndex = 1;

let positions = [];

interact('.iframe-handle').draggable({
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
        end(event) {
            event.target.style.width = "";
            event.target.style.height = "";
        }
    },
})

// Have to add them like this because the restriction dosent get calculated 
// everytime instead its calculated only once i think which causes that you cant set height and width in the start listener.
document.querySelectorAll('.iframe-handle').forEach(handle => {
    handle.addEventListener('mousedown', (event) => {
      const parentElement = event.target.parentElement;
      parentElement.style.zIndex = maxZIndex++;
      event.target.style.width = "100%";
      event.target.style.height = "100%";
    });
    handle.addEventListener('mouseup', (event) => { // Have to have this because if user clicks once and dosent drag then the width and height wont go back default.
        const parentElement = event.target.parentElement;
        parentElement.style.zIndex = maxZIndex++;
        event.target.style.width = "";
        event.target.style.height = "";
      });
});



interact('.resize-handle')
  .resizable({
    modifiers: [
        interact.modifiers.restrictSize({
          min: { width: 500, height: 200 }
        }),
        interact.modifiers.restrict({
            restriction: document.getElementById('iframeContainer')
        })
    ],
    edges: { top: true, left: true, bottom: true, right: true },
    listeners: {
        start(event) {
            event.target.parentElement.style.zIndex = maxZIndex++;
            event.target.style.zIndex = maxZIndex++;
        },
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
    
        parentElement.style.width = `${event.rect.width - (20 - 2)}px`; // 20px = resize-handle border and 2px = draggable-container border. 
        parentElement.style.height = `${event.rect.height - (20 - 2)}px`;
        parentElement.style.transform = `translate(${newX}px, ${newY}px)`;
    
        Object.assign(event.target.dataset, { x, y });
        positions[dataContainer].x = newX;
        positions[dataContainer].y = newY;
    },
    end(event) {
        event.target.style.zIndex = "";
    }
  }
});