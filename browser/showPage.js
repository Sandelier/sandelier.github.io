

const headerTabProjectFilePath = document.querySelector('.browser-header-tab-project-file-path');
const websiteIframe = document.getElementById("browser-iframe-website");

function changePage(title, filePath, icon) {
    if (title != null) {
        headerTabProjectFilePath.textContent = title;
    } else {
        headerTabProjectFilePath.textContent = filePath.replace(/^file:\/\//, '');
    }
    
    const projectsIndex = filePath.indexOf('Projects');
    websiteIframe.src = ("browser/" + filePath.slice(projectsIndex));
    console.log(filePath.slice(projectsIndex));
}


window.addEventListener('message', event => {

    activateProgram("browser");

    const pathParts = event.data.replace(/\\/g, '/').split('/');

    const filename = pathParts[pathParts.length - 1];

    const newPath = `file:///${event.data}/${filename}.html`;
    changePage(null, newPath, "browser/pathIcon.png");
});