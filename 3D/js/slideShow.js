const sideContainers = document.querySelectorAll('.sideContainer');
const content = document.querySelector('#content');


function findContainerByAttribute(attr) {
    return [...sideContainers].find(container => container.getAttribute('contentIndex') === attr);
}

// Function to change slideshow containers.
function handleClick(clickedElement) {

    // Added mediaquery check also since without it the user would have needed to press two times to open image in phone.
    const widthMediaQuery = window.matchMedia('(max-width: 1100px)');
    const heightMediaQuery = window.matchMedia('(max-height: 650px)');
    if (clickedElement.classList.contains('center') || widthMediaQuery.matches || heightMediaQuery.matches) {
        showOverlay(clickedElement);

        if (clickedElement.classList.contains('center')) {
            return;
        }
    }


    document.querySelector('.center').classList.remove('center');
    const direction = clickedElement.classList.contains('left') ? 'right' : 'left';

    sideContainers.forEach(container => container.classList.remove('left', 'right'));
    clickedElement.classList.add('center', direction);

    const targetIndex = Array.from(sideContainers).indexOf(clickedElement);
    updateContainerClasses(targetIndex);
    hideOthers(clickedElement);

}

// Recalculates the right and left classes.
function updateContainerClasses(centerIndex) {
    sideContainers.forEach((container, index) => {
        container.classList.remove('left', 'right');
        if (index < centerIndex) {
            container.classList.add('left');
        } else if (index > centerIndex) {
            container.classList.add('right');
        }
    });
}

// Hides all the other sidecontainers other then center and the ones next to center.
function hideOthers(clickedElement) {
    sideContainers.forEach(container => container.classList.add('hidden'));
    const index = Array.from(sideContainers).indexOf(clickedElement);
    const visibleContainers = [index, index + 1, index - 1].filter(i => i >= 0 && i < sideContainers.length);
    visibleContainers.forEach(i => sideContainers[i].classList.remove('hidden'));
}

hideOthers(sideContainers[0]);

let currentCenterElement = null;

// Initilizaiton to put the center / right and then putting the contentIndexes so we can easily change colors.
let currentContentIndex = 1;
sideContainers.forEach((container, index) => {
    if (index === 0) {
        container.classList.add('center');
        currentCenterElement = container;
    } else {
        container.classList.add('right');
    }
    currentContentIndex = container.getAttribute('contentIndex') ? parseInt(container.getAttribute('contentIndex')) : currentContentIndex;
    container.setAttribute('contentIndex', currentContentIndex);
    container.addEventListener('click', () => handleClick(container));
});