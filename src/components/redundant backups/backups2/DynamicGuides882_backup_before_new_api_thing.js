import React, { useState, useEffect } from "react";

import "./DynamicGuides882.css";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faFileAlt, faBook, faQuestionCircle, faPhotoVideo, faHeadset } from '@fortawesome/free-solid-svg-icons';




const DynamicGuides882 = () => {
  const [isModalOpen, setModalOpen] = useState(false);
const [modalName, setModalName] = useState("");
  const navigate = useNavigate(); // For navigation programmatically

  const [causesData, setCausesData] = useState([]); // New state for Causes data

  const [actionsData, setActionsData] = useState([]); // New state for Causes data

    // State to track expanded row by cause.name, and store the fetched data
    const [expandedCauseName, setExpandedCauseName] = useState(null);
    const [expandedCauseData, setExpandedCauseData] = useState(null);
    

  // State to track the expanded causes and store fetched data
  const [expandedCauses, setExpandedCauses] = useState({});

  const [expandedSubCause, setExpandedSubCause] = React.useState({});

  const [subCauseData, setSubCauseData] = React.useState({});

  const [nestedSubCauseData, setNestedSubCauseData] = useState({});



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

  // const handleSubCauseToggle = (key) => {
  //   setExpandedSubCause((prevState) => ({
  //     ...prevState,
  //     [key]: !prevState[key], // Toggle the state
  //   }));
  // };

  const handleSubCauseToggleAndFetch = async (key, subCauseName) => {
    console.log(`Toggling sub-cause: ${subCauseName}`); // Log the name being sent
  
    // Toggle the expanded state for the sub-cause
    setExpandedSubCause((prevState) => ({
      ...prevState,
      [key]: !prevState[key], // Toggle the state
    }));
  
    // Fetch data only if expanding the sub-cause and no data exists
    if (!expandedSubCause[key] || !nestedSubCauseData[key]) {
      try {
        const response = await fetch(
          `http://localhost:226/api/fetch_sub_cause_based_on_cause?CauseName=${encodeURIComponent(
            subCauseName
          )}`
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('Fetched sub-cause data:', data);
  
        if (data.success && data.data) {
          // Embed the fetched sub-cause data under the current sub-cause
          setNestedSubCauseData((prevState) => ({
            ...prevState,
            [key]: data.data.map((item) => ({
              name: item.SubCauseName,
              probability: item.ProbabilityPercentage,
            })),
          }));
        }
      } catch (error) {
        console.error('Error fetching sub-cause data:', error);
      }
    }
  };
  
  

    // Example of how to use the state and trigger the effect when needed
    useEffect(() => {
      if (expandedSubCause) {
        console.log('Fetched data for sub-cause inside expandedSubcause:', expandedSubCause);
      }
    }, [expandedSubCause]);  // Re-run when the subCauseData state changes
  
  
    const handleCreateClick = () => {
      navigate("/create-dynamic-guide"); // Redirect to CreateDynamicGuide route
    };
  
    const handleImportClick = () => {
      navigate("/import-dynamic-guide"); // Redirect to CreateDynamicGuide route
    };

    const handleRowClick = async (name) => {
      console.log(`Navigating to modal with name: ${name}`);
    
      try {
        const response = await fetch(
          `http://localhost:226/api/fetch_event_causes_actions?eventName=${encodeURIComponent(name)}`,
          {
            method: "GET",
          }
        );
    
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
    
        const result = await response.json();
        console.log("API Response:", result);
    
        // Handle causes data
        if (result.message === "No data found for the given event name.") {
          setCausesData([]); // Clear causes data
        } else {
          const extractedCauses = result.tblTopCauseData.map((cause) => ({
            name: cause.TopCauseName,
            probability: cause.ProbabilityPercentage,
          }));
          setCausesData(extractedCauses);
        }
    
        // Handle actions data
        if (result.message === "No data found for the given event name.") {
          setActionsData([]); // Clear actions data
        } else {
          const extractedActions = result.eventObject.map((action) => ({
            name: action.ActionName, // Assuming "ActionName" is the correct key
            time: action.ActionTime,
            money: action.ActionCost
           // probability: action.ActionProbability, // Assuming "ActionProbability" is the correct key
          }));
          setActionsData(extractedActions);
        }
      } catch (error) {
        console.error("Failed to fetch event causes actions:", error);
        setCausesData([]); // Clear causes data on error
        setActionsData([]); // Clear actions data on error
      }
    
      setModalName(name); // Set name for modal
      setModalOpen(true); // Open modal
    };
    

    // Function to handle fetching cause data and toggling expansion
    const handleFetchCause = async (causeName) => {
      if (expandedCauseName === causeName) {
        // If the same cause is clicked again, collapse it
        setExpandedCauseName(null);
        setExpandedCauseData(null);
        return;
      }
  
      // Otherwise, fetch new cause data and expand the row
      try {
        console.log(`Fetching additional data for cause: ${causeName}`);
        
        const response = await fetch(
          `http://localhost:226/api/fetch_cause_from_top_cause?topCauseName=${encodeURIComponent(causeName)}`,
          {
            method: "GET",
          }
        );
    
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
    
        const result = await response.json();
        console.log("Additional Cause Data:", result);
    
        // Set the expanded cause name and the fetched data
        setExpandedCauseName(causeName);
        setExpandedCauseData(result.data.causeObject);
    
      } catch (error) {
        console.error("Failed to fetch additional cause data:", error);
      }
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
        {/* <button className="import-btn-882">Import</button> */}
        <button className="import-btn-882" onClick={handleImportClick}>
      Import
    </button>

        {/* <button className="create-btn-882">Create</button> */}
        <button className="create-btn-882" onClick={handleCreateClick}>
      Create
    </button>
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
  {
  isModalOpen && (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <h2>{modalName}</h2>
          </div>
          <div className="modal-controls">
            <select className="hierarchy-dropdown">
              <option value="Hierarchy1">Hierarchy 1</option>
              <option value="Hierarchy2">Hierarchy 2</option>
            </select>
            <button className="modal-button">
              <i className="fa fa-chart-bar"></i> Summary
            </button>
            <button className="modal-button">
              <i className="fa fa-exclamation-triangle"></i> Constraints
            </button>
            <select className="tools-dropdown">
              <option value="Tool1">Tool 1</option>
              <option value="Tool2">Tool 2</option>
            </select>
            <button className="modal-button preview-btn">
              <i className="fa fa-eye"></i> Preview
            </button>
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
          <th></th> {/* For the plus/minus icon */}
          <th>Cause</th>
          <th>Probability</th>
        </tr>
      </thead>
      <tbody>
  {/* Map through the causesData to generate rows */}
  {causesData.length > 0 ? (
    causesData.map((cause, index) => (
      <React.Fragment key={index}>
        {/* Main Cause Row */}
        <tr>
          <td>
            <button
              className="toggle-button"
              onClick={() => handleFetchCause(cause.name)} // Use cause.name for identification
            >
              {/* Show plus sign if collapsed, minus sign if expanded */}
              {expandedCauseName === cause.name ? '-' : '+'}
            </button>
          </td>
          <td>{cause.name}</td>
          <td>{cause.probability}%</td>
        </tr>

        {/* Render the expanded sub-cause rows ONLY if the current row's name is expanded */}
        {expandedCauseName === cause.name && expandedCauseData && (
          expandedCauseData.map((causeDetail, subIndex) => (
            <React.Fragment key={`${index}-${subIndex}`}>
              {/* Sub-Cause Row */}
              <tr className="sub-cause-row">
                <td>
                  <button
                    className="toggle-button"
                    onClick={() =>
                      handleSubCauseToggleAndFetch(
                        `${cause.name}-${causeDetail.CauseName}`,
                        causeDetail.CauseName
                      )
                    }
                  >
                    {/* Show plus sign if collapsed, minus sign if expanded */}
                    {expandedSubCause[`${cause.name}-${causeDetail.CauseName}`] ? '-' : '+'}
                  </button>
                </td>
                <td>{causeDetail.CauseName}</td>
                <td>{causeDetail.ProbabilityPercentage}%</td>
              </tr>

              {/* Nested sub-cause details */}
              {expandedSubCause[`${cause.name}-${causeDetail.CauseName}`] &&
                nestedSubCauseData[`${cause.name}-${causeDetail.CauseName}`] &&
                nestedSubCauseData[`${cause.name}-${causeDetail.CauseName}`].map((subCause, nestedIndex) => (
                  <tr
                    key={`${index}-${subIndex}-${nestedIndex}`}
                    className="nested-sub-cause-row"
                  >
                    <td></td> {/* Leave empty for alignment */}
                    <td>{subCause.name}</td>
                    <td>{subCause.probability}%</td>
                  </tr>
                ))}
            </React.Fragment>
          ))
        )}
      </React.Fragment>
    ))
  ) : (
    <tr>
      <td colSpan="3">No causes found.</td>
    </tr>
  )}
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
                    <td>
                      <i className="fa fa-link"></i> Link 1
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <i className="fa fa-link"></i> Link 2
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <i className="fa fa-link"></i> Link 3
                    </td>
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
    {actionsData && actionsData.length > 0 ? (
      actionsData.map((action, index) => (
        <tr key={index}>
          <td>{action.name}</td> {/* Dynamic Action Name */}
          <td>{action.time || "N/A"}</td> {/* Assuming "time" is part of the action object */}
          <td>{action.money || "N/A"}</td> {/* Assuming "money" is part of the action object */}
          <td>{action.level || "N/A"}</td> {/* Assuming "level" is part of the action object */}
          <td>
            <input type="checkbox" />
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="5">No actions available</td> {/* Fallback when no data */}
      </tr>
    )}
  </tbody>
</table>

          </div>
        </div>

        {/* Close Button */}
        <button className="close-modal-button" onClick={closeModal}>
          <i className="fa fa-times"></i> Close
        </button>
      </div>
    </div>
  )};

    </div>
  );
};

export default DynamicGuides882;
