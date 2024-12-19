import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa"; // For the exclamation icons
import "./GuideQuestionItem006.css"; // Link the CSS file for styling

import FeedBack222 from './FeedBack222';

const GuideQuestionItem = () => {
  const location = useLocation();


  const navigate = useNavigate();  // Use the navigate hook

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
  
  const [showModal333, setShowModal333] = useState(false); // Modal visibility state

  const [sessionId, setSessionId] = useState(""); // Session ID state

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

// Utility function to get a cookie by name
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null; // Return the value of the cookie or null if not found
};


const handleOpenModal333 = () => {
  setShowModal333(true); // Show the modal
};

const handleCloseModal333 = () => {
  setShowModal333(false); // Close the modal
};



  // Retrieve the session ID from cookies on component mount
  useEffect(() => {
    const id = getCookie("id"); // Get the session ID from cookies
    setSessionId(id); // Set the session ID to state
  }, []);

  // const handlePauseSession = () => {
  //   // Navigate to the 'pause-session' route and pass sessionId as state
  //   navigate("/pause-session", { state: { sessionId } }); // Use navigate to pass sessionId
  // };

  const handlePauseSession = () => {
    // Format the current date-time for 'time' field
    const currentDateTime = new Date().toISOString();
  
    // Prepare the data to be sent
    const requestData = {
      model_name: formattedEventNameParts[1], // Part of the event name
      session_id: sessionId, // Retrieved from cookies
      time: currentDateTime,
      solved: "discontinued",
      diagnosis: currentActionName,
      steps: performedSteps.map((step, index) => ({
        step_type: "action",
        step_name: step.question,
        step_operation: step.response,
        sequence_step_type: step.question,
        order: index + 1,
        sequence_step_name: step.question,
        sequence_step_answer: step.response,
        sequence_step_operation: "step",
      })),
    };
  
    // Log all the data being sent for clarity
    console.log("Data being sent to backend:");
    console.log(JSON.stringify(requestData, null, 2)); // Pretty-printed JSON in the console
  
    // Prepare query parameters for GET request
    const params = new URLSearchParams();
  
    // Add main fields
    params.append("model_name", requestData.model_name);
    params.append("session_id", requestData.session_id);
    params.append("time", requestData.time);
    params.append("solved", requestData.solved);
    params.append("diagnosis", requestData.diagnosis);
  
    // Add steps as query parameters
    requestData.steps.forEach((step, index) => {
      params.append(`steps[${index}][step_type]`, step.step_type);
      params.append(`steps[${index}][step_name]`, step.step_name);
      params.append(`steps[${index}][step_operation]`, step.step_operation);
      params.append(`steps[${index}][sequence_step_type]`, step.sequence_step_type);
      params.append(`steps[${index}][order]`, step.order);
      params.append(`steps[${index}][sequence_step_name]`, step.sequence_step_name);
      params.append(`steps[${index}][sequence_step_answer]`, step.sequence_step_answer);
      params.append(`steps[${index}][sequence_step_operation]`, step.sequence_step_operation);
    });
  
    // Construct the full URL
    const url = `http://localhost:226/api/pause_session?${params.toString()}`;
  
    // Send the GET request
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send pause session data.");
        }
        console.log("Pause session data sent successfully.");
        console.log("Response status:", response.status);
  
        // Navigate to the pause-session route
        navigate("/pause-session", { state: { sessionId } });
      })
      .catch((error) => {
        console.error("Error sending pause session data:", error);
        alert("An error occurred while sending pause session data.");
      });
  };
  

const handleStartOver187 = () => {
  // Reload the page to start over
  window.location.reload();
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

    // Extract formatted event parts
    const formattedEventNameParts = eventData
    ? getFormattedEventName(eventData).split('|').map((part) => part.trim())
    : ['', ''];

  // Reset state when the component unmounts
  useEffect(() => {
    return () => {
      setTrackerCount(0);
      setPerformedSteps([]);
    };
  }, []);

  return (
    
    <div className="container006">
            {/* Conditional rendering of FeedBack222 */}
            {showModal333 && (
        <FeedBack222
          currentActionName={currentActionName}
          eventNameOrange={formattedEventNameParts[1]} // Pass the orange part to the modal
          onCloseModal222={handleCloseModal333}
        />
      )}
      <div className="left-section006">
      {/* {eventData && <span className="event-name">{eventData}</span>}  */}
     {/* Display Event Name */}
     {eventData && (
        <span className="event-name">
          <span className="event-part-black">{formattedEventNameParts[0]}</span>
          {" | "}
          <span className="event-part-orange">{formattedEventNameParts[1]}</span>
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
        <button onClick={handleOpenModal333}>Feedback</button>
          {/* <button>Start Over</button> */}
          <button
  type="button"
  className="modal-reset-button222"
  onClick={handleStartOver187} // Call the reload function
>
  Start Over
</button>

          {/* <button>Pause</button> */}
          <button onClick={handlePauseSession}>Pause Session</button>
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
