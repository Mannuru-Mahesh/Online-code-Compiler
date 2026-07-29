import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import './App.css';

const DEFAULT_CODE = {
  python: 'print("Hello, World!")',
  javascript: 'console.log("Hello, World!");',
  cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!";\n    return 0;\n}'
};

export default function App() {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(DEFAULT_CODE.python);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    setCode(DEFAULT_CODE[lang] || '');
  };

  const handleRun = async () => {
    setLoading(true);
    setOutput('Running code...');

    try {
      const response = await axios.post('http://localhost:5000/run', {
        language,
        code,
        input,
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput(
        error.response?.data?.output || 
        error.response?.data?.error || 
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h2>Online Code Compiler</h2>
        <div className="controls">
          <select value={language} onChange={handleLanguageChange}>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="javascript">JavaScript</option>
          </select>
          <button onClick={handleRun} disabled={loading}>
            {loading ? 'Running...' : 'Run Code'}
          </button>
        </div>
      </header>

      <div className="workspace">
        <div className="editor-pane">
          <Editor
            height="100%"
            language={language === 'cpp' ? 'cpp' : language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
            }}
          />
        </div>

        <div className="io-pane">
          <div className="io-box">
            <h4>Standard Input (stdin)</h4>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Provide input here if required..."
            />
          </div>
          <div className="io-box">
            <h4>Output (stdout / stderr)</h4>
            <pre className="output-screen">{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}