
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