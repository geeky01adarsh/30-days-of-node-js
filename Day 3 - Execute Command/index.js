const { exec } = require("child_process");

const executeCommand = (command) => {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
};

executeCommand("ls -la");
// Expected Output: (output of ls -la)

executeCommand('echo "Hello, Node.js!"');
// Expected Output: Hello, Node.js!
