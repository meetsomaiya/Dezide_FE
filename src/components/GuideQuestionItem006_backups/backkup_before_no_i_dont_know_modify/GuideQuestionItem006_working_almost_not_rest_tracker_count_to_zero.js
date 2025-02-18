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

  const [lastIKnowClickCount, setLastIKnowClickCount] = useState(null); // Track the trackerCount at first "I don't know" click

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
        setCurrentActionName(""); 
        return; 
      }
  
      if (option === "No" || option === "I don't know") {
        let newTrackerCount;
  
        // If "I don't know" is clicked and it's the first time, set the lastIKnowClickCount to the current trackerCount
        if (option === "I don't know" && lastIKnowClickCount === null) {
          setLastIKnowClickCount(trackerCount);
          newTrackerCount = trackerCount + 1;
        } else {
          // If "No" is clicked or any further "I don't know" clicks, reset trackerCount to the level at the first "I don't know" click minus 1
          if (lastIKnowClickCount !== null) {
            newTrackerCount = lastIKnowClickCount - 1;
          } else {
            newTrackerCount = trackerCount + 1;
          }
        }
  
        setTrackerCount(newTrackerCount);
  
        // Now send the API request after updating the trackerCount
        const dataToSend = {
          trackerCount: newTrackerCount,
          selectedItem: eventData,
        };
  
        try {
          const response = await fetch(
            `http://localhost:226/api/fetch_consecutive_question_for_event?trackerCount=${dataToSend.trackerCount}&selectedItem=${encodeURIComponent(dataToSend.selectedItem)}`
          );
  
          if (!response.ok) {
            throw new Error("Failed to fetch consecutive question data");
          }
  
          const data = await response.json();
          if (data && data.actionName) {
            setCurrentActionName(data.actionName);
            sendActionNameToApi(data.actionName);
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
        setLastIKnowClickCount(null);
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
