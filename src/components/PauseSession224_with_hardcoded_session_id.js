import React from 'react';
import "./PauseSession224.css";

const PauseSession224 = () => {
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
          00b9fc5b-7ec5-47d2-b24d-44be97
        </p>
        <button className="btn-331">Show session</button>
      </div>
    </div>
  );
};

export default PauseSession224;
