import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm/LoginForm';

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import DynamicGuides from "./components/DynamicGuides";
import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <LoginForm />
        <Navbar />
        <Sidebar />
        <DynamicGuides />
      </div>
    </BrowserRouter>
  );
}

export default App;
