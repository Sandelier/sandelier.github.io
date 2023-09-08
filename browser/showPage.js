

const headerTabProjectFilePath = document.querySelector('.header-tab-project-file-path');
const headerBottomPath = document.querySelector('.header-bottom-path');
const imgWithPathIconSrc = document.querySelector('#bottom-header-path-left-content img');
const websiteIframe = document.getElementById("iframe-website");

function changePage(title, filePath, icon) {
    if (title != null) {
        headerTabProjectFilePath.textContent = title;
    } else {
        headerTabProjectFilePath.textContent = filePath.replace(/^file:\/\//, '');
    }

    headerBottomPath.textContent = filePath;

    imgWithPathIconSrc.src = icon;
    
    const projectsIndex = filePath.indexOf('Projects');
    websiteIframe.src = filePath.slice(projectsIndex);
    console.log(filePath.slice(projectsIndex));
}



window.addEventListener('message', event => {
    if (event.origin !== window.location.origin) return;

    const pathParts = event.data.replace(/\\/g, '/').split('/');

    const filename = pathParts[pathParts.length - 1];

    const newPath = `file:///${event.data}/${filename}.html`;

    changePage(null, newPath, "pathIcon.png");
});