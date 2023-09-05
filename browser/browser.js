

// Annoying ass code but well i will think of an better way later on if this causes any performance issues.

window.addEventListener('resize', function() {
    resizeMargins();
});

function resizeMargins() {
    const headerPath = document.getElementById('header-path');
    const minWidth = 840;
    const minMargin = 20;
    const maxMarginLeft = 120;
    const maxMarginRight = 272;

    const availableSpace = window.innerWidth - minWidth;

    let newMargin = availableSpace / 2;

    newMargin = Math.max(newMargin, minMargin);

    let newMarginLeft = newMargin;
    let newMarginRight = newMargin;

    if (newMarginLeft > maxMarginLeft) {
        newMarginLeft = maxMarginLeft;
    }

    if (newMarginRight > maxMarginRight) {
        newMarginRight = maxMarginRight;
    }

    headerPath.style.marginLeft = `${newMarginLeft}px`;
    headerPath.style.marginRight = `${newMarginRight}px`;
}

resizeMargins();