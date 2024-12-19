import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faFileAlt, faBook, faQuestionCircle, faPhotoVideo, faHeadset, faPlus } from '@fortawesome/free-solid-svg-icons';
import './CreateDynamicGuide002.css'; // Import the CSS file
import { faMinus } from '@fortawesome/free-solid-svg-icons'; // Import minus icon
import { useNavigate } from 'react-router-dom';

import Sidebar991 from '../components/Sidebar991';

const CreateDynamicGuide002 = () => {
  const navigate = useNavigate();
  // States for dropdowns
  const [models, setModels] = useState([]); // State to hold turbine models
  const [variants, setVariants] = useState([]); // State to hold temperature variants
  const [guideName, setGuideName] = useState(''); // State for the input field

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


  const [selectedModel002, setSelectedModel002] = useState(null); // New state for selected turbine model
  const [selectedVariant002, setSelectedVariant002] = useState(null); // New state for selected temperature variant

  const [isModalOpen, setModalOpen] = useState(false);

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

    // Handle clicks on the plus icon inside dropdown items
    const handleDropdownClick002 = async (type, value) => {
      const endpoint = 'http://localhost:226/api/fetch_internal_turbine_model_and_temperature_variant';
  
      // Update local state based on the type
      if (type === 'model') {
        setSelectedModel002(value);
      } else if (type === 'variant') {
        setSelectedVariant002(value);
      }
  
      // Send API request
      try {
        const response = await fetch(`${endpoint}?type=${type}&value=${value}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        console.log(`Response for ${type} (${value}):`, result);
      } catch (error) {
        console.error(`Error fetching data for ${type} (${value}):`, error);
      }
    };

    // const handleCreateClick = () => {
    //   // Navigate to /dynamic-guides with state to open modal
    //   navigate('/dynamic-guides', { state: { openModal: true } });
    // };

    const handleCreateClick = () => {
      // Navigate to /dynamic-guides with state to open modal and pass guideName
      navigate('/dynamic-guides', { state: { openModal: true, guideName } });
    };

  return (
    <div className="page-container-002">

  <Sidebar991/>

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
              {/* <input id="guide-name-002" type="text" placeholder="Enter dynamic guide name" /> */}
              <input
              id="guide-name-002"
              type="text"
              placeholder="Enter dynamic guide name"
              value={guideName}
              onChange={(e) => setGuideName(e.target.value)} // Update state on input change
            />
              <small>The name of the dynamic guide as it appears to end users</small>
            </div>

            {/* Taxonomy - Turbine Model and Temperature Variant */}

{/* Box 1 */}
<div className="form-group-002">
  <label htmlFor="turbine-model-002">Turbine Model</label>
  <div className="box" onClick={handleToggleBox1}>
    <FontAwesomeIcon icon={isBoxVisible1 ? faMinus : faPlus} className="icon-left" />
    <span>Select Turbine Model</span>
  </div>
  {isBoxVisible1 && (
    <div className="dropdown">
      {models.map((model, index) => (
        <div
          key={index}
          className="dropdown-item"
          onClick={() => handleClickPlusIcon(model, turbineModel1)}
        >
                    <FontAwesomeIcon
                    icon={faPlus}
                    className="icon-left"
                    onClick={() => handleDropdownClick002('model', model)}
                  />
          <span>{model}</span>
        </div>
      ))}
    </div>
  )}
</div>

{/* Box 2 */}
<div className="form-group-002">
  <label htmlFor="temperature-variant-002">Temperature Variant</label>
  <div className="box" onClick={handleToggleBox2}>
    <FontAwesomeIcon icon={isBoxVisible2 ? faMinus : faPlus} className="icon-left" />
    <span>Select Temperature Variant</span>
  </div>
  {isBoxVisible2 && (
    <div className="dropdown">
      {variants.map((variant, index) => (
        <div
          key={index}
          className="dropdown-item"
          onClick={() => handleClickPlusIcon(turbineModel2, variant)}
        >
                           <FontAwesomeIcon
                    icon={faPlus}
                    className="icon-left"
                    onClick={() => handleDropdownClick002('variant', variant)}
                  />
          <span>{variant}</span>
        </div>
      ))}
    </div>
  )}
</div>


          </div>
          <div className="button-container-002">
  {/* <button className="button-002 create" onClick={() => console.log("Create button clicked!")}>
    Create
  </button> */}

<button className="button-002 create" onClick={handleCreateClick}>
              Create
            </button>

  <button className="button-002 cancel" onClick={() => console.log("Cancel button clicked!")}>
    Cancel
  </button>
</div>

        </div>
      </div>
      
    </div>
  );
};

export default CreateDynamicGuide002;
