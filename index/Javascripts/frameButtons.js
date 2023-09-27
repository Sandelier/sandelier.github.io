// It gets the clicked element <p> children and tries to find the draggable-container that has data-container with same text
const draggableConts = document.querySelectorAll('.draggable-container');
function getProgram(dataText) {
	for (const container of draggableConts) {
    	if (container.getAttribute('data-container') === dataText) {
        	return container;
    	}
	}
	return false;
}

function activateProgram(dataText, clickedEle = null) {
	const program = getProgram(dataText);
	if (program) {
		program.style.display = "block";
		program.style.zIndex = maxZIndex++;
		if (clickedEle) {
			clickedEle.classList.remove('highlighted');
		}
	}
}


const browserGithubLink = document.getElementById("browser-github-link");

// This puts the display to none but also resets it.
function closeProgram(dataText) {
	const program = getProgram(dataText);
	if (program) {
		program.classList.add("exit-animation");
    	program.addEventListener("transitionend", function() {
    	    program.style.display = "none";
    	    program.classList.remove("exit-animation");

			const removableDatas = program.querySelectorAll('.removableData');
			removableDatas.forEach(data => {
        		while (data.firstChild) {
        	    	data.removeChild(data.firstChild);
        		}
				if (data.tagName === 'IFRAME') {
					data.src = 'browser/default/default.html'; // for iframe in browser.
				}
    		});
			program.style.display = 'none';
			program.style.width = '';
			program.style.height = '';
			program.style.transform = '';
			positions[dataText] = '';

        	if (dataText === 'terminal') {
        	    terminalResetToDefaults();
        	}

			// Resetting the github link in browser back to normal. From showPage.js
			browserGithubLink.href = "https://github.com/Sandelier/sandelier.github.io"
    	});
	}
}

// This puts the program to maximium size
function maxiProgram(dataText) {
	const program = getProgram(dataText);
	if (program) {
		const frameContainer = document.getElementById('iframeContainer');
		const newWidth = frameContainer.clientWidth;
		const newHeight = frameContainer.clientHeight;
		program.style.width = newWidth + 'px';
		program.style.height = newHeight + 'px';
		program.style.transform = '';
		positions[dataText] = '';
	}
}

// This just puts the display to none
function minProgram(dataText) {
	const program = getProgram(dataText);
	if (program) {
		program.classList.add("minimize-transition");
    	program.addEventListener("transitionend", function() {
    	    program.style.display = "none";
    	    program.classList.remove("minimize-transition");
    	});
	}
}


// Resizing containers if they go outside the window.
let debounceCheck;
const iframeContainer = document.getElementById('iframeContainer');

window.addEventListener('resize', function () {
    clearTimeout(debounceCheck);
    debounceCheck = setTimeout(function () {
        for (const container of draggableConts) {
            resizeContainerIfOutside(container);
        }
    }, 200);
});

function resizeContainerIfOutside(container) {
	if (window.getComputedStyle(container).display !== "none") {
		if (isOutside(container)) {
			maxiProgram(container.getAttribute('data-container'));
		}
	}
}

function isOutside(container) {
    const containerRect = container.getBoundingClientRect();
    const iframeRect = iframeContainer.getBoundingClientRect();
    
	const margin = 5;

    return (
        containerRect.right - margin > iframeRect.right ||
        containerRect.left + margin < iframeRect.left ||
        containerRect.bottom - margin > iframeRect.bottom ||
        containerRect.top + margin < iframeRect.top
    );
}