import React, { useState, useEffect } from "react";
import "./GuideDashboard005.css";

const GuideDashboard005 = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [turbineData, setTurbineData] = useState([]); // State to store turbine models
  const [activeTab, setActiveTab] = useState("FM1-50"); // Default active tab
  const [selectedTurbine, setSelectedTurbine] = useState(null); // State to store selected turbine
  const [fmData, setFmData] = useState([]); // State to store FM data from the API

  useEffect(() => {
    // Fetch turbine data on component mount
    const fetchTurbineData = async () => {
      try {
        const response = await fetch("http://localhost:226/api/fetch_turbine_data");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const { data } = await response.json();
        setTurbineData(data); // Assuming the API returns an array of turbine models
      } catch (error) {
        console.error("Error fetching turbine data:", error);
      }
    };

    fetchTurbineData();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleTurbineSelect = async (turbineModel) => {
    setSelectedTurbine(turbineModel); // Update selected turbine

    try {
      // Fetch FM data from the API
      const response = await fetch(
        `http://localhost:226/api/fetch_fm_data?turbineModel=${encodeURIComponent(turbineModel)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data from fetch_fm_data API");
      }

      const responseData = await response.json();
      setFmData(responseData.data || []); // Store FM data or default to an empty array
      console.log("Response from API:", responseData);
    } catch (error) {
      console.error("Error fetching turbine data from API:", error);
    }
  };

  // Helper function to categorize FM data based on the range
  const categorizeFmData = (fmData) => {
    const categories = {
      "FM1-50": [],
      "FM51-100": [],
      "FM101-150": [],
      "FM151-200": [],
    };

    fmData.forEach((fm) => {
      const match = fm.match(/^FM(\d+)/);
      if (match) {
        const number = parseInt(match[1], 10);
        if (number <= 50) {
          categories["FM1-50"].push(fm);
        } else if (number <= 100) {
          categories["FM51-100"].push(fm);
        } else if (number <= 150) {
          categories["FM101-150"].push(fm);
        } else if (number <= 200) {
          categories["FM151-200"].push(fm);
        }
      }
    });

    return categories;
  };

  // Categorize FM data
  const categorizedFmData = categorizeFmData(fmData);

  return (
    <div className="container005">
      {/* Header Section */}
      <header className="header005">
        <div className="dropdown-container005">
          <div
            className="dropdown-trigger005"
            onClick={toggleDropdown} // Toggle dropdown visibility on click
          >
            ▲ Turbine
          </div>
          {dropdownVisible && (
            <div className="dropdown-menu005">
              {turbineData.map((turbine, index) => (
                <div
                  className="dropdown-option"
                  key={index}
                  onClick={() => handleTurbineSelect(turbine.ModelName)}
                >
                  <input
                    type="radio"
                    id={`turbine-${index}`}
                    name="turbine"
                    value={turbine.ModelName}
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
          <div className="table-body005">
            {/* Table rows can go here */}
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section005">
          <div className="tabs-container005">
            <button
              className={`tab005 ${activeTab === "FM1-50" ? "active005" : ""}`}
              onClick={() => handleTabClick("FM1-50")}
            >
              FM1-50
            </button>
            <button
              className={`tab005 ${activeTab === "FM51-100" ? "active005" : ""}`}
              onClick={() => handleTabClick("FM51-100")}
            >
              FM51-100
            </button>
            <button
              className={`tab005 ${activeTab === "FM101-150" ? "active005" : ""}`}
              onClick={() => handleTabClick("FM101-150")}
            >
              FM101-150
            </button>
            <button
              className={`tab005 ${activeTab === "FM151-200" ? "active005" : ""}`}
              onClick={() => handleTabClick("FM151-200")}
            >
              FM151-200
            </button>
          </div>
          <div className="alarm-list005">
            <ul className="alarm-items005">
              {categorizedFmData[activeTab]?.map((fm, index) => (
                <li key={index} className="alarm-item005">
                  <span className="icon005">⚡</span> {fm}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer005">© Dezide 2019</footer>
    </div>
  );
};

export default GuideDashboard005;
