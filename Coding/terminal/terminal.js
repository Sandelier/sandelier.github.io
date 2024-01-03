





const allProjects = {
    "Extensions": {
        "MangaPresence": {}
    },
    "Librarys": {
        "Ext-run": {}
    },
    "Websites": {
        "github.io": {}
    },
    "Programs": {
        "LangWatch2": {}
    },
};

const terminalInput = document.getElementById('terminal-input');
const messagesContainer = document.getElementById('terminal-messages-container');
const terminalWindow = document.getElementById('terminal-window');

// Makes the input field to focus no matter where you click
const terminalFrame = document.querySelector('.draggable-container[data-container="terminal"] .program-frame');
if (terminalFrame) {
    terminalFrame.addEventListener("click", function() {
        terminalInput.focus();
    });
}

// Forces currentpath back if its not at the start.
// In no way is this like perfect or anything but it does its job somewhat ig
terminalInput.addEventListener("input", function() {
    const currentPath = `${directoryManager.getCurrentPath()}>`;
    const value = terminalInput.value;

    if (!value.startsWith(currentPath)) {
        if (value.includes(">")) {
            terminalInput.value = currentPath + value.substring(value.lastIndexOf(">") + 1);
        } else {
            terminalInput.value = currentPath;
        }
    }
});

// Used to easily change directorys.
class DirectoryManager {
    constructor() {
        this.currentDirectory = allProjects;
        this.directoryStack = []; // Directory stack contains the directorys we are currently in.
        this.currentPath = ["C:", "Users", "Sandelier", "Desktop", "Projects"]; // Initializing with the root path.
        terminalInput.value = `${this.getCurrentPath()}>`;
    }

    // Used to do an case-insensitive check.
    findDirectoryIgnoreCase(dirName, directory) {
        dirName = dirName.toLowerCase();
        for (const key in directory) {
            if (key.toLowerCase() === dirName) {
                return { actualCase: key, directory: directory[key] };
            }
        }
        return undefined;
    }

    // Basically it either pops or pushes into directoryStack and currentPath
    changeDirectory(newPath) {
        const parts = newPath.split("/");
        for (const part of parts) {
            if (part.startsWith("..")) {
                if (this.directoryStack.length > 0) {
                    const prev = this.directoryStack.pop();
                    this.currentPath.pop();
                    this.currentDirectory = prev.directory;
                } else {
                    throw new Error("Already at the root directory");
                }
            } else {
                const result = this.findDirectoryIgnoreCase(part, this.currentDirectory);
                if (result && typeof result.directory === 'object') {
                    this.directoryStack.push({ actualCase: result.actualCase, directory: this.currentDirectory });
                    this.currentDirectory = result.directory;
                    this.currentPath.push(result.actualCase);
                } else {
                    throw new Error(`Invalid directory path: ${part}`);
                }
            }
        }
        return this.currentPath.join("\\");
    }

    // Sends all sub directorys to terminal
    sendCurrentSubDirs() {
        const subdirectories = Object.keys(this.currentDirectory); 
        
        if (subdirectories.length === 0) {
            sendToTerminal('', 'There are no subdirectories in this path.');
        } else {
            sendToTerminal('', '- List');
            for (const directory of subdirectories) {
                sendToTerminal('', `-- ${directory}`);
            }
            sendToTerminal('', '--');
        }
    }

    // Used for read with argments
    checkArgumentFilePath(argument, ) {

    }

    // Used for read without arguments to check if you are in a correct directory to read.
    checkForSubDirs() {
        for (const directory in this.currentDirectory) {
            return false;
        }
        return this.currentPath[this.currentPath.length-1];
    }

    getCurrentPath() {
        return this.currentPath.join("\\");
    }
}
  
let directoryManager = new DirectoryManager(); // This is let only because of the "resetDefaults" function.
let previousCommands = [];
let currentCommandIndex = -1;

