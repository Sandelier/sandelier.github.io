

const websiteIframe = document.getElementById("browser-iframe-website");
const githubLinkHref = document.getElementById("browser-github-link");

function changePage(filePath, fromTerminal = false) {
    if (fromTerminal) {
        const projectsIndex = filePath.indexOf('Projects');
        websiteIframe.src = ("browser/" + filePath.slice(projectsIndex));
    
        const fileName = filePath.split('/').pop();
        githubLinkHref.href = `https://github.com/Sandelier/${fileName.replace('.html', '')}`;
    } else {
        activateProgram("browser");
        websiteIframe.src = "browser/" + filePath;
    }
}

// Receives the path from terminal and then goes to changepage to start it up.
function changePageFromTermianl(path) {
    activateProgram("browser");

    const pathParts = path.replace(/\\/g, '/').split('/');

    const filename = pathParts[pathParts.length - 1];

    const newPath = `${path}/${filename}.html`;
    changePage(newPath, true);
};