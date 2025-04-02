import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa'; // For the exclamation icons
import './GuideQuestionItem006.css'; // Link the CSS file for styling

const GuideQuestionItem = () => {
  const location = useLocation();
  const { actionId, actionName, eventData } = location.state || {}; // Access passed data including eventData

  const [selectedOption, setSelectedOption] = useState("");
  const [trackerCount, setTrackerCount] = useState(0); // Initialize trackerCount
  const [currentActionName, setCurrentActionName] = useState(actionName); // Track the current action name
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Track success message visibility
  const [performedSteps, setPerformedSteps] = useState([]); // Track performed steps

  // Function to handle the selection of Yes, No, I don't know
  const handleOptionSelect = async (option) => {
    setSelectedOption(option);

    // Add the current question and response to performedSteps
    setPerformedSteps((prevSteps) => [
      ...prevSteps,
      { question: currentActionName, response: option },
    ]);

    if (option === "Yes") {
      // Show success message and reset tracker count
      setShowSuccessMessage(true);
      setTrackerCount(0);
      setCurrentActionName(""); // Clear the question
      return; // Stop further execution
    }

    if (option === "No" || option === "I don't know") {
      // Increment trackerCount
      const newTrackerCount = trackerCount + 1;
      setTrackerCount(newTrackerCount);

      // Prepare the data to send to the API
      const dataToSend = {
        trackerCount: newTrackerCount,
        selectedItem: eventData,
      };

      console.log("Sending data to API:", dataToSend);

      // Send AJAX request to fetch consecutive questions for event
      try {
        const response = await fetch(
          `http://localhost:226/api/fetch_consecutive_question_for_event?trackerCount=${dataToSend.trackerCount}&selectedItem=${encodeURIComponent(dataToSend.selectedItem)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch consecutive question data");
        }

        const data = await response.json();
        console.log("Consecutive question data:", data);

        // Update the action name with the new one fetched from the API
        if (data && data.actionName) {
          setCurrentActionName(data.actionName);
        }
      } catch (error) {
        console.error("Error fetching consecutive question data:", error);
      }
    }
  };

  // Reset state when the component unmounts
  useEffect(() => {
    return () => {
      setTrackerCount(0);
      setPerformedSteps([]);
    };
  }, []);

  return (
    <div className="container006">
      <div className="left-section006">
        <div className="question-box006">
          <h2>
            <FaExclamationCircle size={20} color="blue" style={{ marginRight: '10px' }} />
            {showSuccessMessage ? "Success" : currentActionName} {/* Show success message or question */}
            {eventData && <span className="event-name">{eventData}</span>} {/* Display event name */}
          </h2>
          {!showSuccessMessage && <p>Does this solve the problem?</p>}

          {!showSuccessMessage && (
            <div className="options-text006">
              <button onClick={() => handleOptionSelect("Yes")}>1) Yes</button>
              <button onClick={() => handleOptionSelect("No")}>2) No</button>
              <button onClick={() => handleOptionSelect("I don't know")}>3) I don't know</button>
            </div>
          )}
        </div>

        <div className="explanation-box006">
          <h3>Explanation</h3>
          <p>
            Here is some dummy explanation text. For now, this is a placeholder text explaining the topic at hand.
            You can replace it with real explanation later.
          </p>
        </div>

        <div className="feedback-buttons006">
          <button className="feedback-btn006">Feedback</button>
          <button className="feedback-btn006">Start Over</button>
          <button className="feedback-btn006">Pause</button>
          <button className="feedback-btn006">View Session</button>
        </div>
      </div>

      <div className="right-section006">
        <div className="performed-steps-box006">
          <h3>Performed Steps</h3>
          {performedSteps.length > 0 ? (
            <ul>
              {performedSteps.map((step, index) => (
                <li key={index}>
                  <strong>Question:</strong> {step.question} <br />
                  <strong>Response:</strong> {step.response}
                </li>
              ))}
            </ul>
          ) : (
            <p>No steps performed yet.</p>
          )}
        </div>

        <div className="info-box006">
          <div className="exclamation-mark006">
            <FaExclamationCircle size={30} color="red" />
          </div>
          <p>Dummy info data. This section will display some important information or warnings.</p>
        </div>
      </div>
    </div>
  );
};

export default GuideQuestionItem;
