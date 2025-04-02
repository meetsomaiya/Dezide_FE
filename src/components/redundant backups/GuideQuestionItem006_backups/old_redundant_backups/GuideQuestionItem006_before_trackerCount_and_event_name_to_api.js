import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa';  // For the exclamation icons
import './GuideQuestionItem006.css';  // Link the CSS file for styling

const GuideQuestionItem = () => {
  const location = useLocation();
  const { actionId, actionName, eventData } = location.state || {};  // Access passed data including eventData

  const [selectedOption, setSelectedOption] = useState("");

  // Handle the selection of Yes, No, I don't know
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
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
