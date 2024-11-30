import React, { useState } from "react";
import "./TurbineDashboard004.css";

const TurbineDashboard004 = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [listItems, setListItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility
  const [questionData, setQuestionData] = useState(null); // For question data

  // Handle section click and fetch events for the selected FM section
  const handleSectionClick = async (section) => {
    setSelectedSection(section);

    try {
      // API call to fetch events for FM
      const response = await fetch(`http://localhost:226/api/fetch_events_for_fm?fm=${section}`);
      if (!response.ok) throw new Error(`Error fetching events: ${response.statusText}`);
      const data = await response.json();

      console.log(`Response for ${section}:`, data); // Log API response
      setListItems(data); // Set the list items with the API response
    } catch (error) {
      console.error(`Failed to fetch events for ${section}:`, error);
    }
  };

  // Handle event click to open modal
  const handleEventClick = async (eventName) => {
    // Example: Send API request to fetch question data (hardcoded for now)
    setQuestionData({
      question: "Do you want to proceed with this event?",
      options: ["Yes", "No", "I don't know"],
      explanation: "This is an explanation with some details about the event.",
      imageUrl: "https://via.placeholder.com/300",
    });

    // Open the modal
    setIsModalOpen(true);
  };

  // Render the fetched list of event names
  const renderList = () => {
    if (!selectedSection || listItems.length === 0) return null;

    return (
      <div className="list-container004">
        <h3 className="list-title004">Analytics for {selectedSection}</h3>
        <div className="list-items004">
          {listItems.map((item, index) => (
            <a
              key={index}
              onClick={() => handleEventClick(item)} // Open modal when an event is clicked
              className="list-item004"
              href="#"
            >
              <span className="list-action004">{item}</span>
            </a>
          ))}
        </div>
      </div>
    );
  };

  // Render the modal
  const renderModal = () => {
    if (!isModalOpen || !questionData) return null;

    return (
      <div className="modal-overlay004">
        <div className="modal-content004">
          <div className="modal-header004">
            <h2 className="modal-title004">{selectedSection}</h2>
            <button className="modal-close004" onClick={() => setIsModalOpen(false)}>
              &#10006; {/* Close icon */}
            </button>
          </div>
          <div className="modal-body004">
            <h3 className="question004">{questionData.question}</h3>
            <div className="options004">
              {questionData.options.map((option, index) => (
                <button key={index} className="option-button004">
                  {option}
                </button>
              ))}
            </div>
            <div className="explanation004">
              <p>{questionData.explanation}</p>
              <img src={questionData.imageUrl} alt="Explanation" className="explanation-image004" />
            </div>
          </div>
          <div className="modal-footer004">
            <button className="feedback-button004">Feedback</button>
            <button className="start-over-button004">Start Over</button>
          </div>
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
              className={`section-button004 ${selectedSection === section ? "active004" : ""}`}
              onClick={() => handleSectionClick(section)}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Render the list of event names */}
        {renderList()}
      </div>

      {/* Modal overlay */}
      {renderModal()}
    </div>
  );
};

export default TurbineDashboard004;
