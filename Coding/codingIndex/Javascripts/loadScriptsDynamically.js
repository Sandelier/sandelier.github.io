


function loadScripts(scripts, callback) {
    var index = 0;

    function loadNextScript() {
        if (index < scripts.length) {
            var script = document.createElement('script');
            script.src = scripts[index];
            script.onload = function() {
                index++;
                loadNextScript();
            };
            document.head.appendChild(script);
        } else {
            if (typeof callback === 'function') {
                callback();
            }
        }
    }

    loadNextScript();
}

if (currentSessionSettings.particles === false) {
    loadScripts([
        'https://cdn.jsdelivr.net/npm/tsparticles@1.33.0',
        'codingIndex/Javascripts/particles.js'
    ], function() {
        console.log("Loaded scripts");
        document.querySelector('.tsparticles-canvas-el').style.pointerEvents = "none";
    });
}