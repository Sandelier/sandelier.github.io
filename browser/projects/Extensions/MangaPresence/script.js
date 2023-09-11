const leftPageContent = document.querySelector('#left-page .page-content');
const rightPageContent = document.querySelector('#right-page .page-content');

function doesContentOverflow(element) {
    return element.offsetHeight < element.scrollHeight;
}

// Basically loops and makes font smaller until it won't overflow anymore.
let minFontSize = 10;

function adjustFontSizeToFitPage(pageContent, pageText) {
    let minSize = minFontSize;
    let maxSize = 30; 

    // Binary search for getting the font since an normal while loop is 2x slower then this which was causing issues with chrome rendering because of forced reflow.
    while (minSize < maxSize) {
        const midSize = Math.ceil((minSize + maxSize) / 2);
        pageText.style.fontSize = midSize + 'px';

        if (doesContentOverflow(pageContent)) {
            maxSize = midSize - 1;
        } else {
            minSize = midSize;
        }
    }

    pageText.style.fontSize = minSize-1 + 'px';
}

function adjustFontSizeToFitPages() {
    let paragraphs = document.querySelectorAll('.page-content .page-text p');

    let leftLines = paragraphs[0].innerHTML.split('<br>');
    let rightLines = paragraphs[1].innerHTML.split('<br>');
    let averageLines = (leftLines.length + rightLines.length) / 2;

    adjustFontSizeToFitPage(leftPageContent, paragraphs[0]);
    adjustFontSizeToFitPage(rightPageContent, paragraphs[1]);


    while (leftLines.length > averageLines) { // Makes it so both divs have around the same line count.
        let lastLine = leftLines.pop();
        rightLines.unshift(lastLine);
    }

    paragraphs[0].innerHTML = leftLines.join('<br>');
    paragraphs[1].innerHTML = rightLines.join('<br>');
}
adjustFontSizeToFitPages();

var resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    // Debounce timer because the resize calls so many events so we dont really wanna adjust it for every update.
    resizeTimer = setTimeout(function () {
        adjustFontSizeToFitPages();
    }, 200);
});
