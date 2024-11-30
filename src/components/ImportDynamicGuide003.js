// ImportDynamicGuide003.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faFileAlt, faBook, faQuestionCircle, faPhotoVideo, faHeadset } from '@fortawesome/free-solid-svg-icons';
import './ImportDynamicGuide003.css'; // Import the CSS file

const ImportDynamicGuide003 = () => {
  const [fileName, setFileName] = useState(null);
  const [allowOverwrite, setAllowOverwrite] = useState(false);
  const [useFileNameForTitle, setUseFileNameForTitle] = useState(false);
  const [costFactor, setCostFactor] = useState(1);
  const [importExplanations, setImportExplanations] = useState(true);

  // Handle file selection
  const handleFileChange = (e) => {
    setFileName(e.target.files[0]);
  };

  return (
    <div className="page-container-003">
      {/* Sidebar */}
            {/* Sidebar */}
            <div className="sidebar-001">
  <ul>
    <li className="active-001">
      <Link to="/dashboard">
        <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
      </Link>
    </li>
    <li>
      <Link to="/dynamic-guides">
        <FontAwesomeIcon icon={faFileAlt} /> Dynamic Guides
      </Link>
    </li>
    <li>
      <FontAwesomeIcon icon={faBook} /> Static Guides
    </li>
    <li>
      <FontAwesomeIcon icon={faQuestionCircle} /> FAQs
    </li>
    <li>
      <FontAwesomeIcon icon={faPhotoVideo} /> Media
    </li>
    <li>
      <FontAwesomeIcon icon={faHeadset} /> Contact Center
    </li>
  </ul>
</div>

      {/* Main Content */}
      <div className="main-content-003">
        <h2>Import Dynamic Guide</h2>
        <div className="form-container-003">
          <div className="form-section-003">
            <h3>Import Dynamic Guide Information</h3>

            {/* Select Dynamic Guide */}
            <div className="form-group-003">
              <label htmlFor="dynamic-guide-003">Select dynamic guide to import</label>
              <input id="dynamic-guide-003" type="file" onChange={handleFileChange} />
              <small>No file chosen</small>
            </div>

            {/* Allow Overwriting Existing Guide */}
            <div className="form-group-003">
              <label htmlFor="overwrite-003">
                <input
                  type="checkbox"
                  id="overwrite-003"
                  checked={allowOverwrite}
                  onChange={() => setAllowOverwrite(!allowOverwrite)}
                />
                Allow overwriting existing guide
              </label>
            </div>

            {/* Use Filename for Guide Title */}
            <div className="form-group-003">
              <label htmlFor="use-filename-003">
                <input
                  type="checkbox"
                  id="use-filename-003"
                  checked={useFileNameForTitle}
                  onChange={() => setUseFileNameForTitle(!useFileNameForTitle)}
                />
                Use filename for guide title (instead of the title in the guide file)
              </label>
            </div>

            {/* Cost Factor */}
            <div className="form-group-003">
              <label htmlFor="cost-factor-003">Cost Factor</label>
              <input
                id="cost-factor-003"
                type="number"
                value={costFactor}
                onChange={(e) => setCostFactor(e.target.value)}
                min="1"
                max="10"
              />
              <small>1 (Low) to 10 (High)</small>
            </div>

            {/* Don't Import Explanations */}
            <div className="form-group-003">
              <label htmlFor="import-explanations-003">
                <input
                  type="checkbox"
                  id="import-explanations-003"
                  checked={importExplanations}
                  onChange={() => setImportExplanations(!importExplanations)}
                />
                Don't import explanations (for faster verification of guide structure)
              </label>
            </div>

            {/* Upload Button */}
            <div className="form-group-003">
              <button className="upload-btn-003">Upload</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportDynamicGuide003;
