import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GuideDashboard005.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const GuideDashboard005 = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [turbineData, setTurbineData] = useState([]);
  const [activeTab, setActiveTab] = useState("FM1-50");
  const [selectedOption, setSelectedOption] = useState("Home"); // Track the selected option
  const [fmData, setFmData] = useState([]);
  const [isHomeSelected, setIsHomeSelected] = useState(true); // Track if "Home" is selected
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch turbine data on component mount
    const fetchTurbineData = async () => {
      try {
        const response = await fetch("http://localhost:226/api/fetch_turbine_data");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const { data } = await response.json();
        setTurbineData(data);
      } catch (error) {
        console.error("Error fetching turbine data:", error);
      }
    };

    fetchTurbineData();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setIsHomeSelected(option === "Home");
    setDropdownVisible(false); // Close the dropdown after selection
  };

  return (
    <div className="container005">
      {/* Header Section */}
      <header className="header005">
        <div className="dropdown-container005">
          <div className="dropdown-trigger005" onClick={toggleDropdown}>
            {/* Replace the home icon with the selected option */}
            {selectedOption === "Home" ? (
              <FontAwesomeIcon icon={faHome} className="home-icon005" />
            ) : (
              <span className="selected-option">{selectedOption}</span>
            )}
          </div>
          {dropdownVisible && (
            <div className="dropdown-menu005">
              {/* Home Checkbox */}
              <div className="dropdown-option">
                <input
                  type="radio"
                  id="home-option"
                  name="turbine"
                  value="Home"
                  checked={selectedOption === "Home"}
                  onChange={() => handleOptionChange("Home")}
                />
                <label htmlFor="home-option">Home</label>
              </div>
              {/* Render turbine options */}
              {turbineData.map((turbine, index) => (
                <div className="dropdown-option" key={index}>
                  <input
                    type="radio"
                    id={`turbine-${index}`}
                    name="turbine"
                    value={turbine.ModelName}
                    checked={selectedOption === turbine.ModelName}
                    onChange={() => handleOptionChange(turbine.ModelName)}
                  />
                  <label htmlFor={`turbine-${index}`}>{turbine.ModelName}</label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="alarm-list-trigger005">▲ Alarm list</div>
        <button className="signoff-btn005">Sign off</button>
      </header>

      {/* Conditionally Render Content */}
      {!isHomeSelected && (
        <>
          {/* Search and Buttons Section */}
          <div className="search-section005">
            <div className="search-row005">
              <div className="search-input-group005">
                <label htmlFor="customer" className="label005">
                  Customer
                </label>
                <input type="text" id="customer" className="input-box005" />
              </div>
              <div className="search-input-group005">
                <button className="btn005">History</button>
                <input type="text" className="input-box005" />
              </div>
              <div className="search-buttons005">
                <button className="btn005">Resume</button>
                <button className="btn005">Feedback</button>
              </div>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="main-content005">
            {/* Left Section */}
            <div className="left-section005">
              <div className="table-header005">
                <span className="table-header-item005">Time</span>
                <span className="table-header-item005">Item</span>
                <span className="table-header-item005">Agent</span>
              </div>
              <div className="table-body005">{/* Table rows can go here */}</div>
            </div>

            {/* Right Section */}
            <div className="right-section005">
              <div className="tabs-container005">
                <button
                  className={`tab005 ${activeTab === "FM1-50" ? "active005" : ""}`}
                  onClick={() => setActiveTab("FM1-50")}
                >
                  FM1-50
                </button>
                <button
                  className={`tab005 ${activeTab === "FM51-100" ? "active005" : ""}`}
                  onClick={() => setActiveTab("FM51-100")}
                >
                  FM51-100
                </button>
                {/* Add other tabs as needed */}
              </div>
              <div className="alarm-list005">
                <ul className="alarm-items005">
                  {/* Alarm items can be rendered dynamically */}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer Section */}
      <footer className="footer005">© Dezide 2019</footer>
    </div>
  );
};

export default GuideDashboard005;
