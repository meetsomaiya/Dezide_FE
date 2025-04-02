import React, { useState } from "react";
import "./TurbineDashboard004.css";

const TurbineDashboard004 = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [listItems, setListItems] = useState([]);

  // const handleSectionClick = (section) => {
  //   setSelectedSection(section);
  // };

  const handleSectionClick = async (section) => {
    setSelectedSection(section);

    try {
      // API call to fetch events for FM
      const response = await fetch(`http://localhost:226/api/fetch_events_for_fm?fm=${section}`);
      if (!response.ok) throw new Error(`Error fetching events: ${response.statusText}`);
      const data = await response.json();

      console.log(`Response for ${section}:`, data); // Log API response
      setListItems(data); // Assuming data is an array of events
    } catch (error) {
      console.error(`Failed to fetch events for ${section}:`, error);
    }
  };

  const renderList = () => {
    if (!selectedSection) return null;

    const dummyData = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      action: `Detailed Report ${i + 1}`,
      link: `#analytics/${selectedSection}/item${i + 1}`, // Dummy hyperlink
    }));

    return (
      <div className="list-container004">
        <h3 className="list-title004">Analytics for {selectedSection}</h3>
        <div className="list-items004">
          {dummyData.map((item) => (
            <a
              key={item.id}
              href={item.link}
              className="list-item004"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="list-id004">{item.id}</span>
              <span className="list-action004">{item.action}</span>
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-container004">
      {/* Sidebar with Dropdown */}
      <div className="sidebar004">
        <div className="sidebar-header004">
          <h1 className="app-title004">Dezide</h1>
        </div>
        <div className="dropdown-container004">
          <label htmlFor="turbine-select004" className="dropdown-label004">
            Select Turbine
          </label>
          <select id="turbine-select004" className="turbine-select004">
            <option value="S88-STV">S88 - STV</option>
            <option value="S9X-STV">S9X - STV</option>
            <option value="S111-STV">S111 - STV</option>
            <option value="S82-STV">S82 - STV</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content004">
        <div className="button-section004">
          {[
            "FM1-50",
            "FM51-100",
            "FM101-150",
            "FM151-200",
            "FM201-250",
            "FM251-300",
            "FM301-350",
            "FM351-400",
            "FM401-450",
          ].map((section) => (
            <button
              key={section}
              className={`section-button004 ${
                selectedSection === section ? "active004" : ""
              }`}
              onClick={() => handleSectionClick(section)}
            >
              {section}
            </button>
          ))}
        </div>
        {renderList()}
      </div>
    </div>
  );
};

export default TurbineDashboard004;
