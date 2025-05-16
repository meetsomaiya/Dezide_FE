import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaExclamationCircle } from "react-icons/fa";

const BASE_URL = "http://localhost:3001"; // Change as needed

const getFMRange = (modelName) => {
  if (!modelName) return '';
  const match = modelName.match(/FM(\d+)/i);
  if (!match) return '';
  const fmNumber = parseInt(match[1], 10);
  if (fmNumber >= 1 && fmNumber <= 50) return 'FM1-50';
  if (fmNumber >= 51 && fmNumber <= 100) return 'FM51-100';
  if (fmNumber >= 101 && fmNumber <= 150) return 'FM101-150';
  if (fmNumber >= 151 && fmNumber <= 200) return 'FM151-200';
  if (fmNumber >= 201 && fmNumber <= 250) return 'FM201-250';
  if (fmNumber >= 251 && fmNumber <= 300) return 'FM251-300';
  if (fmNumber >= 301 && fmNumber <= 350) return 'FM301-350';
  if (fmNumber >= 351 && fmNumber <= 400) return 'FM351-400';
  if (fmNumber >= 401 && fmNumber <= 450) return 'FM401-450';
  return '';
};

const GuideQuestionItem007 = () => {
  const location = useLocation();
  const { resumeData } = location.state || {};

  // State for explanation and image
  const [actionExplanation, setActionExplanation] = useState('');
  const [actionImage, setActionImage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [displayedActionName, setDisplayedActionName] = useState('');
  const [trackerCount, setTrackerCount] = useState(0);
  const [lastIDontKnowCount, setLastIDontKnowCount] = useState(null);
  const [lastAction, setLastAction] = useState(null);

  // Extract unique steps by order
  let uniqueSteps = [];
  let eventData = '';
  if (Array.isArray(resumeData) && resumeData.length > 0) {
    const stepMap = new Map();
    resumeData
      .sort((a, b) => Number(a.order) - Number(b.order))
      .forEach(item => {
        if (!stepMap.has(item.order)) {
          stepMap.set(item.order, item);
        }
      });
    uniqueSteps = Array.from(stepMap.values());
    eventData = resumeData[0].model_name || '';
  }

  // Get FM range and event name
  const fmRange = getFMRange(eventData);
  const eventName = eventData;

  // Get the step with the highest order, with special logic
  let highestOrderStep = null;
  if (uniqueSteps.length > 0) {
    const sortedSteps = [...uniqueSteps].sort((a, b) => Number(b.order) - Number(a.order));
    const topStep = sortedSteps[0];
    const secondStep = sortedSteps[1];
    if (
      topStep &&
      topStep.sequence_step_answer === "No" &&
      secondStep &&
      secondStep.sequence_step_answer === "I don't know"
    ) {
      highestOrderStep = secondStep;
    } else {
      highestOrderStep = topStep;
    }
  }

  // Fetch the first actionName from API on initial load
  useEffect(() => {
  const fetchInitialActionName = async () => {
    if (highestOrderStep && eventData) {
      // Use the current highest order (no +1)
      const apiTrackerCount = Number(highestOrderStep.order);
      const dataToSend = {
        trackerCount: apiTrackerCount,
        selectedItem: eventData,
      };
      console.log("Initial load: Sending data to API:", dataToSend);
      try {
        const response = await fetch(
          `${BASE_URL}/api/fetch_consecutive_question_for_event?trackerCount=${dataToSend.trackerCount}&selectedItem=${encodeURIComponent(dataToSend.selectedItem)}`
        );
        if (!response.ok) throw new Error("404 Not Found");
        const data = await response.json();
        console.log("Initial load: API response:", data);
        if (data && data.actionName) {
          setDisplayedActionName(data.actionName);
          sendActionNameToApi(data.actionName);
        }
      } catch (error) {
        setDisplayedActionName("404 Not Found");
        setShowSuccessMessage(false);
      }
    }
  };
  fetchInitialActionName();
  // eslint-disable-next-line
}, [highestOrderStep, eventData]);

// ...existing code...
 // Fetch explanation and image for a given action name
  const sendActionNameToApi = async (actionNameToSend) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/fetch_image_and_explanation_for_action?actionName=${encodeURIComponent(actionNameToSend)}`
      );
      if (!response.ok) {
        throw new Error("Failed to send action name to API");
      }
      const data = await response.json();
      setActionExplanation(data.actionExplaination);
      setActionImage(data.actionImage);
    } catch (error) {
      setActionExplanation('');
      setActionImage('');
      console.error("Error sending action name to API:", error);
    }
  };


const handleOptionSelect = async (option) => {
  let newTrackerCount = trackerCount;

  if (option === "Yes") {
    setShowSuccessMessage(true);
    setTrackerCount(0);
    setLastIDontKnowCount(null);
    setLastAction(null);
    setDisplayedActionName(''); // Clear question
    return;
  }

  if (option === "I don't know") {
    newTrackerCount = trackerCount + 1;
    setTrackerCount(newTrackerCount);
    setLastIDontKnowCount(newTrackerCount);
    setLastAction("I don't know");
  }

  if (option === "No") {
    if (lastAction === "I don't know" && lastIDontKnowCount !== null) {
      newTrackerCount = lastIDontKnowCount - 1;
      setTrackerCount(newTrackerCount);
    } else {
      newTrackerCount = trackerCount + 1;
      setTrackerCount(newTrackerCount);
    }
    setLastAction("No");
  }

  // Use the current highest order (no +1)
  const apiTrackerCount = highestOrderStep ? Number(highestOrderStep.order) : 1;

  const dataToSend = {
    trackerCount: apiTrackerCount,
    selectedItem: eventData,
  };

  console.log("Sending data to API from guidequestionitem007:", dataToSend);

  try {
    const response = await fetch(
      `${BASE_URL}/api/fetch_consecutive_question_for_event?trackerCount=${dataToSend.trackerCount}&selectedItem=${encodeURIComponent(dataToSend.selectedItem)}`
    );

    if (!response.ok) {
      throw new Error("404 Not Found");
    }

    const data = await response.json();
    console.log("API response from /fetch_consecutive_question_for_event:", data);

    if (data && data.actionName) {
      setDisplayedActionName(data.actionName); // Show new actionName in h2
      sendActionNameToApi(data.actionName); // Optionally update explanation/image for new action
    }
  } catch (error) {
    console.error("Error fetching consecutive question data:", error);
    setDisplayedActionName("404 Not Found");
    setShowSuccessMessage(false);
  }
};

  return (
    <div className="container006">
      <div className="left-section006">
        {eventData && (
          <>
            <span className="event-name">
              <span className="event-part-black">{fmRange}</span>
              {" | "}
              <span className="event-part-orange">{eventName}</span>
            </span>
            {/* Question Box */}
            <div className="question-box006">
              {displayedActionName && (
                <>
                  <h2>
                    <FaExclamationCircle size={20} color="blue" style={{ marginRight: '10px' }} />
                    {displayedActionName}
                  </h2>
                  <p>Does this solve the problem?</p>
                  <div className="options-text006">
                    <button onClick={() => handleOptionSelect("Yes")}>1) Yes</button>
                    <button onClick={() => handleOptionSelect("No")}>2) No</button>
                    <button onClick={() => handleOptionSelect("I don't know")}>3) I don't know</button>
                  </div>
                </>
              )}
            </div>
            {/* Explanation Section */}
            <h7 className="explanation-header006">Explanation</h7>
            <div className="explanation-box006">
              {showSuccessMessage ? (
                <p>Success!</p>
              ) : (
                <>
                  {displayedActionName === "404 Not Found" ? (
                    <p>Consult with OMS engineering.</p>
                  ) : (
                    <>
                      <p>{actionExplanation || "Explanation not available."}</p>
                      {actionImage && (
                        <div className="action-image-container">
                          <img src={actionImage} alt="" className="action-image" />
                        </div>
                      )}
                    </>
                  )}
                  {displayedActionName !== "404 Not Found" && (
                    <div className="explanation-buttons-container">
                      <div className="explanation-buttons">
                        <button /* onClick={handleOpenModal333} */>Feedback</button>
                        <button
                          type="button"
                          className="modal-reset-button222"
                          /* onClick={handleStartOver187} */
                        >
                          Start Over
                        </button>
                        <button /* onClick={handlePauseSession} */>Pause Session</button>
                        <button>View Session</button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div className="right-section006">
        <div className="performed-steps-box006">
          <h3>Performed Steps</h3>
          {uniqueSteps.length > 0 ? (
            <ul style={{ background: "#f5f5f5", padding: "1em", borderRadius: "4px" }}>
              {uniqueSteps.map((step) => (
                <li key={step.order}>
                  <div className="performed-question-link">{step.step_name}</div>
                  <span className="performed-answer"> &nbsp; >> {step.sequence_step_answer}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No resume data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuideQuestionItem007;