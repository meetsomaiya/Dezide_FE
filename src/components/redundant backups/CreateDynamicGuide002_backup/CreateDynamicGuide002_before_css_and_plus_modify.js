import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faFileAlt, faBook, faQuestionCircle, faPhotoVideo, faHeadset, faPlus } from '@fortawesome/free-solid-svg-icons';
import './CreateDynamicGuide002.css'; // Import the CSS file

const CreateDynamicGuide002 = () => {
  // States for dropdowns
  const [models, setModels] = useState([]); // State to hold turbine models
  const [variants, setVariants] = useState([]); // State to hold temperature variants

  // State variables for visibility and values of each "box"
  const [isBoxVisible1, setIsBoxVisible1] = useState(false);
  const [turbineModel1, setTurbineModel1] = useState('');
  const [temperatureVariant1, setTemperatureVariant1] = useState('');

  const [isBoxVisible2, setIsBoxVisible2] = useState(false);
  const [turbineModel2, setTurbineModel2] = useState('');
  const [temperatureVariant2, setTemperatureVariant2] = useState('');

  const [isBoxVisible3, setIsBoxVisible3] = useState(false);
  const [turbineModel3, setTurbineModel3] = useState('');
  const [temperatureVariant3, setTemperatureVariant3] = useState('');

  const handleToggleBox1 = () => {
    setIsBoxVisible1(!isBoxVisible1); // Toggle visibility for box 1
  };

  const handleToggleBox2 = () => {
    setIsBoxVisible2(!isBoxVisible2); // Toggle visibility for box 2
  };

  const handleToggleBox3 = () => {
    setIsBoxVisible3(!isBoxVisible3); // Toggle visibility for box 3
  };

  const handleClickPlusIcon = (model, variant) => {
    // Perform another function when the plus icon is clicked for a specific model/variant
    console.log(`Plus icon clicked for model: ${model} and variant: ${variant}`);
  };

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
            {/* Box 1 */}
            <div className="form-group-002">
              <label htmlFor="turbine-model-002">Turbine Model</label>
              <div className="box" onClick={handleToggleBox1}>
                <span>Select Turbine Model</span>
                <FontAwesomeIcon icon={faPlus} />
              </div>
              {isBoxVisible1 && (
                <div className="dropdown">
                  {models.map((model, index) => (
                    <div key={index} className="dropdown-item" onClick={() => handleClickPlusIcon(model, turbineModel1)}>
                      <span>{model}</span>
                      <FontAwesomeIcon icon={faPlus} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Box 2 */}
            <div className="form-group-002">
              <label htmlFor="temperature-variant-002">Temperature Variant</label>
              <div className="box" onClick={handleToggleBox2}>
                <span>Select Temperature Variant</span>
                <FontAwesomeIcon icon={faPlus} />
              </div>
              {isBoxVisible2 && (
                <div className="dropdown">
                  {variants.map((variant, index) => (
                    <div key={index} className="dropdown-item" onClick={() => handleClickPlusIcon(turbineModel2, variant)}>
                      <span>{variant}</span>
                      <FontAwesomeIcon icon={faPlus} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDynamicGuide002;
