import React, { useState } from 'react';
import '../coding/assets/CodePlayground.css';

const CodeEditor = ({ defaultCode, language }) => {
  const [code, setCode] = useState(defaultCode || '');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const runCode = () => {
    setIsRunning(true);
    
    // For demo purposes, we'll simulate code execution
    // In a real app, you would send this to a backend that can execute the code
    setTimeout(() => {
      if (language === 'python') {
        if (code.includes('print')) {
          // Extract what's inside the print statement using regex
          const printContent = code.match(/print\(("|')(.*?)("|')\)/);
          if (printContent && printContent[2]) {
            setOutput(printContent[2]);
          } else {
            setOutput('[Program executed but no output was produced]');
          }
        } else {
          setOutput('[Program executed but no output was produced]');
        }
      } else {
        setOutput('Language not supported for execution in this demo.');
      }
      setIsRunning(false);
    }, 1000);
  };

  return (
    <div className="code-editor-container">
      <div className="editor-toolbar">
        <span className="language-badge">{language}</span>
        <button
          className="run-button"
          onClick={runCode}
          disabled={isRunning}
        >
          {isRunning ? 'Running...' : 'Run Code'}
        </button>
      </div>
      <textarea
        className="code-textarea"
        value={code}
        onChange={handleCodeChange}
        spellCheck="false"
      />
      {output && (
        <div className="code-output">
          <div className="output-header">Output:</div>
          <div className="output-content">{output}</div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;