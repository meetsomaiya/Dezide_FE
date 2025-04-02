import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaRedo, FaEdit, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './PreviewComponent920.css';
import Sidebar991 from '../components/Sidebar991';

const PreviewComponent920 = () => {
  const location = useLocation();
  const modalName = location.state?.modalName || 'Default Modal';

  const [showDetails920, setShowDetails920] = useState(false);

  const toggleDetails920 = () => {
    setShowDetails920(!showDetails920);
  };

  return (
    <div className="preview-container-920">
      {/* Header */}
      <header className="preview-header-920">
        <nav className="breadcrumb-920">Dynamic Guides &gt; {modalName}</nav>
        <h2>Current guide: {modalName}</h2>
        <div className="header-buttons-920">
          <button className="restart-button-920">
            <FaRedo /> Restart
          </button>
          <button className="edit-button-920">
            <FaEdit /> Edit
          </button>
        </div>
      </header>

      {/* Question Section */}
      {/* Parent Flex Container */}
      <div className="main-content-920">
  {/* Question Section */}
  <div className="question-section-920">
    <h3>Is any of the following circuit breaker tripped?</h3>
    <div className="options-container-920">
      <button className="option-button-920">None of the breaker tripped.</button>
      <button className="option-button-920">230V AC pitch supply breaker (-2F3) tripped in top cabinet (CTO).</button>
      <button className="option-button-920">3 x 230V AC pitch supply breaker (-10F1) tripped in bottom cabinet (CBO).</button>
      <button className="option-button-920">3 x 400V AC pitch supply breaker (-33F1) tripped in bottom cabinet (CBO).</button>
      <button className="option-button-920">3 x 230V AC pitch supply breaker (-2Q1) tripped in top cabinet (CTO).</button>
      <button className="unknown-button-920">I don’t know</button>
    </div>
  </div>

  {/* Right-side container for History and Expert Level */}
  <div className="right-side-container-920">
    <div className="history-box-920">
      <h4>History</h4>
      <p>No steps performed.</p>
    </div>
    <div className="expert-level-box-920">
      <h4>Expert level 0</h4>
      <div className="slider-container-920">
        <input type="range" min="0" max="10" defaultValue="0" className="slider-920" />
      </div>
    </div>
  </div>
</div>


      {/* Footer */}
{/* Footer */}
<footer className={`footer-section-920 ${showDetails920 ? 'show-details' : ''}`}>
  {/* Show Details button (hidden when details are shown) */}
  {!showDetails920 && (
    <button className="details-button-920 show-details-btn" onClick={toggleDetails920}>
      <FaChevronUp /> Show details
    </button>
  )}

  {/* Hide Details button (shown when details are visible) */}
  {showDetails920 && (
    <div className="details-button-wrapper">
      <button className="details-button-920 hide-details-btn" onClick={toggleDetails920}>
        <FaChevronDown /> Hide details
      </button>
    </div>
  )}
</footer>


      {/* Details Section */}
      {showDetails920 && (
        <div className="details-section-920">
          <div className="details-tables-920">
          <table className="details-table-920">
  <thead>
    <tr>
      <th>Causes</th>
      <th>P</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <a href="#" onClick={() => alert('Clicked: Safety speed relay (8K1)')}>
          Safety speed relay (8K1)
        </a>
      </td>
      <td>10.8</td>
    </tr>
    <tr>
      <td>
        <a href="#" onClick={() => alert('Clicked: Safety chain contactor (3K1)')}>
          Safety chain contactor (3K1)
        </a>
      </td>
      <td>10.8</td>
    </tr>
  </tbody>
</table>

<table className="details-table-920">
  <thead>
    <tr>
      <th>Actions</th>
      <th>P</th>
      <th>C</th>
      <th>P/C</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <a href="#" onClick={() => alert('Clicked: Check hub slip ring connection tightness')}>
          Check hub slip ring connection tightness
        </a>
      </td>
      <td>0</td>
      <td>10.8</td>
      <td>1.1</td>
    </tr>
  </tbody>
</table>

<table className="details-table-920">
  <thead>
    <tr>
      <th>Questions</th>
      <th>Level</th>
      <th>C</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <a href="#" onClick={() => alert('Clicked: Is any of the following circuit breaker tripped?')}>
          Is any of the following circuit breaker tripped?
        </a>
      </td>
      <td>0</td>
      <td>5.0</td>
    </tr>
    <tr>
      <td>
        <a href="#" onClick={() => alert('Clicked: From EVT logs, check Dii_PitX_EmergencyRun...')}>
          From EVT logs, check Dii_PitX_EmergencyRun...
        </a>
      </td>
      <td>0</td>
      <td>1.0</td>
    </tr>
  </tbody>
</table>

          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewComponent920;
