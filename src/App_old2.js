import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm/LoginForm';
import Navbar881 from "./components/Navbar881";
import Sidebar880 from "./components/Sidebar880";
import DynamicGuides882 from "./components/DynamicGuides882";
import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

function MainApp() {
  return (
    <div className="App">
      {/* Show Navbar and Sidebar */}
      <Navbar881 />
      <div className="main-layout">
        <Sidebar880 />
        <div className="content-area">
          <Routes>
            {/* Default route: Redirect to Login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Login Page */}
            <Route path="/login" element={<LoginForm />} />

            {/* Dynamic Guides Page */}
            <Route path="/dynamic-guides" element={<DynamicGuides882 />} />

            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
