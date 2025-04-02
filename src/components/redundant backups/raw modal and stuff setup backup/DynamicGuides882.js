import React, { useState } from "react";

import "./DynamicGuides882.css";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faFileAlt, faBook, faQuestionCircle, faPhotoVideo, faHeadset } from '@fortawesome/free-solid-svg-icons';


const DynamicGuides882 = () => {
  const [isModalOpen, setModalOpen] = useState(false);
const [modalName, setModalName] = useState("");
  const navigate = useNavigate(); // For navigation programmatically
  const tableData = [
    // Sample Data for the table
    {
      select: false,
      name: "FM283 Pitch_EmergencyRun",
      taxonomy: ["S9x Emerson V1", "S9x Woodward V2", "India"],
      language: "🇺🇸",
      lastChange: "Nov 18, 2024 12:07",
      lastChangeBy: "Ruchika K",
      published: "Aug 12, 2021 15:02",
      createdBy: "Jignesh Limbani",
      version: 637,
    },
    {
      select: false,
      name: "FM103 Elec_SafetyChainStop",
      taxonomy: ["S9x Emerson V1", "S9x Woodward V2", "India"],
      language: "🇺🇸",
      lastChange: "Nov 18, 2024 11:41",
      lastChangeBy: "Ruchika K",
      published: "Oct 09, 2018 16:48",
      createdBy: "Makarand Nandrekar",
      version: 488,
    },
    {
      select: false,
      name: "FM297 Rep_Pitch_EmergencyRun",
      taxonomy: ["S88 (SFS)", "India"],
      language: "🇺🇸",
      lastChange: "Nov 05, 2024 10:12",
      lastChangeBy: "Ruchika K",
      published: "Nov 26, 2018 12:46",
      createdBy: "Kalpesh Sutariya",
      version: 14,
    },
    {
      select: false,
      name: "Dynamic Create Test",
      taxonomy: ["S88 (SFS)", "India"],
      language: "🇺🇸",
      lastChange: "Oct 27, 2024 20:31",
      lastChangeBy: "Uttam Uttam",
      published: "Aug 27, 2018 15:56",
      createdBy: "Uttam Uttam",
      version: 48,
    },
    {
      select: false,
      name: "FM135 Pitch_FreqConvPitch1_ErrStop",
      taxonomy: ["S88 (SFS)", "India"],
      language: "🇺🇸",
      lastChange: "Apr 04, 2024 15:42",
      lastChangeBy: "Ashish Ambodiya",
      published: "May 26, 2021 09:29",
      createdBy: "Aniruddha Bokil",
      version: 279,
    },
    {
      select: false,
      name: "FM135 Pitch_FreqConvPitch1_ErrStop",
      taxonomy: ["S88 (SFS)", "India"],
      language: "🇺🇸",
      lastChange: "Apr 04, 2024 15:42",
      lastChangeBy: "Ashish Ambodiya",
      published: "May 26, 2021 09:29",
      createdBy: "Aniruddha Bokil",
      version: 279,
    },
    {
      select: false,
      name: "FM135 Pitch_FreqConvPitch1_ErrStop",
      taxonomy: ["S88 (SFS)", "India"],
      language: "🇺🇸",
      lastChange: "Apr 04, 2024 15:42",
      lastChangeBy: "Ashish Ambodiya",
      published: "May 26, 2021 09:29",
      createdBy: "Aniruddha Bokil",
      version: 279,
    },
    // Add more rows as needed for scrolling effect
  ];

  const handleRowClick = (name) => {
    console.log(`Navigating to modal with name: ${name}`);
    // navigate(`/dynamic-guides-modal`, { state: { name } });
    setModalName(name); // Set name for modal
    setModalOpen(true); // Open modal
  };

  const closeModal = () => {
    setModalOpen(false); // Close modal
  };

  return (
    <div className="layout-container-882">
      {/* Sidebar */}
      {/* <div className="sidebar-882">
        <ul>
          <li>
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </li>
          <li>
            <i className="fas fa-file-alt"></i> Dynamic Guides
          </li>
          <li>
            <i className="fas fa-book"></i> Static Guides
          </li>
          <li>
            <i className="fas fa-question-circle"></i> FAQs
          </li>
          <li>
            <i className="fas fa-photo-video"></i> Media
          </li>
          <li>
            <i className="fas fa-headset"></i> Contact Center
          </li>
        </ul>
      </div> */}

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
      <div className="content-882">

              {/* Buttons */}
      <div className="button-container-882">
        <button className="import-btn-882">Import</button>
        <button className="create-btn-882">Create</button>
      </div>

      <div className="dynamic-guides-container-882">
          <table className="dynamic-guides-table-882">
            <thead>
              <tr>
                <th>Select</th>
                <th>Name</th>
                <th>Taxonomy</th>
                <th>Language</th>
                <th>Last Change</th>
                <th>Last Change By</th>
                <th>Published</th>
                <th>Created By</th>
                <th>Version</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" checked={row.select} readOnly />
                  </td>
                  <td>
                    <button
                      className="name-link-button"
                      onClick={() => handleRowClick(row.name)}
                    >
                      {row.name}
                    </button>
                  </td>
                  <td>
                    {row.taxonomy.map((tag, i) => (
                      <span key={i} className="taxonomy-tag-882">
                        {tag}
                      </span>
                    ))}
                  </td>
                  <td>{row.language}</td>
                  <td>{row.lastChange}</td>
                  <td>{row.lastChangeBy}</td>
                  <td>{row.published}</td>
                  <td>{row.createdBy}</td>
                  <td>{row.version}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

         {/* Modal */}
         {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            {/* Header */}
            <div className="modal-header">
              <div className="modal-title">{modalName}</div>
              <div className="modal-controls">
                <select className="hierarchy-dropdown">
                  <option value="Hierarchy1">Hierarchy 1</option>
                  <option value="Hierarchy2">Hierarchy 2</option>
                </select>
                <button className="modal-button">Summary</button>
                <button className="modal-button">Constraints</button>
                <select className="tools-dropdown">
                  <option value="Tool1">Tool 1</option>
                  <option value="Tool2">Tool 2</option>
                </select>
                <button className="modal-button preview-btn">Preview</button>
              </div>
            </div>

            {/* Content */}
            <div className="modal-content">
              {/* Left Panel */}
              <div className="modal-left-panel">
                <div className="table-container">
                  <h3>Causes</h3>
                  <table className="modal-table">
                    <thead>
                      <tr>
                        <th>Cause</th>
                        <th>Probability</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Cause 1</td>
                        <td>
                          <i className="fa fa-plus"></i>
                        </td>
                      </tr>
                      <tr>
                        <td>Cause 2</td>
                        <td>
                          <i className="fa fa-plus"></i>
                        </td>
                      </tr>
                      <tr>
                        <td>Cause 3</td>
                        <td>
                          <i className="fa fa-plus"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="table-container">
                  <h3>Sub-Guide Links</h3>
                  <table className="modal-table">
                    <thead>
                      <tr>
                        <th>Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Link 1</td>
                      </tr>
                      <tr>
                        <td>Link 2</td>
                      </tr>
                      <tr>
                        <td>Link 3</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Panel */}
              <div className="modal-right-panel">
                <h3>Actions</h3>
                <table className="modal-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Time</th>
                      <th>Money</th>
                      <th>Level</th>
                      <th>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Action 1</td>
                      <td>10:00</td>
                      <td>$500</td>
                      <td>High</td>
                      <td>
                        <input type="checkbox" />
                      </td>
                    </tr>
                    <tr>
                      <td>Action 2</td>
                      <td>12:00</td>
                      <td>$200</td>
                      <td>Medium</td>
                      <td>
                        <input type="checkbox" />
                      </td>
                    </tr>
                    <tr>
                      <td>Action 3</td>
                      <td>14:00</td>
                      <td>$700</td>
                      <td>Low</td>
                      <td>
                        <input type="checkbox" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Close Button */}
            <button className="close-modal-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicGuides882;
