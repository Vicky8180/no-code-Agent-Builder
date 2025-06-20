// // App.js
// import { PipelineToolbar } from './toolbar';
// import { PipelineUI } from './ui';
// import { SubmitButton } from './submit';

// function App() {
//   return (
//     <div>
//       <PipelineToolbar />
//       <PipelineUI />
//       <SubmitButton />
//     </div>
//   );
// }

// export default App;



// Updated App.js with improved styling
import React from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
