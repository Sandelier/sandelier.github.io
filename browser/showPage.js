

const headerTabProjectFilePath = document.querySelector('.header-tab-project-file-path');
const headerBottomPath = document.querySelector('.header-bottom-path');
const imgWithPathIconSrc = document.querySelector('#bottom-header-path-left-content img');

function changePage(title, filePath, icon) {
    if (title != null) {
        headerTabProjectFilePath.textContent = title;
    } else {
        headerTabProjectFilePath.textContent = filePath.replace(/^file:\/\//, '');
    }

    headerBottomPath.textContent = filePath;

    imgWithPathIconSrc.src = icon;
}

changePage(null, "file:///C:/Users/Sandelier/Desktop/Projects/MangaPresence.html", "pathIcon.png");