import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa';  // For the exclamation icons
import './GuideQuestionItem006.css';  // Link the CSS file for styling

const GuideQuestionItem = () => {
  const location = useLocation();
  const { actionId, actionName, eventData } = location.state || {};  // Access passed data including eventData

  const [selectedOption, setSelectedOption] = useState("");
  const [trackerCount, setTrackerCount] = useState(0);  // Initialize trackerCount

  // Function to handle the selection of Yes, No, I don't know
  const handleOptionSelect = async (option) => {
    setSelectedOption(option);

    // Increment trackerCount if No or I don't know is selected
    if (option === "No" || option === "I don't know") {
      // Increment trackerCount only if it's the first time (i.e., it hasn't been incremented before)
      const newTrackerCount = trackerCount + 1;
      setTrackerCount(newTrackerCount);
      
      // Prepare the data to send to the API
      const dataToSend = {
        trackerCount: newTrackerCount,
        selectedItem: eventData
      };

      // Log the data to be sent to the API
      console.log("Sending data to API:", dataToSend);

      // Send AJAX request to fetch consecutive questions for event
      try {
        const response = await fetch(
          `http://localhost:226/api/fetch_consecutive_question_for_eventt?trackerCount=${dataToSend.trackerCount}&selectedItem=${encodeURIComponent(dataToSend.selectedItem)}`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch consecutive question data");
        }

        const data = await response.json();
        console.log("Consecutive question data:", data);  // Log the response from the API

      } catch (error) {
        console.error("Error fetching consecutive question data:", error);
      }
    }
  };

  return (
    <div className="container006">
      <div className="left-section006">
        <div className="question-box006">
          {/* Blue Exclamation Icon in place of the hardcoded '!' */}
          <h2>
            <FaExclamationCircle size={20} color="blue" style={{ marginRight: '10px' }} />
            {actionName}
            {eventData && <span className="event-name">{eventData}</span>} {/* Display event name to the right of the question */}
          </h2>
          <p>Does this solve your problem?</p>

          <div className="options-text006">
            <button onClick={() => handleOptionSelect("Yes")}>1) Yes</button>
            <button onClick={() => handleOptionSelect("No")}>2) No</button>
            <button onClick={() => handleOptionSelect("I don't know")}>3) I don't know</button>
          </div>
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
          <p>Here are some dummy data showing the steps performed. These are placeholders for the moment.</p>
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
