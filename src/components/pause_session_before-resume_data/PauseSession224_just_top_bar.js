import React from 'react';

const PauseSession224 = () => {
  return (
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
  );
};

export default PauseSession224;
