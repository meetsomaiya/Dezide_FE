import React, { useState, useEffect } from "react";
import "./TurbineDashboard004.css";

const TurbineDashboard004 = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [listItems, setListItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility
  const [questionData, setQuestionData] = useState(null); // For question data
  const [selectedItem, setSelectedItem] = useState(null); // For the clicked item
  const [trackerCount, setTrackerCount] = useState(0); // Tracker count for "No" or "I don't know"

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

  const handleEventClick = async (item) => {
    setSelectedItem(item); // Store the clicked item
  
    try {
      // Fetch data from the API
      const response = await fetch(`http://localhost:226/api/fetch_question_data_based_on_event?event=${encodeURIComponent(item)}`);
      
      if (!response.ok) throw new Error(`Error fetching question data: ${response.statusText}`);
      
      const data = await response.json(); // Parse the response JSON
      
      console.log(`Fetched data for event '${item}':`, data); // Log the fetched data
      
      // Set the fetched question data in state
      setQuestionData({
        question: data.actionName, // Use the actionName as the question
        options: ["Yes", "No", "I don't know"], // Keep the options the same
        explanation: data.explanation || "", // Include explanation if provided
        imageUrl: data.imageUrl || "https://via.placeholder.com/300", // Use default image URL if not provided
      });
      
      // Open the modal
      setIsModalOpen(true);
    } catch (error) {
      console.error(`Failed to fetch question data for event '${item}':`, error);
    }
  };

  const handleOptionClick = async (option) => {
    if (option === "No" || option === "I don't know") {
      // Update the tracker count
      setTrackerCount(prevCount => prevCount + 1);

      // Trigger an API call to get the next ActionName based on the updated trackerCount
      try {
        const response = await fetch(`http://localhost:226/api/fetch_consecutive_question_for_event?trackerCount=${trackerCount + 1}&selectedItem=${encodeURIComponent(selectedItem)}`);
        const data = await response.json();

        console.log("Fetched updated ActionName:", data);
        
        // Update the question data with the new ActionName
        setQuestionData({
          question: data.actionName, // New ActionName as the question
          options: ["Yes", "No", "I don't know"], // Keep the options the same
          explanation: data.explanation || "", // Update with explanation if needed
          imageUrl: data.imageUrl || "https://via.placeholder.com/300", // Update with image if provided
        });
      } catch (error) {
        console.error("Error fetching updated ActionName:", error);
      }
    }
  };

  // Effect hook to send the data to the API after trackerCount is updated
  useEffect(() => {
    if (trackerCount > 0) {
      sendTrackerDataToAPI();
    }
  }, [trackerCount]);  // Runs whenever trackerCount is updated

  const sendTrackerDataToAPI = () => {
    const dataToSend = {
      trackerCount,
      selectedItem,
    };

    console.log("Sending data to API:", dataToSend); // Log data being sent

    // API call to send the tracker count and selected item via GET request
    const apiUrl = `http://localhost:226/api/fetch_consecutive_question_for_event?trackerCount=${trackerCount}&selectedItem=${encodeURIComponent(selectedItem)}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log("API response:", data);
        // Close the modal after the API call is successful
        setIsModalOpen(false);
      })
      .catch(error => {
        console.error("Error sending data to API:", error);
      });
  };

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

  const renderModal = () => {
    if (!isModalOpen || !questionData) return null;

    return (
      <div className="modal-overlay004">
        <div className="modal-content004">
          <div className="modal-header004">
            <h2 className="modal-title004">{selectedSection}</h2>
            <h4 className="modal-subtitle004">{selectedItem}</h4> {/* Display clicked item */}
            <button className="modal-close004" onClick={() => setIsModalOpen(false)}>
              &#10006; {/* Close icon */}
            </button>
          </div>
          <div className="modal-body004">
            <h3 className="question004">{questionData.question}</h3> {/* Display question */}
            <div className="options004">
              {questionData.options.map((option, index) => (
                <button key={index} className="option-button004" onClick={() => handleOptionClick(option)}>
                  {option}
                </button>
              ))}
            </div>
            <div className="explanation004">
              <p>{questionData.explanation}</p>
              <img
                src={questionData.imageUrl}
                alt="Explanation"
                className="explanation-image004"
              />
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
          {[...Array(8)].map((_, index) => (
            <button
              key={index}
              className={`section-button004 ${selectedSection === `FM${(index + 1) * 50}-${(index + 1) * 50 + 49}` ? "active004" : ""}`}
              onClick={() => handleSectionClick(`FM${(index + 1) * 50}-${(index + 1) * 50 + 49}`)}
            >
              {`FM${(index + 1) * 50}-${(index + 1) * 50 + 49}`}
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
