import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaRedo, FaEdit } from 'react-icons/fa'; // React Icons for relevant buttons
import './PreviewComponent920.css';


const PreviewComponent920 = () => {
  const location = useLocation();
  const modalName = location.state?.modalName || 'Default Modal'; // Default value if modalName is missing

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

      {/* Footer */}
      <footer className="footer-section-920">
        <button className="details-button-920">Show details</button>
      </footer>
    </div>
  );
};

export default PreviewComponent920;
