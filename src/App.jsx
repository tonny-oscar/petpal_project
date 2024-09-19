import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Memories from './components/MemoryComponent/memories/memory';
import ImageUpload from './components/MemoryComponent/memories/ImageUpload'; 
import ImageDetail from './components/MemoryComponent/memories/ImageDetail'; 

const App = () => {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Memories />} />
          <Route path="/upload" element={<ImageUpload />} />
          <Route path="/image/:id" element={<ImageDetail />} /> {/* New route for image detail */}
          <Route path='/image/upload'></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
