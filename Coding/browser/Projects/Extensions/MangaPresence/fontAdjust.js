const leftPageContent = document.querySelector('#left-page .page-content');
const rightPageContent = document.querySelector('#right-page .page-content');
const paragraphs = document.querySelectorAll('.page-content .page-text p');


// Someday have to optimize this because it is quite resource intensive.

function doesContentOverflow(element) {
    return element.offsetHeight < element.scrollHeight;
}

let minFontSize = 10;

 // Binary search for getting the font since an normal while loop is 2x slower then this which was causing issues with chrome rendering because of forced reflow.
function adjustFontSizeToFitPage(pageContent, pageText) {
    let minSize = minFontSize;
    let maxSize = 30;

    while (minSize < maxSize) {
        const midSize = Math.ceil((minSize + maxSize) / 2);
        pageText.style.fontSize = midSize + 'px';

        if (doesContentOverflow(pageContent)) {
            maxSize = midSize - 1;
        } else {
            minSize = midSize;
        }
    }

    return minSize;
}

// Splits the content between each page.
function splitContent() {
    const leftLines = paragraphs[0].innerHTML.split('<br>');
    const rightLines = paragraphs[1].innerHTML.split('<br>');
    const averageLines = (leftLines.length + rightLines.length) / 2;

    while (leftLines.length > averageLines) {
        const lastLine = leftLines.pop();
        rightLines.unshift(lastLine);
    }

    paragraphs[0].innerHTML = leftLines.join('<br>');
    paragraphs[1].innerHTML = rightLines.join('<br>');
}

let splitDone = false;
function adjustFontSizeToFitPages() {
    if (!splitDone) {
        splitDone = true;
        splitContent();
    }

    const leftFontSize = adjustFontSizeToFitPage(leftPageContent, paragraphs[0]);

    const rightFontSize = adjustFontSizeToFitPage(rightPageContent, paragraphs[1]);



    paragraphs[0].style.fontSize = leftFontSize + 'px';
    paragraphs[1].style.fontSize = rightFontSize + 'px';
}

let resizeTimer;
window.addEventListener('resize', function() {
    if (this.window.innerWidth >= 1000 || this.window.innerHeight >= 600) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            adjustFontSizeToFitPages();
        }, 100);
        addToLeftCheck = false;
    } else {
        if (!addToLeftCheck) {
            addRightToLeft();
        }
    }
});

let addToLeftCheck = false;
// Putting all right content to left content if the window size is too small.
function addRightToLeft() {
    const leftLines = paragraphs[0].innerHTML;
    const rightLines = paragraphs[1].innerHTML;

    const combinedLines = leftLines + '<br>' + rightLines;

    paragraphs[0].innerHTML = combinedLines;
    paragraphs[1].innerHTML = ''; 
    splitDone = false; // So we can split it again in adjustfontsizetofitpage.
    addToLeftCheck = true;
}



adjustFontSizeToFitPages(); // So we can load it right at the start when script has loaded. 