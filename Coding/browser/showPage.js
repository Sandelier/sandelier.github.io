

const websiteIframe = document.getElementById("browser-iframe-website");
const githubLinkHref = document.getElementById("browser-github-link");

function changePage(filePath, fromTerminal = false, maximize = false, hideGithub = false) {

    githubLinkHref.style.display = "block";
    websiteIframe.style.display = "none";

    websiteIframe.parentElement.style.backgroundImage = "url('browser/loading.svg')";

    if (fromTerminal) {
        const projectsIndex = filePath.indexOf('Projects');
        websiteIframe.src = ("browser/" + filePath.slice(projectsIndex));

        const fileName = filePath.split('/').pop();
        githubLinkHref.href = `https://github.com/Sandelier/${fileName.replace('.html', '')}`;
    } else {
        activateProgram("browser");
        websiteIframe.src = "browser/" + filePath;
    }

    if (maximize) {
        maxiProgram("browser", true);
    }

    if (hideGithub) {
        githubLinkHref.style.display = "none";
    }


    websiteIframe.addEventListener('load', function() {
        console.log('Iframe content has finished loading.');
        websiteIframe.removeEventListener('load', arguments.callee);
        websiteIframe.style.display = "block";
        websiteIframe.parentElement.style.backgroundImage = "none";
    });
}

// Receives the path from terminal and then goes to changepage to start it up.
function changePageFromTermianl(path) {
    activateProgram("browser");

    const pathParts = path.replace(/\\/g, '/').split('/');

    const filename = pathParts[pathParts.length - 1];

    const newPath = `${path}/${filename}.html`;
    console.log(path);
    changePage(newPath, true);
};