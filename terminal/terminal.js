





const allProjects = {
    "Extensions": {
        "MangaPresence": {
            "Description": "MangaPresence is a browser extension that, with a node.js server, updates your Discord rich presence based on the manga or anime you're currently reading/watching."
        }
    },
    "Librarys": {
        "Web-forge": {
            "Description": "Web-forge is a command-line tool designed to launch multiple browsers with temporary extensions with automatic reloading."
        }
    },
    "Websites": {
        "github.io": {
            "Description": "Website to tell about myself and showcase my different projects and talk little bit more behind the scene stuff about the projects."
        }
    }
};

const terminalInput = document.getElementById('terminal-input');
const messagesContainer = document.getElementById('messages-container');
const terminalWindow = document.getElementById('terminal-window');

// Makes the input field to focus no matter where you click
document.getElementById("terminal-container").addEventListener("click", function() {
    terminalInput.focus();
});


let previousCommands = [];
let currentCommandIndex = -1;

terminalInput.addEventListener('keydown', function (event) {
    switch (event.key) {
        // Captures the message written and sends to terminal.
        case 'Enter': 
            event.preventDefault();
            const userInput = terminalInput.value;
            terminalInput.value = '';

            // Pushes the userinput to the previousCommands and it only has unique ones. If it has currently a same one then it will remove it and push the new one to the end.
            if (userInput.length >= 1) {
                const index = previousCommands.indexOf(userInput);
                if (index !== -1) {
                    previousCommands.splice(index, 1);
                }
                previousCommands.push(userInput);
                currentCommandIndex = previousCommands.length;
            }

            sendToTerminal('C:\\Users\\Sandelier\\Projects>', userInput, true);
            break;

        // Handling when selecting previous commands.
        case 'ArrowUp':
            if (currentCommandIndex > 0) {
                currentCommandIndex--;
                terminalInput.value = previousCommands[currentCommandIndex];
            }
            break;

        case 'ArrowDown':
            if (currentCommandIndex < previousCommands.length - 1) {
                currentCommandIndex++;
                terminalInput.value = previousCommands[currentCommandIndex];
            // Clearing the input when you reach the end.
            } else if (currentCommandIndex === previousCommands.length - 1) {
                currentCommandIndex = previousCommands.length;
                terminalInput.value = '';
            }
            break;
    }
});

// Sends message to terminal. If checkcommand is true then it will think user sended it and it will check if its an command or not so be careful not to make infinite loop.
function sendToTerminal(location, message, checkCommand = false) {
    const newMessage = document.createElement('p');
    newMessage.textContent = `${location}${message}`;
    messagesContainer.appendChild(newMessage);
    terminalWindow.scrollTop = terminalWindow.scrollHeight;
    if (checkCommand === true && 1 <= message.length) {
        launchCommand(message);
    }
}

function sendEmptyToTerminal() {
    const newMessage = document.createElement('p');
    newMessage.innerHTML = '&nbsp;';
    messagesContainer.appendChild(newMessage);
    terminalWindow.scrollTop = terminalWindow.scrollHeight;
}

// Sends startup message.
function sendStartUpMessage() {
    sendToTerminal('', 'Sandelier.github.io [Version 1.0.0] Date: 3.9.2023');
    sendToTerminal('', 'Every design is from Windows 11.');
    sendEmptyToTerminal();
}
sendStartUpMessage();

function unknownCommand(command) {
    sendToTerminal('', `'${command}' is not recognized as an internal or external command. Use 'help' to see commands`);
}

function invalidArgument(argument, type) {
    switch (type) {
        case 'missing':
            sendToTerminal('', `Argument is missing. Use 'help' to see correct syntax`);
            break;     
        case 'invalid':
            sendToTerminal('', `Argument given was invalid: '${argument}'. Use 'help' to see correct syntax`);
            break;
        case 'notfound':
            sendToTerminal('', `Project: '${argument}' was not found`);
            break;
    }
}

// All should be in lowercase.
function launchCommand(commandMessage) {
    const commandMap = {
        'read': ['type'],
        'list': ['li', 'dir'],
        'help': [],
        'aboutme': ['bio', 'profile', 'whoami', 'about', 'readme'],
        'cd': [],
        'cl': ['clear', 'cls']
    };

    commandMessage = commandMessage.toLowerCase();
    const messageSplitted = commandMessage.split(' ');

    if (messageSplitted.length === 0) {
        return;
    }

    const command = messageSplitted[0];

    const executeCommand = (command) => {
        switch (command) {
            case 'read':
                handleRead(messageSplitted[1]);
                break;
            case 'list':
                sendProjectList();
                break;
            case 'help':
                sendHelp();
                break;
            case 'aboutme':
                sendAboutMe();
                break;
            case 'cd':
                sendToTerminal("", "Changing directorys is in the makings");
                break;
            case 'cl':
                messagesContainer.innerHTML = '';
                sendStartUpMessage();
                break;
        }
    };

    for (const key in commandMap) {
        if (key === command || commandMap[key].includes(command)) {
            executeCommand(key);
            return;
        }
    }

    unknownCommand(command);
}

function handleRead(fileName) {
    if (fileName != undefined) {
        if (fileName.length >= 1) {
            sendReadToTerminal(fileName);
        } else {
            invalidArgument(fileName, 'invalid');
        }
    } else {
        invalidArgument(fileName, 'missing');
    }
}

// Reads the project json and sends the key and values to terminal.
function sendReadToTerminal(fileName) {
    for (const category in allProjects) {
        const projects = allProjects[category];
        for (const project in projects) {
            if (project.toLowerCase() === fileName.toLowerCase()) {
                const projectDetails = projects[project];
                sendToTerminal('', `${project}:`);
                for (const projectDetail in projectDetails) {
                    sendToTerminal('', `- ${projectDetail}: ${projectDetails[projectDetail]}`);
                }
                sendEmptyToTerminal();
                return;
            }
        }
    }
    invalidArgument(fileName, 'notfound');
}

// Sends about me into terminal. Used on aboutme command
function sendAboutMe() {
    sendToTerminal('', 'About me:');
    sendToTerminal('', ' - I am 20 year old developer from finland');
    sendToTerminal('', ' - Currently my primary coding language is Javascript/Nodejs. I do know some Java and minimal amounth of Python.');
    sendToTerminal('', ' - In freetime i usually either code, read mangas or play with my friends.');
    sendToTerminal('', ' - Made 3.9.2023');
    sendEmptyToTerminal();
}

// Sends help into terminal. Used on help command
function sendHelp() {
    sendToTerminal('', 'Available commands:');
    sendEmptyToTerminal();
    sendToTerminal('', 'cd [path] : Changes directory');
    sendToTerminal('', 'cl/clean/cls : Clears the window');
    sendToTerminal('', 'read/type [project_name] : Display project details');
    sendToTerminal('', 'list/li/dir : List available projects');
    sendToTerminal('', 'help : Display this help message');
    sendToTerminal('', 'aboutme/bio/profile/whoami/about/readme : Display information about me.');
    sendEmptyToTerminal();
}

// Sends all the projects into the terminal. Used on li command
function sendProjectList() {
    for (const type in allProjects) {
        sendToTerminal('', type);
        const typeKeys = Object.keys(allProjects[type]);
        for (const key of typeKeys) {
            sendToTerminal('', ` - ${key}`);
        }
    }
    sendEmptyToTerminal();
}