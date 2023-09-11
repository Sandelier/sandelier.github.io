

const headerTabProjectFilePath = document.querySelector('.browser-header-tab-project-file-path');
const headerBottomPath = document.querySelector('.browser-header-bottom-path');
const imgWithPathIconSrc = document.querySelector('#browser-bottom-header-path-left-content img');
const websiteIframe = document.getElementById("browser-iframe-website");

function changePage(title, filePath, icon) {
    if (title != null) {
        headerTabProjectFilePath.textContent = title;
    } else {
        headerTabProjectFilePath.textContent = filePath.replace(/^file:\/\//, '');
    }

    headerBottomPath.textContent = filePath;

    imgWithPathIconSrc.src = icon;
    
    const projectsIndex = filePath.indexOf('Projects');
    websiteIframe.src = ("browser/" + filePath.slice(projectsIndex));
    console.log(filePath.slice(projectsIndex));
}

const draggableContainers = document.querySelectorAll('.draggable-container');

window.addEventListener('message', event => {

    draggableContainers.forEach(container => {
        container.style.display = 'block';
    });

    const pathParts = event.data.replace(/\\/g, '/').split('/');

    const filename = pathParts[pathParts.length - 1];

    const newPath = `file:///${event.data}/${filename}.html`;
    changePage(null, newPath, "browser/pathIcon.png");
});