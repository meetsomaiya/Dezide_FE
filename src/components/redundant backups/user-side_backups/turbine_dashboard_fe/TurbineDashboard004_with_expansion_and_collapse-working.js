import React, { useState, useEffect } from "react";
import "./TurbineDashboard004.css";

const TurbineDashboard004 = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [listItems, setListItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [trackerCount, setTrackerCount] = useState(0);
  const [performedSteps, setPerformedSteps] = useState([]); // Tracks performed steps
  const [isStepsBoxOpen, setIsStepsBoxOpen] = useState(true); // Controls visibility of steps box


    // Handle the toggle logic for the box (expand/collapse)
    const toggleBox = () => {
      setIsStepsBoxOpen(!isStepsBoxOpen);
    };
    
  const handleSectionClick = async (section) => {
    setSelectedSection(section);

    try {
      const response = await fetch(`http://localhost:226/api/fetch_events_for_fm?fm=${section}`);
      if (!response.ok) throw new Error(`Error fetching events: ${response.statusText}`);
      const data = await response.json();

      console.log(`Response for ${section}:`, data);
      setListItems(data);
    } catch (error) {
      console.error(`Failed to fetch events for ${section}:`, error);
    }
  };

  const handleEventClick = async (item) => {
    setSelectedItem(item);

    try {
      const response = await fetch(
        `http://localhost:226/api/fetch_question_data_based_on_event?event=${encodeURIComponent(item)}`
      );

      if (!response.ok) throw new Error(`Error fetching question data: ${response.statusText}`);

      const data = await response.json();
      console.log(`Fetched data for event '${item}':`, data);

      setQuestionData({
        question: data.actionName || "Consult With OMS Engineering",
        options: data.actionName ? ["Yes", "No", "I don't know"] : [],
        explanation: data.explanation || "",
        imageUrl: data.imageUrl || "https://via.placeholder.com/300",
      });

      setIsModalOpen(true);
    } catch (error) {
      console.error(`Failed to fetch question data for event '${item}':`, error);
    }
  };

  const handleOptionClick = async (option) => {
    setPerformedSteps((prev) => [...prev, `${questionData.question}: ${option}`]); // Add step to tracker

    if (option === "Yes") {
      setQuestionData({
        question: "Success",
        options: [],
        explanation: "",
        imageUrl: "",
      });
    } else if (option === "No" || option === "I don't know") {
      setTrackerCount((prevCount) => prevCount + 1);

      try {
        const response = await fetch(
          `http://localhost:226/api/fetch_consecutive_question_for_event?trackerCount=${
            trackerCount + 1
          }&selectedItem=${encodeURIComponent(selectedItem)}`
        );
        const data = await response.json();
        console.log("Fetched updated ActionName:", data);

        if (!data.actionName) {
          setQuestionData({
            question: "Consult With OMS Engineering",
            options: [],
            explanation: "",
            imageUrl: "",
          });
        } else {
          setQuestionData({
            question: data.actionName,
            options: ["Yes", "No", "I don't know"],
            explanation: data.explanation || "",
            imageUrl: data.imageUrl || "https://via.placeholder.com/300",
          });
        }
      } catch (error) {
        console.error("Error fetching updated ActionName:", error);
      }
    }
  };

  const sendTrackerDataToAPI = () => {
    const dataToSend = { trackerCount, selectedItem };
    console.log("Sending data to API:", dataToSend);

    fetch(
      `http://localhost:226/api/fetch_consecutive_question_for_event?trackerCount=${trackerCount}&selectedItem=${encodeURIComponent(
        selectedItem
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("API response:", data);
      })
      .catch((error) => {
        console.error("Error sending data to API:", error);
      });
  };

  useEffect(() => {
    if (trackerCount > 0) {
      sendTrackerDataToAPI();
    }
  }, [trackerCount]);

  const renderList = () => {
    if (!selectedSection || listItems.length === 0) return null;

    return (
      <div className="list-container004">
        <h3 className="list-title004">Guides for {selectedSection}</h3>
        <div className="list-items004">
          {listItems.map((item, index) => (
            <a
              key={index}
              onClick={() => handleEventClick(item)}
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
    {/* Performed Steps Tracker */}
<div
  className={`performed-steps-container004 ${isStepsBoxOpen ? "" : "collapsed"}`}
  onClick={() => setIsStepsBoxOpen(true)} // Clicking anywhere in the container will expand the box
>
  <div className="performed-steps-header004">
    <h3 className="performed-steps-title004">Performed Steps</h3>
    <button
      className="performed-steps-toggle-button004"
      onClick={(e) => {
        e.stopPropagation(); // Prevents clicking the button from triggering the container's onClick
        setIsStepsBoxOpen(!isStepsBoxOpen); // Toggle the box state when the button is clicked
      }}
    >
      {isStepsBoxOpen ? "▼" : "▲"}
    </button>
  </div>
  {isStepsBoxOpen && (
    <ul className="performed-steps-list004">
      {performedSteps.map((step, index) => (
        <li key={index} className="performed-steps-item004">
          {step}
        </li>
      ))}
    </ul>
  )}
</div>


        {/* Modal Content */}
        <div className="modal-content004">
          <div className="modal-header004">
            <h2 className="modal-title004">{selectedSection}</h2>
            <h4 className="modal-subtitle004">{selectedItem}</h4>
            <button className="modal-close004" onClick={() => setIsModalOpen(false)}>
              &#10006;
            </button>
          </div>
          <div className="modal-body004">
            <h3 className="question004">{questionData.question}</h3>
            {questionData.options.length > 0 && (
              <div className="options004">
                {questionData.options.map((option, index) => (
                  <button
                    key={index}
                    className="option-button004"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
            <div className="explanation004">
              {questionData.explanation && (
                <>
                  <h7 className="explanationtxt">Explanation</h7>
                  <p>{questionData.explanation}</p>
                </>
              )}
              {questionData.imageUrl && (
                <img src={questionData.imageUrl} alt="Explanation" className="explanation-image004" />
              )}
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

        {renderList()}
      </div>

      {renderModal()}
    </div>
  );
};

export default TurbineDashboard004;
