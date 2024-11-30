import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./Dashboard001.css"; // Ensure the CSS file matches the updated component name

import Sidebar from '../components/Sidebar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faFileAlt, faBook, faQuestionCircle, faPhotoVideo, faHeadset } from '@fortawesome/free-solid-svg-icons';



const Dashboard001 = () => {

  return (
    <div className="layout-container-001">
      {/* Sidebar */}
      {/* <div className="sidebar-001">
      <ul>
      <li className={activeItem === '/dashboard' ? 'active-001' : ''}>
        <Link to="/dashboard" onClick={() => handleClick('/dashboard')}>
          <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
        </Link>
      </li>
      <li className={activeItem === '/dynamic-guides' ? 'active-001' : ''}>
        <Link to="/dynamic-guides" onClick={() => handleClick('/dynamic-guides')}>
          <FontAwesomeIcon icon={faFileAlt} /> Dynamic Guides
        </Link>
      </li>
      <li className={activeItem === '/static-guides' ? 'active-001' : ''}>
        <Link to="/static-guides" onClick={() => handleClick('/static-guides')}>
          <FontAwesomeIcon icon={faBook} /> Static Guides
        </Link>
      </li>
      <li className={activeItem === '/faqs' ? 'active-001' : ''}>
        <Link to="/faqs" onClick={() => handleClick('/faqs')}>
          <FontAwesomeIcon icon={faQuestionCircle} /> FAQs
        </Link>
      </li>
      <li className={activeItem === '/media' ? 'active-001' : ''}>
        <Link to="/media" onClick={() => handleClick('/media')}>
          <FontAwesomeIcon icon={faPhotoVideo} /> Media
        </Link>
      </li>
      <li className={activeItem === '/contact-center' ? 'active-001' : ''}>
        <Link to="/contact-center" onClick={() => handleClick('/contact-center')}>
          <FontAwesomeIcon icon={faHeadset} /> Contact Center
        </Link>
      </li>
    </ul>
</div> */}

<Sidebar />

      {/* Main Content */}
      <div className="dashboard-content-001">
        <div className="welcome-container-001">
          <h1>Welcome!</h1>
          <p>
            If you're new to Dezide and want a quick overview of what it's all about, 
            then these are great resources for getting you started. We introduce the core 
            concepts of Dezide and get you on your way to building your knowledge base and 
            going live with Dezide:
          </p>
          <ul>
            <li>Getting to know Dezide</li>
            <li>Building and publishing your first Dynamic Guide</li>
            <li>Building and publishing your first Static Guide</li>
            <li>Building and publishing your first FAQ</li>
            <li>Adding users to Dezide</li>
            <li>Organizing the Contact Center menu</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard001;
