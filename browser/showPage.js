

const headerTabProjectFilePath = document.querySelector('.browser-header-tab-project-file-path');
const websiteIframe = document.getElementById("browser-iframe-website");

function changePage(filePath) {

    headerTabProjectFilePath.textContent = filePath.replace(/\\/g, '/');;
    
    const projectsIndex = filePath.indexOf('Projects');
    websiteIframe.src = ("browser/" + filePath.slice(projectsIndex));
}


window.addEventListener('message', event => {

    activateProgram("browser");

    const pathParts = event.data.replace(/\\/g, '/').split('/');

    const filename = pathParts[pathParts.length - 1];

    const newPath = `${event.data}/${filename}.html`;
    changePage(newPath);
});