const bookImage = document.getElementById('book-image');
const animationContainer = document.getElementById('book-anim-container');
const startupContainer = document.getElementById('startUp-container');

bookImage.addEventListener('mouseenter', function() {
    // settimeout 1milliseconds for firefox rendering. 
    setTimeout(function() {
        bookImage.src = 'spinningBook.gif';

        // Gif is little bit smaller then the picture so we have to increase the height.
        startupContainer.style.height = '94vh';
    }, 1);
});

let isTransition = false; // Used so if user clicks the gif and then mvoes mouse he wont see it returning back to test.webp

bookImage.addEventListener('mouseout', function() {
    if (!isTransition) {
        bookImage.src = 'book.webp';
        startupContainer.style.height = '80vh';
    }        
});

bookImage.addEventListener('click', function() {
    startupContainer.style.filter = 'blur(5px)';
    isTransition = true;
    animationContainer.style.transform = 'translateY(-100%)';
    
    setTimeout(function() {
        startupContainer.remove();
        adjustFontSizeToFitPages();
    }, 500);
});