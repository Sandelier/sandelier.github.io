tsParticles.load("iframeContainer", {
    particles: {
        number: {
            value: 30,
            density: {
                enable: false
            }
        },
        color: {
            value: "#ffffff"
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: {
                min: 0.1,
                max: 0.3
            },
            random: true
        },
        size: {
            value: {
                min: 2,
                max: 4
            },
            random: true
        },
        move: {
            enable: true,
            direction: "top",
            out_mode: "out",
            straight: true,
            speed: {
                min: 1,
                max: 2
            }
        },
    },
    fpsLimit: 40,
    detectRetina: true
});





//document.addEventListener("DOMContentLoaded", (event) => {
//    document.querySelector('.tsparticles-canvas-el').style.pointerEvents = "none";
//});