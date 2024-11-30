// CreateDynamicGuide002.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faFileAlt, faBook, faQuestionCircle, faPhotoVideo, faHeadset } from '@fortawesome/free-solid-svg-icons';
import './CreateDynamicGuide002.css'; // Import the CSS file

const CreateDynamicGuide002 = () => {
  // States for dropdowns
  const [turbineModel, setTurbineModel] = useState('');
  const [temperatureVariant, setTemperatureVariant] = useState('');

  return (
    <div className="page-container-002">
      <div className="sidebar-001">
        <ul>
          <li className="active-001">
            <Link to="/dashboard">
              <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/dynamic-guides">
              <FontAwesomeIcon icon={faFileAlt} /> Dynamic Guides
            </Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faBook} /> Static Guides
          </li>
          <li>
            <FontAwesomeIcon icon={faQuestionCircle} /> FAQs
          </li>
          <li>
            <FontAwesomeIcon icon={faPhotoVideo} /> Media
          </li>
          <li>
            <FontAwesomeIcon icon={faHeadset} /> Contact Center
          </li>
        </ul>
      </div>

      <div className="main-content-002">
        <h2>Create Dynamic Guide</h2>
        <div className="form-container-002">
          <div className="form-section-002">
            <h3>Dynamic Guide Information</h3>

            {/* Language Selection */}
            <div className="form-group-002">
              <label htmlFor="language-002">Language</label>
              <select id="language-002">
                <option>Please select language</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                {/* Add more languages as needed */}
              </select>
              <small>The language of this guide, translations can be added later.</small>
            </div>

            {/* Dynamic Guide Name */}
            <div className="form-group-002">
              <label htmlFor="guide-name-002">Dynamic Guide Name</label>
              <input id="guide-name-002" type="text" placeholder="Enter dynamic guide name" />
              <small>The name of the dynamic guide as it appears to end users</small>
            </div>

            {/* Taxonomy - Turbine Model and Temperature Variant */}
            <div className="form-group-002">
              <label htmlFor="turbine-model-002">Turbine Model</label>
              <select
                id="turbine-model-002"
                value={turbineModel}
                onChange={(e) => setTurbineModel(e.target.value)}
              >
                <option value="">Select Turbine Model</option>
                <option value="model1">Model 1</option>
                <option value="model2">Model 2</option>
                <option value="model3">Model 3</option>
              </select>
            </div>

            <div className="form-group-002">
              <label htmlFor="temperature-variant-002">Temperature Variant</label>
              <select
                id="temperature-variant-002"
                value={temperatureVariant}
                onChange={(e) => setTemperatureVariant(e.target.value)}
              >
                <option value="">Select Temperature Variant</option>
                <option value="variant1">Variant 1</option>
                <option value="variant2">Variant 2</option>
                <option value="variant3">Variant 3</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDynamicGuide002;