terminalInput.addEventListener('keydown', function (event) {
    switch (event.key) {
        // Captures the message written and sends to terminal.
        case 'Enter': 
            event.preventDefault();
            const userInput = terminalInput.value;
            terminalInput.value = directoryManager.getCurrentPath() + ">";

            // Pushes the userinput to the previousCommands and it only has unique ones. If it has currently a same one then it will remove it and push the new one to the end.
            if (userInput.length >= 1) {
                const index = previousCommands.indexOf(userInput);
                if (index !== -1) {
                    previousCommands.splice(index, 1);
                }
                previousCommands.push(userInput);
                currentCommandIndex = previousCommands.length;
            }

            sendToTerminal(directoryManager.getCurrentPath(), userInput, true);
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
                terminalInput.value = directoryManager.getCurrentPath() + ">";
            }
            break;
    }
});
  

// Sends message to terminal. If checkcommand is true then it will think user sended it and it will check if its an command or not so be careful not to make infinite loop.
function sendToTerminal(location, message, checkCommand = false) {
    const newMessage = document.createElement('p');

    if (1 <= location.length) {
        newMessage.textContent = `${message}`;
    } else {
        newMessage.textContent = `${message}`;
    }

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
    sendToTerminal('', 'Terminal design is from Windows 11.');
    sendEmptyToTerminal();
}
sendStartUpMessage();

function unknownCommand(command) {
    sendToTerminal('', `'${command}' is not recognized as an internal or external command. Use 'help' to see commands`);
}

function launchCommand(commandMessage) {
    const commandMap = {
        'read': ['type', 'open'],
        'list': ['li', 'dir'],
        'help': [],
        'cl': ['clear', 'cls'],
        'cd': []
    };

    const messageSplitted = commandMessage.match(/^(.*?)\s*>\s*(\w+)\s*(.*)$/);
    if (messageSplitted && messageSplitted[2].length === 0) {
        return;
    }

    const command = messageSplitted[2].toLowerCase();

    const executeCommand = (command) => {
        switch (command) {
            case 'read':
                handleRead();
                break;
            case 'list':
                directoryManager.sendCurrentSubDirs();
                break;
            case 'help':
                sendHelp();
                break;
            case 'cl':
                messagesContainer.innerHTML = '';
                sendStartUpMessage();
                break;
            case 'cd':
                try {
                    directoryManager.changeDirectory(messageSplitted[3]);
                    terminalInput.value = `${directoryManager.getCurrentPath()}>`;
                } catch (error) {
                    sendToTerminal('', error.message);
                }
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

function handleRead(argument) {
    if (argument) {
        // I dont know if i will make the argument. Just leaving it here to remind me later on.
    } else {
        const checkForSubDirs = directoryManager.checkForSubDirs();
        if (checkForSubDirs) {
            sendToTerminal('', `Opening ${checkForSubDirs}`);
            changePageFromTermianl(directoryManager.getCurrentPath()); // changePageFromTerminal is in "showPage.js" of browser directory.
            samePageCheck = checkForSubDirs;
        } else {
            sendToTerminal('', `Was unable to find an file to read. Use 'help' for commands `);
        }
    }
}

// Sends help into terminal. Used on help command
function sendHelp() {
    sendToTerminal('', 'Available commands:');
    sendEmptyToTerminal();
    sendToTerminal('', 'cd [path] : Changes directory. You can use "cd .." to go back in the path');
    sendToTerminal('', 'cl/clean/cls : Clears the window');
    sendToTerminal('', 'read/type/open [project_name] : Display project details');
    sendToTerminal('', 'list/li/dir : Lists subdirectorys');
    sendToTerminal('', 'help : Display this help message');
    sendEmptyToTerminal();
}


function terminalResetToDefaults() {
    directoryManager = new DirectoryManager();
    previousCommands = [];
    currentCommandIndex = -1;
    sendStartUpMessage();
}