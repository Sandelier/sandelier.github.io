const leftPageContent = document.querySelector('#left-page .page-content');
const rightPageContent = document.querySelector('#right-page .page-content');
const paragraphs = document.querySelectorAll('.page-content .page-text p');

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

    return minSize - 1;
}

function adjustFontSizeToFitPages() {
    const leftLines = paragraphs[0].innerHTML.split('<br>');
    const rightLines = paragraphs[1].innerHTML.split('<br>');
    const averageLines = (leftLines.length + rightLines.length) / 2;

    console.log("Left: ", leftLines.length*20);
    console.log("Right: ", rightLines.length*20);

    const leftFontSize = adjustFontSizeToFitPage(leftPageContent, paragraphs[0]);
    const rightFontSize = adjustFontSizeToFitPage(rightPageContent, paragraphs[1]);

    while (leftLines.length > averageLines) {  // Makes it so both divs have around the same line count.
        const lastLine = leftLines.pop();
        rightLines.unshift(lastLine);
    }

    paragraphs[0].innerHTML = leftLines.join('<br>');
    paragraphs[1].innerHTML = rightLines.join('<br>');

    paragraphs[0].style.fontSize = leftFontSize + 'px';
    paragraphs[1].style.fontSize = rightFontSize + 'px';

}

adjustFontSizeToFitPages();

let resizeTimer;
window.addEventListener('resize', function() {
    cancelAnimationFrame(resizeTimer);
    resizeTimer = requestAnimationFrame(function () {
        adjustFontSizeToFitPages();
    });
});