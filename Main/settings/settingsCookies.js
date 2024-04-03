


function removeAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
}


function setSettingsCookie(name, value, expiresDays) {
    let expires = "";
    if (expiresDays) {
        const date = new Date();
        date.setTime(date.getTime() + (expiresDays * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
}



function getSettingsCookie(name) {
    const nameEQ = name + "=";
    const cookiesArray = document.cookie.split(';');
    for(let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}



let currentSessionSettings = {
    resize: false,
    drag: false,
    particles: false
};

function settingsInitialization() {
    const serializedSettings = getSettingsCookie("userSettings");

    if (serializedSettings) {
        currentSessionSettings = JSON.parse(serializedSettings);
    }
}

settingsInitialization();


function setSettingValue(key, value) {
    if (currentSessionSettings.hasOwnProperty(key) && value != undefined) {
        currentSessionSettings[key] = value;

        let serializedSettings = JSON.stringify(currentSessionSettings);
        setSettingsCookie("userSettings", serializedSettings, 7);
    }
}

function setCurrentToCookie() {
    let serializedSettings = JSON.stringify(currentSessionSettings);
    setSettingsCookie("userSettings", serializedSettings, 7);
}