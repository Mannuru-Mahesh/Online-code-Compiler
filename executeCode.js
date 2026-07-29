const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const tempDir = path.join(__dirname, '../temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const executeCode = (language, code, input = '') => {
  return new Promise((resolve, reject) => {
    let fileName = '';
    let compileCmd = '';
    let runCmd = '';

    const timeStamp = Date.now();

    if (language === 'python') {
      fileName = path.join(tempDir, `script_${timeStamp}.py`);
      fs.writeFileSync(fileName, code);
      // On Windows, try 'py' or 'python'
      runCmd = `python "${fileName}"`; 
    } else if (language === 'cpp') {
      fileName = path.join(tempDir, `main_${timeStamp}.cpp`);
      const outPath = path.join(tempDir, `main_${timeStamp}.exe`);
      fs.writeFileSync(fileName, code);
      compileCmd = `g++ "${fileName}" -o "${outPath}"`;
      runCmd = `"${outPath}"`;
    } else if (language === 'javascript') {
      fileName = path.join(tempDir, `script_${timeStamp}.js`);
      fs.writeFileSync(fileName, code);
      runCmd = `node "${fileName}"`;
    } else {
      return reject(new Error('Unsupported language'));
    }

    const execute = (cmdToRun) => {
      const child = exec(cmdToRun, { timeout: 5000 }, (error, stdout, stderr) => {
        // Safe cleanup
        setTimeout(() => {
          if (fs.existsSync(fileName)) {
            try { fs.unlinkSync(fileName); } catch (e) {}
          }
        }, 1000);

        if (error) {
          if (error.killed) {
            return resolve({ output: 'Execution timed out (5s limit).' });
          }
          return resolve({ output: stderr || error.message });
        }
        resolve({ output: stdout || stderr });
      });

      // Pass user input to standard input
      if (input && child.stdin) {
        child.stdin.write(input + '\n');
        child.stdin.end();
      }
    };

    if (compileCmd) {
      exec(compileCmd, (compileErr, stdout, stderr) => {
        if (compileErr) {
          if (fs.existsSync(fileName)) fs.unlinkSync(fileName);
          return resolve({ output: stderr || compileErr.message });
        }
        execute(runCmd);
      });
    } else {
      execute(runCmd);
    }
  });
};

module.exports = { executeCode };