
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