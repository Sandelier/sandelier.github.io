const { spawn } = require('child_process');
const { exec } = require('child_process');
const readline = require('readline');
const path = require('path');

// This file is not necessary for the site but its just useful for development.

let pythonServer;

const browserArg = process.argv[2];
const directoryArg = process.argv[3];

const url = "http://localhost:8000/";

function openBrowser() {
    switch (browserArg) {
        case 'brave':
        case 'chrome':
            exec(`start ${browserArg} --incognito ${url}`);
            break;
        case 'msedge':
            exec(`start msedge --inprivate ${url}`);
            break;
        case 'firefox':
            exec(`start firefox --private-window ${url}`);
            break;
        default:
            console.error(`Unknown browser ${browserArg}. Opening firefox.`);
            exec(`start firefox --private-window ${url}`);
            break;
    }

    console.log("------------------------------");
    console.log("----- To leave press ESC -----");
    console.log("----- Arg 3 = Directory ------");
    console.log("------ Arg 2 = Browser -------");
    console.log("------------------------------");
}


function startPythonServer() {
    const serverPath = path.resolve(process.cwd(), directoryArg || '');

    pythonServer = spawn('python', ['-m', 'http.server'], { cwd: serverPath });

    pythonServer.stdout.on('data', (data) => {
        console.log(`Python: ${data}`);
    });

    pythonServer.stderr.on('data', (data) => {
        console.error(`Python error: ${data}`);
    });

    pythonServer.on('close', (code) => {
        console.log(`Python server process exited with code ${code}`);
    });
}

// https://github.com/TooTallNate/keypress/issues/28#issue-643283219
function waitForKeypress() {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on('keypress', (str, key) => {
        if (key.name === 'escape') {
            pythonServer.kill();
            process.exit();
        } else {
            openBrowser();
        }
    });
}

startPythonServer();
openBrowser();
waitForKeypress();