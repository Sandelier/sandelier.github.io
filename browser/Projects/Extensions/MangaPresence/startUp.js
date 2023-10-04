const bookVideo = document.getElementById('book-video');
const animationContainer = document.getElementById('book-anim-container');
const startupContainer = document.getElementById('startUp-container');
const videoMap = document.getElementById('video-click-map');

bookVideo.addEventListener('ended', function () {
    startupContainer.style.filter = 'none';
    animationContainer.style.transform = 'translateY(-100%)';

    setTimeout(function () {
        startupContainer.remove();
        adjustFontSizeToFitPages();
    }, 500);
});

videoMap.addEventListener('click', function () {
    if (bookVideo.paused) {
        videoMap.style.display = 'none';
        bookVideo.play();
    }
});

bookVideo.pause();