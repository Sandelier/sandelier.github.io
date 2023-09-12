document.addEventListener('DOMContentLoaded', function (event) {

	const menuItems = document.querySelectorAll('#bullet li');
	const divContent = document.querySelectorAll('#bullet li a div');
	const ulList = document.getElementById('bullet');
	const backColor = document.getElementById('backColor');
	const itemHeight = menuItems[0].offsetHeight;
	const totalHeight = itemHeight * menuItems.length;
	const containerHeight = ulList.offsetHeight;
	const verticalOffset = (containerHeight - totalHeight) / (menuItems.length - 1);
	const colorList = [
		'#98FF98'
		// Some more colors later on.
		//'#ff7e7e', 
		//'#C5CBE1', 
		//'#f1ffab', 
		//'#FFD8B1'
	];

	let counter = 0;
	let switchLimiter = false;
	let lock = false;

	// Puts limiter as to how fast you can switch in menu.
	function limiter() {
		switchLimiter = true
		if (!lock) {
			lock = true;
			setTimeout(function () {
				switchLimiter = false;
				lock = false;
			}, 300);
		}
	}

	// Clicking function to menu
	menuItems.forEach((item, index) => {
		item.addEventListener('click', function (event) {
			if (!switchLimiter) {
				limiter();
				event.preventDefault();
				menuItems.forEach(item => item.classList.remove('centered'));
				this.classList.add('centered');
				animatedColorChange(index);
				counter = index;
				const translateY = (index * verticalOffset) * 2 + 25;
				ulList.style.transform = `translateY(-${translateY}px)`;

				divContent.forEach(item => item.classList.remove('active'));
				const divElement = item.querySelector('a > div');
				divElement.classList.add('active');
			}
		});
	});

	// Scroll function to menu
	window.addEventListener('wheel', function (event) {
		const contentPage = document.getElementById('content');
		if (contentPage.style.display !== 'none') {
			if (!switchLimiter) {
				limiter();
				if (counter >= 0 && counter <= menuItems.length) {
					if (event.deltaY < 0) {
						if (counter > 0) {
							counter--;
							activateMenuItem(counter);
						} else {
							counter = menuItems.length - 1;
							activateMenuItem(counter);
						}
					} else if (event.deltaY > 0) {
						if (counter < (menuItems.length-1)) {
							counter++;
							activateMenuItem(counter);
						} else {
							counter = 0;
							activateMenuItem(counter);
						}
					}
				}
			}
		}
	});
	

	// Puts centered class to item that has been clicked or scrolled.
	function activateMenuItem(index) {
		menuItems.forEach((item, i) => {
			if (i === index) {
				item.classList.add('centered');
				animatedColorChange(index);
				const translateY = (i * verticalOffset) * 2 + 25 - (i * 2);
				ulList.style.transform = `translateY(-${translateY}px)`;

				divContent.forEach(item => item.classList.remove('active'));
				const divElement = item.querySelector('a > div');
				divElement.classList.add('active');
			} else {
				item.classList.remove('centered');
			}
		});
	}

	// Puts animation when you change color
	// (BackgroundImage is the clouds)

	const backgroundImage = document.getElementById('backgroundImage');
	const backgroundImageFilters = [
	'brightness(100%) sepia(50%) hue-rotate(120deg) saturate(1000%) contrast(100%)',]; // Supports multiple colors but for now i will just put one.
	function animatedColorChange(index) {
		backgroundImage.style.filter = backgroundImageFilters[index];
		const colorNow = colorList[index];
		backColor.style.transition = 'background-color 0.3s linear';
		backColor.style.backgroundColor = colorNow;
		backColor.addEventListener('transitionend', function handleTransitionEnd() {
			backColor.style.transition = '';
			backColor.style.backgroundColor = colorNow;
			backColor.removeEventListener('transitionend', handleTransitionEnd);
		});
	}

	// Initilization to put What is to be shown.
	activateMenuItem(0);
});