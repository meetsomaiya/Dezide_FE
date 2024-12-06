import React, { useState } from "react";
import "./GuideDashboard005.css";

const GuideDashboard005 = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="container005">
      {/* Header Section */}
      <header className="header005">
        <div className="dropdown-container005">
          <div className="dropdown-trigger005" onClick={toggleDropdown}>
            ▲ S88 - STV
          </div>
          {dropdownVisible && (
            <div className="dropdown-menu005">
              <label>
                <input type="radio" name="option" value="option1" /> Option 1
              </label>
              <label>
                <input type="radio" name="option" value="option2" /> Option 2
              </label>
              <label>
                <input type="radio" name="option" value="option3" /> Option 3
              </label>
            </div>
          )}
        </div>
        <div className="alarm-list-trigger005">▲ Alarm list</div>
        <button className="signoff-btn005">Sign off</button>
      </header>

      {/* Search and Buttons Section */}
      <div className="search-section005">
        <div className="search-row005">
          <div className="search-input-group005">
            <label htmlFor="customer" className="label005">Customer</label>
            <input type="text" id="customer" className="input-box005" />
          </div>
          <div className="search-input-group005">
            <button className="btn005">History</button>
            <input type="text" className="input-box005" />
          </div>
          <div className="search-buttons005">
            <button className="btn005">Resume</button>
            <button className="btn005">Feedback</button>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="main-content005">
        {/* Left Section (Table for Time, Item, Agent) */}
        <div className="left-section005">
          <div className="table-header005">
            <span className="table-header-item005">Time</span>
            <span className="table-header-item005">Item</span>
            <span className="table-header-item005">Agent</span>
          </div>
          <div className="table-body005">
            {/* Table rows can go here */}
          </div>
        </div>

        {/* Right Section (Tabs and Alarm List) */}
        <div className="right-section005">
          <div className="tabs-container005">
            <button className="tab005 active005">FM1-50</button>
            <button className="tab005">FM51-100</button>
            <button className="tab005">FM101-150</button>
            <button className="tab005">FM151-200</button>
          </div>
          <div className="alarm-list005">
            <ul className="alarm-items005">
              <li className="alarm-item005">
                <span className="icon005">⚡</span> FM1 RS_Manual_FastStop
              </li>
              <li className="alarm-item005">
                <span className="icon005">⚡</span> FM2 RS_Manual_SoftStop
              </li>
              <li className="alarm-item005">
                <span className="icon005">⚡</span> FM3 RS_Emergency_BottomStop
              </li>
              <li className="alarm-item005">
                <span className="icon005">⚡</span> FM4 RS_Emergency_TopStop
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer005">© Dezide 2019</footer>
    </div>
  );
};

export default GuideDashboard005;
