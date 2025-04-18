import React, { useState, useEffect } from "react";
import "./DynamicGuides882.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Sidebar from '../components/Sidebar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faFileAlt, faBook, faQuestionCircle, faPhotoVideo, faHeadset } from '@fortawesome/free-solid-svg-icons';




const DynamicGuides882 = () => {
  const location = useLocation();
  const navigate = useNavigate();

const [isModalOpen, setModalOpen] = useState(false);
const [modalName, setModalName] = useState("");


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

  const [isCreateTopCauseBoxVisible, setCreateTopCauseBoxVisible] = React.useState(false);

  const [topCause, setTopCause] = React.useState(null);

  const [topCauseText, setTopCauseText] = React.useState(''); // State for the editable text

  const [isCreateTopCauseInputVisible, setIsCreateTopCauseInputVisible] = useState(false);
  const [topCauses, setTopCauses] = useState([]);
  const [newCause, setNewCause] = useState({ name: '', probability: '' });
  

  const handleSliderChange = (index, value) => {
    const total = 100;
    let updatedCauses = [...causesData]; // Clone the existing causes
    let delta = 0;
  
    // If the index is less than causesData length, we're adjusting an existing cause
    if (index < causesData.length) {
      delta = value - updatedCauses[index].probability;
      updatedCauses[index].probability = value;
    } else {
      // If the index is the new cause index, update the new cause directly
      delta = value - newCause.probability;
      setNewCause((prevState) => ({
        ...prevState,
        probability: value,
      }));
    }
  
    // Redistribute the delta proportionally among the other causes (excluding the one being adjusted)
    let remaining = total - value;
    const otherCauses = updatedCauses.filter((_, i) => i !== index);
  
    otherCauses.forEach((cause) => {
      if (remaining <= 0) return;
  
      const adjustment = Math.min(
        Math.round((cause.probability / (total - value)) * delta),
        remaining
      );
      cause.probability = Math.max(0, cause.probability - adjustment);
      remaining -= adjustment;
    });
  
    // If the new cause is being adjusted, it will be tracked in state directly
    // Do not add it to `updatedCauses` yet, it's managed in state separately
  
    // Recalculate the total to ensure the sum is always 100%
    const correctedTotal = updatedCauses.reduce((sum, c) => sum + c.probability, 0);
    updatedCauses = updatedCauses.map((cause) => ({
      ...cause,
      probability: Math.round((cause.probability / correctedTotal) * total),
    }));
  
    setCausesData(updatedCauses); // Update the causes data without the new cause
  };
  
  
  
  
   // Handles when the user clicks to create a new top cause
const handleCreateTopCauseClick = () => {
  setIsCreateTopCauseInputVisible(true);

  // Add a new cause with a dummy name when the input field is shown
  const newCause = { name: 'Untitled Cause', probability: 0 }; // Set default name and initial probability
  setCausesData([{ ...newCause }, ...causesData]); // Add the new cause to the beginning of the causesData

  setNewCause(newCause); // Update the new cause state
  setIsCreateTopCauseInputVisible(false); // Hide input after adding cause
};

// Handles input changes for the new cause fields (only triggered when creating a new cause)
const handleNewCauseChange = (e) => {
  // Update the new cause with the name and probability
  const updatedCause = { name: e.target.value || 'Untitled Cause', probability: newCause.probability };

  // If input is not empty and name is not the default, create the cause
  if (updatedCause.name !== 'Untitled Cause') {
    const updatedCauses = [{ name: updatedCause.name, probability: updatedCause.probability }, ...causesData];
    setCausesData(updatedCauses); // Update causesData with the new cause
    setNewCause(updatedCause); // Update cause state with the new input
    setIsCreateTopCauseInputVisible(false); // Hide input after adding cause
  } else {
    // If input is empty (or still has default name), show the input field
    setIsCreateTopCauseInputVisible(true);
  }
};
    
  
  
    

   // Adds the new top cause to the existing data
   const handleAddTopCause = () => {
    if (newCause.name && newCause.probability !== undefined) {
      // Add the new cause to the beginning of the causesData list
      const updatedCauses = [{ name: newCause.name, probability: newCause.probability }, ...causesData];
      setCausesData(updatedCauses); // Update causesData to include the new cause
      setNewCause({ name: '', probability: 0 }); // Reset the new cause input
      setIsCreateTopCauseInputVisible(false); // Hide input after adding
    }
  };
  
  
  

  





  const handleNewCauseSliderChange = (value) => {
    const total = 100;
  
    // Update the new cause probability (ensure it's within the range 0-100)
    const updatedNewCause = { ...newCause, probability: Math.min(100, Math.max(0, value)) };
  
    // Calculate the remaining probability that needs to be redistributed
    const remaining = total - updatedNewCause.probability;
  
    // Clone the causesData to avoid direct state mutation
    let updatedCauses = [...causesData];
  
    // Calculate the total probability of all existing causes
    const totalExistingCauses = updatedCauses.reduce((sum, cause) => sum + cause.probability, 0);
  
    // Redistribute the remaining probability proportionally among the existing causes
    updatedCauses = updatedCauses.map((cause) => {
      // Proportional adjustment based on each cause's share of the total existing causes
      const adjustment = (cause.probability / totalExistingCauses) * remaining;
      cause.probability = Math.max(0, cause.probability - adjustment); // Ensure no negative probabilities
      return cause;
    });
  
    // Normalize the probabilities to make sure they sum to 100% after adjustments
    const correctedTotal = updatedCauses.reduce((sum, cause) => sum + cause.probability, 0);
  
    updatedCauses = updatedCauses.map((cause) => ({
      ...cause,
      probability: Math.round((cause.probability / correctedTotal) * total), // Normalize each cause
    }));
  
    // Update causes and the new cause state
    setCausesData(updatedCauses);
    setNewCause(updatedNewCause); // Update the new cause state with the slider value
  };
  
  
  
// Handles input changes for the new cause fields
// Handle creating a new top cause directly when the user starts typing
// const handleNewCauseChange = (e) => {
//   // Update the new cause with the name and probability
//   const updatedCause = { name: e.target.value || 'Untitled Cause', probability: newCause.probability };

//   // If input is not empty, create the cause
//   if (updatedCause.name !== 'Untitled Cause') { // Check if the name is not the dummy one
//     const updatedCauses = [{ name: updatedCause.name, probability: updatedCause.probability }, ...causesData];
//     setCausesData(updatedCauses);
//     setNewCause(updatedCause); // Update cause state with the new input
//     setIsCreateTopCauseInputVisible(false); // Hide input after adding cause
//   } else {
//     // If input is empty (or still has default name), show the input field
//     setIsCreateTopCauseInputVisible(true);
//   }
// };

  // Resets the input field and hides it
  const handleRemoveTopCauseInput = () => {
    setIsCreateTopCauseInputVisible(false);
    setNewCause({ name: '', probability: '' });
  };


    // Effect hook to listen for clicks outside the table
    useEffect(() => {
      const handleClickOutside = (event) => {
        const tableElement = document.querySelector('.modal-table');
        if (tableElement && !tableElement.contains(event.target)) {
          setTopCause(null);  // Remove the top cause if clicked outside
        }
      };
  
      // Add event listener
      document.addEventListener('mousedown', handleClickOutside);
  
      // Cleanup the event listener on component unmount
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    // Function to handle creating a new top cause
    const handleCreateTopCause = () => {
      // Example: set the first cause as the top cause, or choose based on your logic
      if (causesData.length > 0) {
        setTopCause(causesData[0]);  // Set the first cause as the top cause
      }
    };
  
    // Function to remove the top cause
    const removeTopCause = () => {
      setTopCause(null);  // Remove the top cause from state
    };
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
        const url = `http://localhost:226/api/fetch_sub_cause_based_on_cause?CauseName=${encodeURIComponent(subCauseName)}`;
        console.log(`subcause URL formed: ${url}`); // Log the URL being used
  
        const response = await fetch(url);
  
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
              // name: item.SubCauseName,
              name: item.EventName,
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
        const url = `http://localhost:226/api/fetch_event_causes_actions?eventName=${encodeURIComponent(name)}`;
        console.log("API URL:", url);
    
        const response = await fetch(url, { method: "GET" });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
    
        const result = await response.json();
        console.log("API Response:", result);
    
        // Debug: Check if `tblTopCauseData` exists and is an array
        if (Array.isArray(result.tblTopCauseData)) {
          const extractedCauses = result.tblTopCauseData.map((cause) => {
            console.log("Cause Object:", cause); // Debug individual cause objects
            return {
              name: cause.TopCauseName || "Unknown Name", // Fallback if key is missing
              probability: cause.ProbabilityPercentage || 0, // Fallback if key is missing
            };
          });
          setCausesData(extractedCauses);
        } else {
          console.warn("tblTopCauseData is not an array or missing.");
          setCausesData([]);
        }
    
        // Debug: Check if `eventObject` exists and is an array
        if (Array.isArray(result.eventObject)) {
          const extractedActions = result.eventObject.map((action) => {
            console.log("Action Object:", action); // Debug individual action objects
            return {
              name: action.ActionName || "Unknown Action", // Fallback if key is missing
              time: action.ActionTime || "N/A", // Fallback if key is missing
              money: action.ActionCost || 0, // Fallback if key is missing
            };
          });
          setActionsData(extractedActions);
        } else {
          console.warn("eventObject is not an array or missing.");
          setActionsData([]);
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

            // Form the URL
    const url = `http://localhost:226/api/fetch_cause_from_top_cause?topCauseName=${encodeURIComponent(causeName)}`;
    
    // Log the URL formed
    console.log("cause URL formed from top cause:", url);
        
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

<Sidebar />

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
            <h3>
  Causes
  <span className="create-top-cause" onClick={handleCreateTopCauseClick}>
    *
  </span>
</h3>

<table className="modal-table">
  <thead>
    <tr>
      <th></th> {/* For the plus/minus icon */}
      <th>Cause</th>
      <th>Probability</th>
    </tr>
  </thead>
  <tbody>
    {isCreateTopCauseInputVisible && (
      <tr>
        <td>
          <button
            className="remove-top-cause"
            onClick={() => setIsCreateTopCauseInputVisible(false)}
          >
            ×
          </button>
        </td>
        <td>
          <input
            type="text"
            placeholder="Top Cause Name"
            value={newCause.name}
            onChange={(e) => handleNewCauseChange(e)} // Handle new cause creation directly
          />
        </td>
        <td>
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="100"
              value={newCause.probability}
              className="slider"
              onChange={(e) => handleSliderChange(causesData.length, Number(e.target.value))}
            />
            <span className="probability">{newCause.probability}%</span>
          </div>
        </td>
      </tr>
    )}

    {causesData.map((cause, index) => (
      <React.Fragment key={index}>
        {/* Main Cause Row */}
        <tr>
          <td>
            <button
              className="toggle-button"
              onClick={() => handleFetchCause(cause.name)}
            >
              {expandedCauseName === cause.name ? '-' : '+'}
            </button>
          </td>
          <td>
            <input
              type="text"
              value={cause.name}
              onChange={(e) => {
                const updatedCauses = [...causesData];
                updatedCauses[index].name = e.target.value;
                setCausesData(updatedCauses);
              }}
            />
          </td>
          <td>
            <div className="slider-container">
              <input
                type="range"
                min="0"
                max="100"
                value={cause.probability}
                className="slider"
                onChange={(e) => handleSliderChange(index, Number(e.target.value))}
              />
              <span className="probability">{cause.probability}%</span>
            </div>
          </td>
        </tr>

        {/* Render expanded sub-cause rows */}
        {expandedCauseName === cause.name && expandedCauseData &&
          expandedCauseData.map((causeDetail, subIndex) => (
            <React.Fragment key={`${index}-${subIndex}`}>
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
                    {expandedSubCause[`${cause.name}-${causeDetail.CauseName}`] ? '-' : '+'}
                  </button>
                </td>
                <td>{causeDetail.CauseName}</td>
                <td>{causeDetail.ProbabilityPercentage}%</td>
              </tr>

              {/* Nested sub-cause rows */}
              {expandedSubCause[`${cause.name}-${causeDetail.CauseName}`] &&
                nestedSubCauseData[`${cause.name}-${causeDetail.CauseName}`] &&
                nestedSubCauseData[`${cause.name}-${causeDetail.CauseName}`].map((subCause, nestedIndex) => (
                  <tr
                    key={`${index}-${subIndex}-${nestedIndex}`}
                    className="nested-sub-cause-row"
                  >
                    <td></td>
                    <td>{subCause.name}</td>
                    <td>{subCause.probability}%</td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
      </React.Fragment>
    ))}
  </tbody>
</table>

{/* Save Button Below Table */}
<div className="save-button-container-882">
  <button
    className="save-button-882"
  >
    Save
  </button>
</div>



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
