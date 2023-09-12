



function startUp() {
    const powerBtn = document.getElementById('startUp-powerBtn');
    const startUpPage = document.getElementById('startUp');

    powerBtn.classList.add('startUp-powerBtn-active');
    powerBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        powerBtn.style.transform = 'scale(1)';
    }, 100);
    powerBtn.onclick = '';

    startUpPage.style.animation = 'fadeOut 2s linear forwards';
}


function signIn() {
    const initialPage = document.getElementById('initialPage');
    const iframeContainer = document.getElementById('iframeContainer');

    initialPage.style.animation = 'fadeOut 1s linear forwards';
    iframeContainer.style.display = 'flex';
}