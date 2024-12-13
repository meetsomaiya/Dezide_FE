import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa"; // For the exclamation icons
import "./GuideQuestionItem006.css"; // Link the CSS file for styling

const GuideQuestionItem = () => {
  const location = useLocation();
  const { actionId, actionName, eventData, infoname } = location.state || {}; // Access passed data including eventData

  const [selectedOption, setSelectedOption] = useState("");
  const [trackerCount, setTrackerCount] = useState(0); // Initialize trackerCount
  const [currentActionName, setCurrentActionName] = useState(actionName); // Track the current action name
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Track success message visibility
  const [performedSteps, setPerformedSteps] = useState([]); // Track performed steps
  const [actionExplanation, setActionExplanation] = useState(""); // State to hold action explanation
  const [actionImage, setActionImage] = useState(""); // State to hold action image (base64)
  const [firstIDontKnowCount, setFirstIDontKnowCount] = useState(null); // Reference for "I don't know" level

  const [isTrackerCountAdjusted, setIsTrackerCountAdjusted] = useState(false);  // Flag to track adjustment
  
  const [lastSelectedOption, setLastSelectedOption] = useState(null);  // To track last selection

  const [isTrackerReset, setIsTrackerReset] = useState(false);
  
// Function to send currentActionName to the API
const sendActionNameToApi = async (actionNameToSend) => {
  try {
    const response = await fetch(
      `http://localhost:226/api/fetch_image_and_explanation_for_action?actionName=${encodeURIComponent(actionNameToSend)}`
    );

    if (!response.ok) {
      throw new Error("Failed to send action name to API");
    }

    const data = await response.json();
    console.log("API response:", data);

    // Assuming the API returns explanation and image as part of the response
    if (data) {
      setActionExplanation(data.actionExplaination); // Set explanation text
      setActionImage(data.actionImage); // Set base64 image or image URL
    }
  } catch (error) {
    console.error("Error sending action name to API:", error);
  }
};

const getFormattedEventName = (eventName) => {
  if (!eventName) return ""; // Handle empty or undefined input

  const match = eventName.match(/FM(\d+)/); // Extract the number after 'FM'
  if (!match) return eventName; // Return original if no match is found

  const fmNumber = parseInt(match[1], 10); // Parse the number
  let rangeStart = Math.floor((fmNumber - 1) / 50) * 50 + 1; // Calculate range start
  let rangeEnd = rangeStart + 49; // Calculate range end

  return `FM${rangeStart}-${rangeEnd} | ${eventName}`; // Format the event name
};

  // Send action name on initial load
  useEffect(() => {
    if (currentActionName) {
      console.log("Sending action name on page load:", currentActionName);
      sendActionNameToApi(currentActionName);
    }
  }, [currentActionName]);

 // Effect to handle the resetting of trackerCount based on firstIDontKnowCount
useEffect(() => {
  if (firstIDontKnowCount !== null && lastSelectedOption === "No" || lastSelectedOption === "I don't know") {
    console.log("Resetting tracker count to 'I don't know' level:", firstIDontKnowCount - 1 );
    setIsTrackerReset(false);  // Mark the tracker as reset
    setTrackerCount(firstIDontKnowCount - 1); // Reset to the first "I don't know" level minus 1
  } else {
    setIsTrackerReset(false);  // Reset flag when no reset is needed
  }
}, [firstIDontKnowCount, lastSelectedOption]);  // Dependency on firstIDontKnowCount and lastSelectedOption

// Function to handle the selection of Yes, No, I don't know
const handleOptionSelect = async (option) => {
  setSelectedOption(option);
  
  // Log and store the last selected option to manage reset logic
  setLastSelectedOption(option);
  
  setPerformedSteps((prevSteps) => [
    ...prevSteps,
    { question: currentActionName, response: option },
  ]);

  if (option === "Yes") {
    // Reset everything on success
    setShowSuccessMessage(true);
    setTrackerCount(1); // Always reset to 1
    setFirstIDontKnowCount(null); // Reset "I don't know" reference
    setCurrentActionName("");
    setIsTrackerReset(false);  // Reset the flag
    return;
  }

  if (option === "I don't know") {
    // Log and set "I don't know" reference only once
    if (firstIDontKnowCount === null) {
      console.log("First 'I don't know' tracker count:", trackerCount);
      setFirstIDontKnowCount(trackerCount);
    }
  } else if (option === "No") {
    // Only reset to the "I don't know" level minus 1 if previously selected "I don't know"
    if (firstIDontKnowCount !== null && lastSelectedOption === "I don't know") {
      setIsTrackerReset(true);  // Mark the tracker as reset
      console.log("Resetting tracker count to 'I don't know' level:", firstIDontKnowCount);
      setTrackerCount(firstIDontKnowCount - 1);  // Reset tracker count to first "I don't know" level minus 1 
    } else {
      if (!isTrackerReset) {
        // setTrackerCount((prev) => prev + 1);  // Otherwise just increment the count
        setTrackerCount(trackerCount + 1);
      }
    }
  }

  // Log the current tracker count for validation
  console.log("Current Tracker Count:", trackerCount);


  
    // Prepare data to send to the API
    const dataToSend = {
      trackerCount,
      selectedItem: eventData,
    };

    console.log("Sending data to API:", dataToSend);

    try {
      const response = await fetch(
        `http://localhost:226/api/fetch_consecutive_question_for_event?trackerCount=${trackerCount}&selectedItem=${encodeURIComponent(eventData)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch consecutive question data");
      }

      const data = await response.json();
      console.log("Consecutive question data:", data);

      if (data?.actionName) {
        setCurrentActionName(data.actionName);
        sendActionNameToApi(data.actionName);
      }
    } catch (error) {
      console.error("Error fetching consecutive question data:", error);
    }
  };
  // Reset state when the component unmounts
  useEffect(() => {
    return () => {
      setTrackerCount(1);
      setPerformedSteps([]);
    };
  }, []);

  return (
    <div className="container006">
      <div className="left-section006">
      {/* {eventData && <span className="event-name">{eventData}</span>}  */}
      {eventData && (
  <span className="event-name">
    <span className="event-part-black">
      {getFormattedEventName(eventData).split('|')[0].trim()}
    </span>
    {" | "}
    <span className="event-part-orange">
      {getFormattedEventName(eventData).split('|')[1].trim()}
    </span>
  </span>
)}

        <div className="question-box006">
          {/* <h2>
            <FaExclamationCircle size={20} color="blue" style={{ marginRight: '10px' }} />

            {showSuccessMessage ? "" : currentActionName} 
          
          </h2> */}

<h2>
  {!showSuccessMessage && currentActionName && (
    <FaExclamationCircle size={20} color="blue" style={{ marginRight: '10px' }} />
  )}
  {showSuccessMessage ? "" : currentActionName}
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


        <h7 className="explanation-header006">Explanation</h7>
<div className="explanation-box006">
  {showSuccessMessage ? (
    <p>Success!</p> // Display success message
  ) : (
    <>
      <p>{actionExplanation || "Explanation not available."}</p>

      {actionImage && (
        <div className="action-image-container">
          <img src={actionImage} alt="" className="action-image" />
        </div>
      )}

      {/* Buttons Section */}
      <div className="explanation-buttons-container">
        <div className="explanation-buttons">
          <button>Feedback</button>
          <button>Start Over</button>
          <button>Pause</button>
          <button>View Session</button>
        </div>
      </div>
    </>
  )}
</div>





{/* <div className="feedback-buttons006">
          <button className="feedback-btn006">Feedback</button>
          <button className="feedback-btn006">Start Over</button>
          <button className="feedback-btn006">Pause</button>
          <button className="feedback-btn006">View Session</button>
        </div> */}
      
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
          {/* <ul>
  <li>Safety chain activated. If DI08 *DI_SafetyChain_Activated*.</li>
  <li>Troubleshooting guide built on the basis of the below-mentioned drawing version and software version:
    <ul>
      <li>Bottom Cabinet Drawing Version: E.05.1.1.2.101A Rev.001</li>
      <li>Top Cabinet Drawing Version: E.05.1.2.2.101A Rev.000</li>
      <li>Hub Cabinet Drawing Version: E.05.1.3.2.101A Rev.001_Improved</li>
      <li>Software Version: CSM6321X5SX1XXR007</li>
    </ul>
  </li>
</ul> */}


 {infoname && infoname.length > 0 ? (
                    <ul>
                        {infoname.map((name, index) => (
                            <li key={index}>{name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No info available</p>
                )}

        </div>
      </div>
    </div>
  );
};

export default GuideQuestionItem;
