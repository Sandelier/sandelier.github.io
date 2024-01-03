

const overlayContainer = document.getElementById('overlay-container');
const overlayImageEle = document.querySelector('#overlay-content img');

const overlayVideoEle = document.querySelector('#overlay-content video');
const overlayVideoSourceEle = document.querySelector('#overlay-content video source');


function showOverlay(centerElement) {
    setOverlayContent(centerElement)

    overlayContainer.style.display = 'block';

    showViewerBtns(centerElement.getAttribute('name'));

    setTimeout(() => {
        overlayContainer.style.opacity = '1';
    }, 50);

    setTooltipContent(centerElement);
}

function setOverlayContent(centerElement) {
    const centerImgUrl = centerElement.querySelector('img').getAttribute('src');
    const renderUrl = centerImgUrl.replace("Compressed", "Render");

    const formatAttr = centerElement.getAttribute('format');
    if (formatAttr) {
        displayAnimation(renderUrl, formatAttr);
    } else {
        displayImage(renderUrl, centerImgUrl);
    }
}

// Just gets the last dot from the url and changes the ending part to the format attribute like .png to .mp4
function displayAnimation(renderUrl, formatAttr) {
    const dotIndex = renderUrl.lastIndexOf('.');
    if (dotIndex !== -1) {
        const newRenderUrl = renderUrl.substring(0, dotIndex) + '.' + formatAttr;

        overlayVideoSourceEle.src = newRenderUrl;
        overlayVideoSourceEle.type = `video/${formatAttr}`;

        overlayImageEle.style.display = "none";
        overlayVideoEle.style.display = "block";

        overlayVideoEle.load();
    }
}

function displayImage(renderUrl, centerImgUrl) {

    // We need to close it so that we wont see the old picture for fraction of a second.
    overlayImageEle.src = '';

    const img = new Image();
    img.onload = function() {
        overlayImageEle.src = renderUrl;
    };

    // If it fails we will fall back to compressed.
    img.onerror = function() {
        overlayImageEle.src = centerImgUrl;
    };
    img.src = renderUrl;

    overlayVideoEle.style.display = "none";
    overlayImageEle.style.display = "block";
}


// Close button in overlay.
document.getElementById('overlay-closeBtn').addEventListener('click', function() {
    overlayContainer.style.opacity = '0';
    setTimeout(() => {
        overlayContainer.style.display = 'none';
        viewer.style.display = "none";
        viewer.src = "";
    }, 500);
});



// Tooltip

const infoBtn = document.getElementById('overlay-infoBtn');
const infoTooltip = document.getElementById('infoTooltip');

// Closing and opening tooltip
infoBtn.addEventListener('click', function(e) {
    if (!infoTooltip.contains(e.target)) {
        e.stopPropagation();
        infoTooltip.classList.toggle('active');
    }
});

document.addEventListener('click', function(e) {
    if (!infoTooltip.contains(e.target)) {
        infoTooltip.classList.remove('active');
    }
});

// blenderContent is from dynamicContentLoader.js

function setContentText(contentElement, text) {
    contentElement.textContent = text;
    contentElement.style.display = text ? "block" : "none";
}

const infoTooltipDate = document.getElementById('tooltip-date');
const infoTooltipName = document.getElementById('tooltip-name');
const infoTooltipContent = document.getElementById('tooltip-content');

function setTooltipContent(centerElement) {
    let nameKey = centerElement.getAttribute('name');
    let content = blenderContent[nameKey];

    setContentText(infoTooltipContent, content.info);
    setContentText(infoTooltipDate, content.date ? `📅 ${content.date}` : null);
    setContentText(infoTooltipName, nameKey);
}


// 3D button handlers


const solidModelBtn = document.getElementById('overlay-solidModel');
const materialModelBtn = document.getElementById('overlay-materialModel');

const viewer = document.getElementById('viewer');



solidModelBtn.addEventListener('click', function(e) {

    // We can use image location since the model is located in the same place.
    // Basically just removing in example ".png" from the src and replacing it with ".gitf" and setting the viewer.src with it
    const imageLocation = overlayImageEle.src;

    const lastIndex = imageLocation.lastIndexOf('/');
    viewer.src = imageLocation.substring(0, lastIndex + 1) + "Solid.gltf";

    overlayImageEle.style.display = "none";
    viewer.style.display = "block";
});

materialModelBtn.addEventListener('click', function(e) {
    
    const imageLocation = overlayImageEle.src;
    const lastIndex = imageLocation.lastIndexOf('/');
    viewer.src = imageLocation.substring(0, lastIndex + 1) + "Material.gltf";

    overlayImageEle.style.display = "none";
    viewer.style.display = "block";
});

function showViewerBtns(name) {

    const viewerBtns = document.getElementById('overlay-viewerBtns');
    if (blenderContent[name] && blenderContent[name].model === true) {
        viewerBtns.style.display = "flex";
    } else {
        viewerBtns.style.display = "none";
    }
}