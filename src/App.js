import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginForm from './LoginForm/LoginForm';
import Navbar881 from "./components/Navbar881";
import DynamicGuides882 from "./components/DynamicGuides882";
import Dashboard001 from "./components/Dashboard001";
import CreateDynamicGuide002 from "./components/CreateDynamicGuide002";
import ImportDynamicGuide003 from "./components/ImportDynamicGuide003";
import TurbineDashboard004 from "./components/TurbineDashboard004";
import GuideDashboard005 from "./components/GuideDashboard005";
import GuideQuestionItem from "./components/GuideQuestionItem006";

import EditExplanation from "./components/EditExplanation";

import PreviewComponent920 from "./components/PreviewComponent920";

import ConstraintsPage921 from "./components/Constraints921";

import PauseSession224 from "./components/PauseSession224";

import Images009 from "./components/Images009";

import Videos010 from "./components/Videos010";

import files011 from "./components/File011";

import './styles.css';
import File011 from './components/File011';

function App() {
  return (
    <HashRouter>
      <MainApp />
    </HashRouter>
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
            <Route path="/edit-explanation" element={<EditExplanation />} />

            <Route path="/analytics-dashboard" element={<TurbineDashboard004 />} />

            <Route path="/guide-dashboard" element={<GuideDashboard005 />} />

            <Route path="/guide-question-item" element={<GuideQuestionItem />} />

            <Route path="/preview" element={<PreviewComponent920 />} />

            <Route path="/constraints" element={<ConstraintsPage921 />} />

            <Route path="/pause-session" element={<PauseSession224 />} />

            <Route path="/images" element={<Images009 />} />

            <Route path="/videos" element={<Videos010 />} />

            <Route path="/files" element={<File011 />} />

            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
