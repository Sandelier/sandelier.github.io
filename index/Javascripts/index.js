
let oldMessage;
window.addEventListener('message', event => {
    if (oldMessage != event.data) {
      oldMessage = event.data;
      const browserFrame = document.getElementById('browserFrame');
      const draggableContainer = document.querySelector('.draggable-container');
      if (!browserFrame.src) {
          browserFrame.src = 'browser/browser.html';
          draggableContainer.style.display = 'block';
          browserFrame.addEventListener('load', () => {
              browserFrame.contentWindow.postMessage(event.data, '*');
          });
      } else {
        draggableContainer.style.display = 'block';
        browserFrame.contentWindow.postMessage(event.data, '*');
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
      container.style.zIndex = maxZIndex++; //maxZIndex is from handleDrag
    });
  });
});