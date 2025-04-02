import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faFileAlt, faBook, faQuestionCircle, faPhotoVideo, faHeadset } from '@fortawesome/free-solid-svg-icons';
import './CreateDynamicGuide002.css'; // Import the CSS file

const CreateDynamicGuide002 = () => {
  // States for dropdowns
  const [turbineModel, setTurbineModel] = useState('');
  const [temperatureVariant, setTemperatureVariant] = useState('');
  const [models, setModels] = useState([]); // State to hold turbine models
  const [variants, setVariants] = useState([]); // State to hold temperature variants

  // Fetch Turbine Models and Temperature Variants on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:226/api/fetch_turbine_model_and_temperature_variant', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setModels(data.turbineModels || []); // Assuming the response contains a `turbineModels` field
        setVariants(data.temperatureVariants || []); // Assuming the response contains a `temperatureVariants` field
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run this effect only once

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
              </select>
              <small>The language of this guide, translations can be added later.</small>
            </div>

            {/* Dynamic Guide Name */}
            <div className="form-group-002">
              <label htmlFor="guide-name-002">Name</label>
              <input id="guide-name-002" type="text" placeholder="Enter dynamic guide name" />
              <small>The name of the dynamic guide as it appears to end users</small>
            </div>

            {/* Taxonomy - Turbine Model and Temperature Variant */}
            <div className="form-group-002">
              <label htmlFor="turbine-model-002">Turbine Model</label>
              <select
                id="turbine-model-002"
                value={turbineModel}
                onChange={(e) => setTurbineModel(e.target.value)} // Update turbineModel state on change
              >
                <option value="">Select Turbine Model</option>
                {models.map((model, index) => (
                  <option key={index} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group-002">
              <label htmlFor="temperature-variant-002">Temperature Variant</label>
              <select
                id="temperature-variant-002"
                value={temperatureVariant}
                onChange={(e) => setTemperatureVariant(e.target.value)} // Update temperatureVariant state on change
              >
                <option value="">Select Temperature Variant</option>
                {variants.map((variant, index) => (
                  <option key={index} value={variant}>
                    {variant}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDynamicGuide002;
