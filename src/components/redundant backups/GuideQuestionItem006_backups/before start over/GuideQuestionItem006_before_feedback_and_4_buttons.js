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

  const [lastIDontKnowCount, setLastIDontKnowCount] = useState(null); // Track last "I don't know" click count

  const [lastAction, setLastAction] = useState(null); // Track the last action
  

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

const handleBack = () => {
  if (performedSteps.length > 0) {
    // Get the last step and update the current action and response
    const lastStep = performedSteps[performedSteps.length - 1];

    setCurrentActionName(lastStep.question);
    setSelectedOption(lastStep.response);

    // Update tracker count to the position of the last step
    setTrackerCount((prevCount) => Math.max(0, prevCount - 1));

    // Remove the last performed step to "go back"
    setPerformedSteps((prevSteps) => prevSteps.slice(0, -1));
  } else {
    console.warn("No previous steps to navigate back to.");
  }
};

const handleQuestionClick = (e, question) => {
  e.preventDefault(); // Prevent default behavior

  console.log("Clicked question:", question);

  // Find the index of the clicked question in performedSteps
  const selectedStepIndex = performedSteps.findIndex((step) => step.question === question);

  if (selectedStepIndex !== -1) {
    const selectedStep = performedSteps[selectedStepIndex];

    // Update state to display the question and its response
    setCurrentActionName(selectedStep.question);
    setSelectedOption(selectedStep.response);

    // Reset tracker count to the index of the selected question minus one
    setTrackerCount(selectedStepIndex); // This will give us the sequence position (0-based)

    // Optionally update other related UI elements if necessary
    console.log(`Navigated to question: ${selectedStep.question} with response: ${selectedStep.response}`);
  } else {
    console.warn("Question not found in performed steps.");
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

  console.log(`Selected Option: ${option}`);
  console.log(`Tracker Count Before Update: ${trackerCount}`);

  // Check if the question already exists in performedSteps
  setPerformedSteps((prevSteps) => {
    const questionIndex = prevSteps.findIndex(
      (step) => step.question === currentActionName
    );

    if (questionIndex !== -1) {
      // Update the response for the existing question
      const updatedSteps = [...prevSteps];
      updatedSteps[questionIndex] = {
        ...updatedSteps[questionIndex],
        response: option,
      };
      return updatedSteps;
    } else {
      // Add a new question-response pair if it doesn't exist
      return [
        ...prevSteps,
        { question: currentActionName, response: option },
      ];
    }
  });

  // The rest of your logic remains unchanged
  let newTrackerCount = trackerCount;

  if (option === "Yes") {
    console.log("Action: Yes selected. Resetting tracker count.");
    setShowSuccessMessage(true);
    setTrackerCount(0);
    setLastIDontKnowCount(null); // Reset last "I don't know" tracker
    setLastAction(null); // Clear last action
    setCurrentActionName("");
    return;
  }

  if (option === "I don't know") {
    newTrackerCount = trackerCount + 1;
    setTrackerCount(newTrackerCount);

    // Update the 'lastI don't know' count
    setLastIDontKnowCount(newTrackerCount);
    console.log(`Action: "I don't know" selected. New Tracker Count: ${newTrackerCount}`);
    console.log(`Last 'I don't know' Count Updated To: ${newTrackerCount}`);

    // Update last action
    setLastAction("I don't know");
  }

  if (option === "No") {
    if (lastAction === "I don't know" && lastIDontKnowCount !== null) {
      // If "No" follows "I don't know", reset the tracker count
      newTrackerCount = lastIDontKnowCount - 1;
      setTrackerCount(newTrackerCount);

      // Log tracker count reset for "No" after "I don't know"
      console.log(`Action: "No" selected after "I don't know". Tracker Count Reset To: ${newTrackerCount}`);
    } else {
      // Normal increment for "No"
      newTrackerCount = trackerCount + 1;
      setTrackerCount(newTrackerCount);
      console.log(`Action: "No" selected. New Tracker Count: ${newTrackerCount}`);
    }

    // Update last action
    setLastAction("No");
  }

  // Use the updated trackerCount value to send to the API
  const dataToSend = {
    trackerCount: newTrackerCount,
    selectedItem: eventData,
  };

  console.log("Sending data to API:", dataToSend);

  try {
    const response = await fetch(
      `http://localhost:226/api/fetch_consecutive_question_for_event?trackerCount=${dataToSend.trackerCount}&selectedItem=${encodeURIComponent(dataToSend.selectedItem)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch consecutive question data");
    }

    const data = await response.json();
    console.log("Consecutive question data:", data);

    if (data && data.actionName) {
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
      setTrackerCount(0);
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

      {/* <button onClick={handleBack}>Back</button> */}

      <button onClick={handleBack} className="back-button-008">Back</button>




      <div className="right-section006">
        <div className="performed-steps-box006">
          <h3>Performed Steps</h3>
          {performedSteps.length > 0 ? (
 <ul className="performed-steps-list">
 {performedSteps.map((step, index) => (
   <li key={index}>
     <a
       href="#"
       className="performed-question-link"
       onClick={(e) => handleQuestionClick(e, step.question)}
     >
       {index + 1}) {step.question}
     </a>
     <br />
     <span className="performed-answer"> &nbsp; >> {step.response}</span>
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
