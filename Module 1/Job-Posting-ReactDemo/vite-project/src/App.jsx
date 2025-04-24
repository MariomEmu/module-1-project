import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './Pages/Dashboard';
import Recruitment from './Pages/Recruitment.jsx';
import NewJobPosting from './Pages/Recruitment/NewJobPosting.jsx';
import ViewJobPosting from './Pages/Recruitment/ViewJobPosting.jsx';

// ... other imports
import EditJobPosting from './Pages/Recruitment/EditJobPosting';

import './App.css';



const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/recruitment/" element={<Recruitment />} />
          <Route path="/recruitment/add-new-job" element={<NewJobPosting />} />
          <Route path="/recruitment/edit-job/:jobId" element={<EditJobPosting />} />
          <Route path="/recruitment/view-job/:jobId" element={<ViewJobPosting />} />

         
        </Routes>
      </div>
    </Router>
  );
}

export default App;  // Make sure this default export exists
