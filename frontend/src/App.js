// App.js

import React from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="app-layout">
        <div className="toolbar-container">
          <PipelineToolbar />
        </div>

        <div className="content-container">
          <PipelineUI />
          <SubmitButton />
        </div>
      </div>
    </div>
  );
}

export default App;
