const sourceBtns = document.querySelectorAll('.sourceBtns');
const sideContainers = document.querySelectorAll('.sideContainer');
const header = document.querySelector('header');
const content = document.querySelector('#content');

const ColorMap = {
    1: { 
        headerColor: '#F2CB05', 
        contentColor: '#267365' 
    },
    2: { 
        headerColor: '#FFD37E', 
        contentColor: '#2C3532' 
    }
};

let currentIndex;

// Button listeners for switching sidecontainers on hover.
sourceBtns.forEach(sourceBtn => {
    sourceBtn.addEventListener('mouseenter', () => {
        const buttonAttr = sourceBtn.getAttribute('contentIndex');
        const sideContainer = findContainerByAttribute(buttonAttr);
        if (sideContainer) {
            handleClick(sideContainer);
        }
        setActiveBtn(buttonAttr);
    });
});

function findContainerByAttribute(attr) {
    return [...sideContainers].find(container => container.getAttribute('contentIndex') === attr);
}

// sourcebtn Active adding and removing
function setActiveBtn(index) {
    if (currentIndex !== index) {
        currentIndex = index;
        document.querySelectorAll('.sourceBtns.active').forEach(activeBtn => {
            activeBtn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`.sourceBtns[contentIndex="${index}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }
}

// Function to change slideshow containers.
function handleClick(clickedElement) {
    if (clickedElement.classList.contains('center')) {
        return;
    }

    document.querySelector('.center').classList.remove('center');
    const direction = clickedElement.classList.contains('left') ? 'right' : 'left';

    sideContainers.forEach(container => container.classList.remove('left', 'right'));
    clickedElement.classList.add('center', direction);

    const targetIndex = Array.from(sideContainers).indexOf(clickedElement);
    updateContainerClasses(targetIndex);
    changeColors(parseInt(clickedElement.getAttribute('contentIndex'), 10));
    hideOthers(clickedElement);
}

// Changing color with index from color map.
function changeColors(index) {
    const colors = ColorMap[index];
    if (colors) {
        header.style.backgroundColor = colors.headerColor;
        content.style.backgroundColor = colors.contentColor;
        setActiveBtn(index);
    }
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


// Initilizaiton to put the center / right and then putting the contentIndexes so we can easily change colors.
let currentContentIndex = 1;
sideContainers.forEach((container, index) => {
    if (index === 0) {
        container.classList.add('center');
    } else {
        container.classList.add('right');
    }
    currentContentIndex = container.getAttribute('contentIndex') ? parseInt(container.getAttribute('contentIndex')) : currentContentIndex;
    container.setAttribute('contentIndex', currentContentIndex);
    container.addEventListener('click', () => handleClick(container));
});



