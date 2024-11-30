import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginForm from './LoginForm/LoginForm';
import Navbar881 from "./components/Navbar881";
import DynamicGuides882 from "./components/DynamicGuides882";
import Dashboard001 from "./components/Dashboard001";
import CreateDynamicGuide002 from "./components/CreateDynamicGuide002";
import ImportDynamicGuide003 from "./components/ImportDynamicGuide003";
import TurbineDashboard004 from "./components/TurbineDashboard004";
import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

function MainApp() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login'; // Check if current route is login

  return (
    <div className="App">
      {/* Conditionally render Navbar */}
      {!isLoginPage && <Navbar881 />}
      <div className={isLoginPage ? "login-layout" : "main-layout"}>
        <div className={isLoginPage ? "login-content" : "content-area"}>
          <Routes>
            {/* Default route: Redirect to Login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Login Page */}
            <Route path="/login" element={<LoginForm />} />

            {/* Dynamic Guides Page */}
            <Route path="/dynamic-guides" element={<DynamicGuides882 />} />

            <Route path="/dashboard" element={<Dashboard001 />} />
            <Route path="/create-dynamic-guide" element={<CreateDynamicGuide002 />} />
            <Route path="/import-dynamic-guide" element={<ImportDynamicGuide003 />} />

            <Route path="/analytics-dashboard" element={<TurbineDashboard004 />} />

            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
