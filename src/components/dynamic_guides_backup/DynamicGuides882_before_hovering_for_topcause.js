import React, { useState, useRef, useEffect } from "react";
import "./DynamicGuides882.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import Sidebar from '../components/Sidebar';
import Sidebar991 from '../components/Sidebar991';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faFileAlt, faBook, faQuestionCircle, faPhotoVideo, faHeadset } from '@fortawesome/free-solid-svg-icons';

import { FiTrendingUp } from "react-icons/fi"; // Slant upward icon
import { FiClock } from "react-icons/fi"; // Import clock icon



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
  
  const [isEditing882, setIsEditing882] = useState(false);
  const [modalName882, setModalName882] = useState(modalName);
  const inputRef882 = useRef(null);

  const [expandedRow883, setExpandedRow883] = useState(null);

    // New useState with the '884' suffix
    const [data884, setData884] = useState(null);
    const [loading884, setLoading884] = useState(true);
    const [error884, setError884] = useState(null);

    const [questionAnswers885, setQuestionAnswers885] = useState([]);

    const [editingField886, setEditingField886] = useState(null); // New state to track the currently edited field

    const [isEditMode, setIsEditMode] = useState(false); // Tracks if the table is in edit mode

    const [isProbabilityVisible, setIsProbabilityVisible] = useState(false); // Tracks if sliders are permanently visible

    // const handleEditField = (index, field) => {
    //   setEditingField886({ index, field }); // Set the field to edit
    // };

    const [rowsPerPage990, setRowsPerPage990] = useState(5); // Number of rows per page
    const [currentPage990, setCurrentPage990] = useState(1); // Current page number
  
    const totalRows990 = actionsData.length; // Total number of rows
    const totalPages990 = Math.ceil(totalRows990 / rowsPerPage990); // Total number of pages
  
    // Calculate the range of rows to display
    const startRow990 = (currentPage990 - 1) * rowsPerPage990;
    const endRow990 = Math.min(startRow990 + rowsPerPage990, totalRows990);
    const paginatedData990 = actionsData.slice(startRow990, endRow990);

    const [hoveredCause993, setHoveredCause993] = useState(null);

  
    // Handlers for changing rows per page
    const handleRowsChange990 = (e) => {
      setRowsPerPage990(Number(e.target.value));
      setCurrentPage990(1); // Reset to first page
    };
  
    // Handlers for navigation
    const handlePreviousPage990 = () => {
      if (currentPage990 > 1) setCurrentPage990(currentPage990 - 1);
    };
  
    const handleNextPage990 = () => {
      if (currentPage990 < totalPages990) setCurrentPage990(currentPage990 + 1);
    };

    const handleEditSubField886 = (index, field) => {
      setEditingField886({ index, field }); // Activate edit mode for sub-cause
    };
    const exitSubEditMode886 = () => {
      setEditingField886(null); // Reset edit mode
    };
    const handleSaveSubField886 = (index, field, value) => {
      const updatedSubCauses = [...expandedCauseData];
      updatedSubCauses[index][field] = value; // Update the specific field
      setExpandedCauseData(updatedSubCauses); // Update the state
      setEditingField886(null); // Exit edit mode
    };

    const fetchHoveringItemsForCause993 = async (causeName) => {
      try {
          // Log the original causeName being sent
          console.log("Sending request for cause:", causeName);
  
          // Encode the causeName but manually replace '+' with '%2B'
          const encodedCauseName = encodeURIComponent(causeName).replace(/\+/g, '%2B');
  
          // Make the fetch request with the encoded causeName
          const response = await fetch(`http://localhost:226/api/fetch_hovering_items_for_topcause?cause=${encodedCauseName}`);
          
          // Checking the response status before parsing it
          if (!response.ok) {
              throw new Error('Failed to fetch');
          }
          
          const data = await response.json();
          
          console.log("Received data:", data); // Log the response data received from the server
          
          // You can update any state based on the data you receive, if necessary
      } catch (error) {
          console.error("Error fetching items for hovering cause:", error);
      }
  };
  
    
            

  const handleEditField = (index, field) => {
    setEditingField886({ index, field });
    setIsProbabilityVisible(true); // Make sliders permanently visible
  };

    const exitEditMode = () => {
      setIsEditMode(false); // Exit edit mode
      setEditingField886(null);
    };

    const handleSaveField = (index, field, value) => {
      const updatedCauses = [...causesData];
      updatedCauses[index][field] = value;
      setCausesData(updatedCauses);
      setEditingField886(null);
    };


      // New state to track the currently editable row
  const [editableRow886, setEditableRow886] = useState(null);

  const [isEditMode886, setIsEditMode886] = useState(null); // Tracks the id of the cell in edit mode

  // const handleRowClick = (index) => {
  //   setEditableRow886(index); // Set the row index to editable mode
  // };

  const handleOutsideClick886 = () => {
    setEditableRow886(null); // Exit edit mode when clicking outside
  };

  const handleInputChange886 = (e, field, index) => {
    const updatedData = [...causesData];
    updatedData[index][field] = field === 'probability' ? Number(e.target.value) : e.target.value;
    setCausesData(updatedData);
  };

  // To handle outside clicks
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (!e.target.closest('.editable-row')) {
        handleOutsideClick886();
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

    

  // const toggleRow883 = (rowIndex) => {
  //   setExpandedRow883((prev) => (prev === rowIndex ? null : rowIndex));
  // };

  const toggleRow883 = (rowIndex, questionName) => {
    setExpandedRow883((prev) => (prev === rowIndex ? null : rowIndex));
  
    if (expandedRow883 !== rowIndex) {
      console.log("Sending data to API:", { questionName });
  
      // Use Fetch API to send the request to the backend
      fetch(`http://localhost:226/api/fetch_subquestion_for_event?questionName=${encodeURIComponent(questionName)}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Received data from API:", data);
  
          // Set the questionAnswers into the state
          if (data?.data?.questionAnswers) {
            setQuestionAnswers885(data.data.questionAnswers);
          }
        })
        .catch((error) => {
          console.error('Error fetching subquestions:', error);
        });
    }
  };
  

  
  useEffect(() => {
    const fetchData884 = async () => {
      try {
        // Log the data being sent
        console.log(`Sending request to: http://localhost:226/api/fetch_question_for_events?modalName=${modalName}`);

        // Send a GET request to the API with modalName as a query parameter
        const response = await fetch(
          `http://localhost:226/api/fetch_question_for_events?modalName=${modalName}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();

        // Log the fetched data
        console.log("Fetched data:", result);

        setData884(result); // Save the fetched data in state
      } catch (error) {
        setError884(error.message); // Handle errors
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading884(false); // Set loading to false after the request is complete
      }
    };

    fetchData884(); // Call the fetch function on component mount
  }, [modalName]); // Only re-run the effect if modalName changes

  // Close the textbox when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef882.current && !inputRef882.current.contains(event.target)) {
        setIsEditing882(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

    // Handles clicking on the cell to switch to input mode
    const handleCellClick = (id) => {
      setIsEditMode886(id);
    };
  
    // Handles input changes when in edit mode
    const handleCellChange886 = (id, field, value) => {
      setCausesData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        )
      );
    };
  
    // Handles switching back to table mode on blur
    const handleBlur886 = () => {
      setIsEditMode886(null);
    };
  

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
  
  const handleSubCauseSliderChange = (subIndex, value) => {
    const total = 100;
    let updatedSubCauses = [...expandedCauseData]; // Clone existing sub-causes
    let delta = 0;
  
    // Adjust the probability for the selected sub-cause
    if (subIndex < updatedSubCauses.length) {
      delta = value - updatedSubCauses[subIndex].ProbabilityPercentage;
      updatedSubCauses[subIndex].ProbabilityPercentage = value;
    }
  
    // Redistribute the delta proportionally among other sub-causes
    let remaining = total - value;
    const otherSubCauses = updatedSubCauses.filter((_, i) => i !== subIndex);
  
    otherSubCauses.forEach((subCause) => {
      if (remaining <= 0) return;
  
      const adjustment = Math.min(
        Math.round(
          (subCause.ProbabilityPercentage / (total - value)) * delta
        ),
        remaining
      );
      subCause.ProbabilityPercentage = Math.max(
        0,
        subCause.ProbabilityPercentage - adjustment
      );
      remaining -= adjustment;
    });
  
    // Ensure the total of all probabilities is 100%
    const correctedTotal = updatedSubCauses.reduce(
      (sum, sub) => sum + sub.ProbabilityPercentage,
      0
    );
    updatedSubCauses = updatedSubCauses.map((subCause) => ({
      ...subCause,
      ProbabilityPercentage: Math.round(
        (subCause.ProbabilityPercentage / correctedTotal) * total
      ),
    }));
  
    setExpandedCauseData(updatedSubCauses); // Update sub-causes state
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
       //   setEditableRow886(index); // Set the row index to editable mode
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
              internalCause: cause.internalCause ?? false, // Include internalCause, default to false
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

<Sidebar991 />

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
          {/* <div className="modal-title">
            <h2>{modalName}</h2>
          </div> */}
              <div
      className="modal-title"
      onClick={() => !isEditing882 && setIsEditing882(true)}
    >
      {isEditing882 ? (
        <input
          ref={inputRef882}
          type="text"
          value={modalName}
          onChange={(e) => setModalName(e.target.value)}
          onBlur={() => setIsEditing882(false)}
          autoFocus
        />
      ) : (
        <h2>{modalName || "Untitled"}</h2> // Fallback text for empty title
      )}
    </div>
    <div className="modal-controls">

  <button className="modal-button best-performing-btn">
    Cause 2 is performing best
  </button>


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

<table className="modal-table" id="cause-table">
  <thead>
    <tr>
      <th></th> {/* For the plus/minus icon */}
      <th>Cause</th>
      <th>Probability</th>
    </tr>
  </thead>
  <tbody>
    {causesData.map((cause, index) => (
      <React.Fragment key={index}>
        {/* Main Cause Row */}
        <tr
        onMouseEnter={() => {
          setHoveredCause993(cause.name); // Set the hovered cause name
          fetchHoveringItemsForCause993(cause.name); // Fetch items when hovering
        }}
        onMouseLeave={() => setHoveredCause993(null)} // Clear hovered cause when mouse leaves
      >
          
          <td>
            {/* Only render the button if internalCause is true */}
            {cause.internalCause && (
              <button
                className="toggle-button"
                onClick={() => handleFetchCause(cause.name)}
              >
                {expandedCauseName === cause.name ? "-" : "+"}
              </button>
            )}
          </td>
          <td>
            {editingField886?.index === index && editingField886?.field === "name" ? (
              <input
                type="text"
                value={cause.name}
                onChange={(e) =>
                  handleSaveField(index, "name", e.target.value)
                }
                onBlur={() => setEditingField886(null)} // Exit edit mode on blur
                autoFocus
              />
            ) : (
              <span onClick={() => handleEditField(index, "name")}>
                {cause.name}
              </span>
            )}
          </td>
          <td>
            <div className="slider-container">
              {isProbabilityVisible ? ( // Always show sliders once they are enabled
                <>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={cause.probability}
                    className="slider"
                    onChange={(e) =>
                      handleSliderChange(index, Number(e.target.value))
                    }
                  />
                  <span className="probability">{cause.probability}%</span>
                </>
              ) : (
                <span onClick={() => handleEditField(index, "probability")}>
                  {cause.probability}%
                </span>
              )}
            </div>
          </td>
        </tr>

        {/* Render expanded sub-cause rows */}
        {expandedCauseName === cause.name &&
          expandedCauseData.map((causeDetail, subIndex) => (
            <React.Fragment key={`${index}-${subIndex}`}>
<tr className="sub-cause-row" key={subIndex}>
  <td>
    {causeDetail.internalSubCause && (
      <button
        className="toggle-button"
        onClick={() =>
          handleSubCauseToggleAndFetch(
            `${cause.name}-${causeDetail.CauseName}`,
            causeDetail.CauseName
          )
        }
      >
        {expandedSubCause[`${cause.name}-${causeDetail.CauseName}`] ? "-" : "+"}
      </button>
    )}
  </td>
  <td>
    {editingField886?.index === subIndex && editingField886?.field === "CauseName" ? (
      <input
        type="text"
        value={causeDetail.CauseName || ""}
        onChange={(e) =>
          handleSaveSubField886(subIndex, "CauseName", e.target.value)
        }
        onBlur={() => exitSubEditMode886()}
        autoFocus
      />
    ) : (
      <span onClick={() => handleEditSubField886(subIndex, "CauseName")}>
        {causeDetail.CauseName}
      </span>
    )}
  </td>
  <td>
    <div className="slider-container">
      <input
        type="range"
        min="0"
        max="100"
        value={causeDetail.ProbabilityPercentage || 0}
        className="slider"
        onChange={(e) =>
          handleSubCauseSliderChange(subIndex, Number(e.target.value))
        }
      />
      <span className="probability">
        {causeDetail.ProbabilityPercentage || 0}%
      </span>
    </div>
  </td>
</tr>



              {/* Nested sub-cause rows */}
              {expandedSubCause[`${cause.name}-${causeDetail.CauseName}`] &&
                nestedSubCauseData[`${cause.name}-${causeDetail.CauseName}`]?.map(
                  (subCause, nestedIndex) => (
                    <tr
                      key={`${index}-${subIndex}-${nestedIndex}`}
                      className="nested-sub-cause-row"
                    >
                      <td></td>
                      <td>{subCause.name}</td>
                      <td>{subCause.probability}%</td>
                    </tr>
                  )
                )}
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
{/* Pagination Wrapper */}
{/* Pagination Wrapper */}
<div className="pagination-wrapper">
  {/* Left Section: Rows Dropdown and Pagination Info */}
  <div style={{ display: "flex", alignItems: "center" }}>
    <select
      value={rowsPerPage990}
      onChange={handleRowsChange990}
      className="rows-dropdown"
    >
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={25}>25</option>
      <option value={50}>50</option>
      <option value={100}>100</option>
    </select>
    <span className="pagination-info">
      {startRow990 + 1}-{endRow990} of {totalRows990}
    </span>
  </div>

  {/* Right Section: Pagination Controls */}
  <div className="pagination-controls">
    <button
      onClick={handlePreviousPage990}
      disabled={currentPage990 === 1}
      className="page-button"
    >
      &lt;
    </button>
    {Array.from({ length: totalPages990 }, (_, index) => (
      <button
        key={index + 1}
        onClick={() => setCurrentPage990(index + 1)}
        className={`page-button ${currentPage990 === index + 1 ? "active-page" : ""}`}
      >
        {index + 1}
      </button>
    ))}
    <button
      onClick={handleNextPage990}
      disabled={currentPage990 === totalPages990}
      className="page-button"
    >
      &gt;
    </button>
  </div>
</div>
{/* Table */}
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
    {paginatedData990.length > 0 ? (
      paginatedData990.map((action, index) => (
        <tr key={index}>
          <td>{action.name}</td>
          <td>{action.time || "N/A"}</td>
          <td>{action.money || "N/A"}</td>
          <td>{action.level || "N/A"}</td>
          <td>
            <input type="checkbox" />
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="5">No actions available</td>
      </tr>
    )}
  </tbody>
</table>


    
      {/* Questions Section */}
      <h3>Questions</h3>
      <table className="modal-table">
  <thead>
    <tr>
      <th>Name</th>
      <th><FiClock /></th>
      <th><FiTrendingUp /></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {data884 && data884.questions.map((question, index) => (
      <tr key={index}>
        <td>
          <div>
            {question.questionName}
            <span
              style={{ marginLeft: "10px", cursor: "pointer" }}
              onClick={() => toggleRow883(index, question.questionName)}
            >
              {expandedRow883 === index ? "➖" : "➕"}
            </span>
          </div>
          {expandedRow883 === index && (
            <div style={{ marginLeft: "20px" }}>
              {questionAnswers885.length > 0 ? (
                questionAnswers885.map((answer, idx) => (
                  <div key={idx}>{answer}</div>
                ))
              ) : (
                <div>No answers available</div>
              )}
            </div>
          )}
        </td>
        <td>{question.questionTime}</td>
        <td>{question.questionCost}</td>
        <td></td>
      </tr>
    ))}
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
