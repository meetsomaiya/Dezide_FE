import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access the route's state
import "./PauseSession224.css";

const PauseSession224 = () => {
  const location = useLocation(); // Access the location object
  const { sessionId } = location.state || {}; // Get the sessionId from the state passed via navigation
  
  // Default session ID if none is passed
  const [displaySessionId, setDisplaySessionId] = useState(sessionId || 'No session ID available');

  useEffect(() => {
    // If sessionId is available in location state, update the displaySessionId
    if (sessionId) {
      setDisplaySessionId(sessionId);
    }
  }, [sessionId]);

  return (
    <div>
      {/* Search and Buttons Section */}
      <div className="search-section005">
        <div className="search-row005">

          {/* Customer Search Input */}
          <div className="search-input-group005">
            <label htmlFor="customer" className="label005">
              Customer
            </label>
            <input type="text" id="customer" className="input-box005" />
          </div>

          {/* History Button and Search Input */}
          <div className="search-input-group005">
            <button className="btn005">History</button>
            <input type="text" className="input-box006" />
          </div>

          {/* Resume and Feedback Buttons */}
          <div className="search-buttons005">
            <button className="btn005">Resume</button>
            <button className="btn005">Feedback</button>
          </div>

          {/* Extra Buttons Section */}
          <div className="extra-buttons-right">
            <button className="btn-right">Basic</button>
            <button className="btn-right">Normal</button>
            <input type="text" className="input-right" />
            <button className="btn-right search-btn">Search</button>
          </div>

        </div>
      </div>

      {/* Session Information Section with Border */}
      <div className="session-info-box-331">
        <p>The session has been put on hold</p>
        <p>
          To resume the session, paste the below session id in the resume box and press the 'Resume' button
        </p>
        <p className="session-id-331">
          {/* Display the session ID passed from the parent via navigation */}
          {displaySessionId}
        </p>
        <button className="btn-331">Show session</button>
      </div>
    </div>
  );
};

export default PauseSession224;
