const { spawn } = require('child_process');
const { exec } = require('child_process');
const readline = require('readline');
const path = require('path');

// This file is not necessary for the site but its just useful for development.

let pythonServer;

const browserArg = process.argv[2];
const directoryArg = process.argv[3];

const port = 8000;
const url = `http://localhost:${port}/`;

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
}

function startPythonServer() {
    try {
        const serverPath = path.resolve(process.cwd(), directoryArg || '');

        pythonServer = spawn('python', ['-m', 'http.server', port], { cwd: serverPath });
    
        pythonServer.stdout.on('data', (data) => {
            console.log(`Pythons: ${data}`);
        });
    
        pythonServer.stderr.on('data', (data) => {

            // The code is at the end of the string so we are reversing the string.
            // I feel like there is something else that just does this immediately but i just cant remember it :p
            const stderrStr = data.toString(); 
            const reversedStr = stderrStr.split('').reverse().join('');
            const statusCodeMatch = reversedStr.match(/\b(\d{3})\b/g); 


            if (statusCodeMatch) {
                const statusCode = parseInt(statusCodeMatch[0].split('').reverse().join(''), 10);
                if (statusCode !== 200 && statusCode !== 304) {
                    console.error(`Python: ${stderrStr}`);
                }
            } else {
                console.error(`Python: ${stderrStr}`);
            }
        });
    
        pythonServer.on('close', (code) => {
            console.log(`Python server process exited with code ${code}`);
        });
    } catch (error) {
        console.error(`Unable to start Python server. ${error}`);
    }
}

// https://github.com/TooTallNate/keypress/issues/28#issue-643283219
function waitForKeypress() {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on('keypress', (str, key) => {
        if (key.name === 'escape') {
            killProgram();
        } else {
            openBrowser();
        }
    });
}

function killProgram() {
    if (pythonServer) {
        pythonServer.kill();
    }
    process.exit();
}

function startUpMessages() {
    console.log("------------------------------");
    console.log("----- To leave press ESC -----");
    console.log("----- Arg 3 = Directory ------");
    console.log("------ Arg 2 = Browser -------");
    console.log("------------------------------");
}

startUpMessages();

startPythonServer();
openBrowser();
waitForKeypress();