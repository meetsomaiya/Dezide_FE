import React, { useState, useRef, useEffect } from "react";
import "./DynamicGuides882.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import Sidebar from '../components/Sidebar';
import Sidebar991 from './Sidebar991';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faFileAlt, faBook, faQuestionCircle, faPhotoVideo, faHeadset, faRandom } from '@fortawesome/free-solid-svg-icons';

import { FiTrendingUp } from "react-icons/fi"; // Slant upward icon
import { FiClock } from "react-icons/fi"; // Import clock icon
import { FaPlus, FaRandom, FaCog } from 'react-icons/fa';





const DynamicGuides882 = () => {
  const location = useLocation();
  const navigate = useNavigate();

const [isModalOpen, setModalOpen] = useState(false);
const [modalName, setModalName] = useState("");


const untitledCauseRef = useRef(null);

  const [causesData, setCausesData] = useState([]); // New state for Causes data

  const [actionsData, setActionsData] = useState([]); // New state for Causes data

  const [clickedRowType, setClickedRowType] = useState(null); // State to track clicked row type


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

  // New state for tracking the previous value and edited cause
const [editedCause, setEditedCause] = useState(null);
const [previousCauseValue, setPreviousCauseValue] = useState(null);
const [isCauseEdited, setIsCauseEdited] = useState(false); // Flag to track if a cause is edited

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

    const [lastClickedCauseName, setLastClickedCauseName] = useState(null);

    const [rowsPerPage990, setRowsPerPage990] = useState(25); // Number of rows per page
    const [currentPage990, setCurrentPage990] = useState(1); // Current page number
  
    const totalRows990 = actionsData.length; // Total number of rows
    const totalPages990 = Math.ceil(totalRows990 / rowsPerPage990); // Total number of pages
  
    // Calculate the range of rows to display
    const startRow990 = (currentPage990 - 1) * rowsPerPage990;
    const endRow990 = Math.min(startRow990 + rowsPerPage990, totalRows990);
    const paginatedData990 = actionsData.slice(startRow990, endRow990);

    const [hoveredCause993, setHoveredCause993] = useState(null);

    const [hoverItems894, setHoverItems894] = useState({
      actions: [],
      questions: [],       // Store questions and answers together
      questionAnswers: [], // Store answers related to questions
    });
    
    const [hoverItems895, setHoverItems895] = useState({
      actions: [],
      questions: [],       // Store questions and answers together
      questionAnswers: [], // Store answers related to questions
    });
    

    const [hoveredActionIndex, setHoveredActionIndex] = useState(null);

    const [hoveredSubCause997, setHoveredSubCause997] = useState(null); // New state with 997

  // State to track if any "Progress" checkbox is checked
  const [isAnyProgressChecked, setIsAnyProgressChecked] = useState(false);

  const [tableData902, setTableData902] = useState([]);

  const [showOptionsBox1112, setShowOptionsBox1112] = useState(false);

  const [showOptionsBox1113, setShowOptionsBox1113] = useState(false);

  const [showOptionsBox1114, setShowOptionsBox1114] = useState(false);

  const [hoveredCell1113, setHoveredCell1113] = useState(null);

  const [hoveredCell1114, setHoveredCell1114] = useState(null);

   // New state variables for nested sub-cause (7773) functionalities
   const [editingField7773, setEditingField7773] = useState(null); // State for editing nested sub-cause fields

 // New state to track the currently editable cell
 const [editableCell1115, setEditableCell1115] = useState(null); // Tracks { rowIndex, field }
 const [tempValue1115, setTempValue1115] = useState(""); // Temporary value for editing

 const [isNewCauseCreated, setIsNewCauseCreated] = useState(false);

 const [debouncedSave, setDebouncedSave] = useState(null);  // State for debouncing API call

// State to track the edited field and its previous value
const [editedField, setEditedField] = useState(null);
const [previousFieldValue, setPreviousFieldValue] = useState(null);
const [editedFieldValue, setEditedFieldValue] = useState(null);

const [debouncedValue0001, setDebouncedValue0001] = useState(null);
const [timer0001, setTimer0001] = useState(null);

const [debouncedValue0002, setDebouncedValue0002] = useState(null);
const [timer0002, setTimer0002] = useState(null);

const [debouncedValue0003, setDebouncedValue0003] = useState(null);
const [timer0003, setTimer0003] = useState(null);

   // Function to handle changes while editing
   const handleInputChange1115 = (e) => {
    setTempValue1115(e.target.value); // Update the temporary value
  };

    // Function to handle cell click and make it editable
    const handleCellClick1115 = (rowIndex, field, value) => {
      setEditableCell1115({ rowIndex, field }); // Set which cell is being edited
      setTempValue1115(value); // Initialize temp value with the current value of the cell
    };

    
  // Function to handle saving the value and exiting edit mode
  const handleSave1115 = (rowIndex, field) => {
    // Save changes to the cell
    paginatedData990[rowIndex][field] = tempValue1115; // Update the actual table data
    setEditableCell1115(null); // Exit edit mode
    setTempValue1115(""); // Clear temporary value
  };

  // Function to handle blur or pressing Enter to save changes
  const handleBlurOrEnter1115 = (e, rowIndex, field) => {
    if (e.type === "blur" || (e.type === "keydown" && e.key === "Enter")) {
      handleSave1115(rowIndex, field);
    }
  };

    // Function to handle creating a new action
    const addNewAction1115 = () => {
      const newAction = {
        EventID: null, // Placeholder values
        RootID: null,
        EventName: "New Event",
        ProbabilityPercentage: null,
        IsParent: "0",
        ParentID: null,
        ActionID: actionsData.length + 1, // Generate a unique ID
        ActionName: "Untitled Action",
        ActionTime: "00:00:00",
        ActionCost: 0,
        Level: 1,
      };
    
      // Prepend the new action to the existing data
      setActionsData((prevActions) => [newAction, ...prevActions]);
    };
    
  
  const [tableData, setTableData] = useState([]);

  const handleGearClick1112 = () => {
    setShowOptionsBox1112(!showOptionsBox1112);
  };

  const handleGearClick1113 = () => {
    setShowOptionsBox1113(!showOptionsBox1113);
  };

  const handleGearClick1114 = () => {
    setShowOptionsBox1114(!showOptionsBox1114);
  };

  const handleCreateTopCauseClick1112 = () => {
    console.log("Create Top Cause function called");
    setShowOptionsBox1112(false);
  };

  const handleRearrangeClick1112 = () => {
    console.log("Rearrange function called");
    setShowOptionsBox1112(false);
  };

    // Handler for saving nested sub-cause field
    // Handler for saving nested sub-cause field
const handleSaveNestedSubCauseField7773 = (key, nestedIndex, field, newValue) => {
  // Extract the parent cause and sub-cause names from the key
  const [parentCauseName, subCauseName] = key.split("-");

  // Get the previous value of the nested sub-cause field
  const previousValue = nestedSubCauseData[key]?.[nestedIndex]?.[field];

  // Update the value for the specific nested sub-cause
  const updatedNestedSubCauses = [...(nestedSubCauseData[key] || [])];
  if (nestedIndex < updatedNestedSubCauses.length) {
    updatedNestedSubCauses[nestedIndex][field] = newValue;
  }

  // Update the nested sub-causes state
  setNestedSubCauseData((prevState) => ({
    ...prevState,
    [key]: updatedNestedSubCauses,
  }));

  // Exit edit mode
  setEditingField7773(null);

  // Prepare the payload for the API
  const payload = {
    modalName,
    parentCauseName, // Name of the parent cause
    subCauseName, // Name of the sub-cause
    fieldName: field, // Name of the field being edited
    previousValue, // Previous value of the field
    currentValue: newValue, // New value of the field
  };

  // Log the payload for debugging
  console.log("Data being sent to the API:", JSON.stringify(payload, null, 2));

  // Send the data to the API
  fetch("http://localhost:226/api/nested_subcause_edited_data", {
    // fetch("http://localhost:3001/api/nested_subcause_edited_data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Edited nested sub-cause data successfully sent:", data);
    })
    .catch((error) => {
      console.error("Error sending edited nested sub-cause data:", error);
    });
};

    
    

    const startEditingNestedSubCause = (key, nestedIndex, field, value) => {
      // Track the nested index and field to handle edits
      setEditingField7773({ key, index: nestedIndex, field, value });
    };
    
  
    
    
    

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:226/api/fetch_main_table_data')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        // Prepare the data to match the table structure
        const formattedData = data.eventModelMap.map((item) => ({
          name: item.EventName,
          taxonomy: item.ModelNames, // Assuming taxonomy is ModelNames
          language: item.language.join(', '), // Join language array
          lastChange: item.lastChange,
          lastChangeBy: item.lastChangeBy,
          published: item.published,
          createdBy: item.createdBy,
          version: item.version,
          select: false, // Default value for select checkbox
        }));

        // Set the fetched and formatted data to state
        setTableData(formattedData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []); // Empty dependency array to run only once after initial render

  const handleRowClick902 = (name) => {
    console.log(`Row clicked: ${name}`);
  };

  // useEffect(() => {
  //   // Check if state includes 'openModal'
  //   if (location.state?.openModal) {
  //     setModalOpen(true);
  //   }
  // }, [location.state]);

  useEffect(() => {
    // Check if state includes 'openModal' and 'guideName'
    if (location.state?.openModal) {
      setModalOpen(true);
    }
    if (location.state?.guideName) {
      setModalName(location.state.guideName);
    }
  }, [location.state]);

  // Handler for "Progress" checkboxes in the action table
  // const handleProgressCheckboxChange = (index, isChecked) => {
  //   setIsAnyProgressChecked(isChecked || isAnyProgressChecked);
  // };

  const handleProgressCheckboxChange = (index, isChecked) => {
    // Make a copy of the actionsData
    const updatedActionsData = [...actionsData];
    
    // Update the progress of the specific action
    updatedActionsData[index].progress = isChecked;
    
    // Update the state with the modified actionsData
    setActionsData(updatedActionsData);
    
    // Optionally, if you want to track if any progress is checked globally
    const anyProgressChecked = updatedActionsData.some(action => action.progress === true);
    setIsAnyProgressChecked(anyProgressChecked);
  };
  

  const [solveCheckboxes900, setSolveCheckboxes900] = useState({});
  const [showBreakIcon900, setShowBreakIcon900] = useState(
    Array(causesData.length).fill(true)
  ); // Initially show all break icons

  const handleSolveCheckboxToggle900 = (index) => {
    setSolveCheckboxes900((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));

    // Hide the break icon when the "Solve" checkbox is checked
    setShowBreakIcon900((prev) => {
      const newShowBreakIcon = [...prev];
      newShowBreakIcon[index] = !newShowBreakIcon[index];
      return newShowBreakIcon;
    });
  };
    

  const [hoveredCell901, setHoveredCell901] = useState(null); // Track hovered cell
  const [clickedCell901, setClickedCell901] = useState(null); // Track clicked cell
  const [menuPosition901, setMenuPosition901] = useState({ top: 0, left: 0 }); // Menu position
  const tableRef = useRef(null);

  const [clickedCell902, setClickedCell902] = useState(null);
const [menuPosition902, setMenuPosition902] = useState({ top: 0, left: 0 });

  // Define new refs for this specific logic
  const tableRef2 = useRef(null);
  const menuRef2 = useRef(null); // New reference for the menu to detect outside clicks


  const handleMouseEnter901 = (index) => setHoveredCell901(index);
  const handleMouseLeave901 = () => setHoveredCell901(null);

  const handleIconClick901 = (index, event) => {
    if (clickedCell901 === index) {
      setClickedCell901(null); // Close if already open
    } else {
      const rect = event.target.getBoundingClientRect();
      const tableRect = tableRef.current.getBoundingClientRect();
  
      setMenuPosition901({
        top: rect.bottom - tableRect.top + window.scrollY -40, // Position below the icon
        left: rect.left - tableRect.left + 5 -40,
      });
      setClickedCell901(index); // Open for the clicked cell
    }
  };

  // const handleIconClick902 = (index, event) => {
  //   if (clickedCell902 === index) {
  //     setClickedCell902(null); // Close if already open
  //   } else {
  //     const rect = event.target.getBoundingClientRect();
  //     const tableRect = tableRef.current.getBoundingClientRect();
  
  //     setMenuPosition902({
  //       top: rect.bottom - tableRect.top + window.scrollY + 10, // Position below the icon
  //       left: rect.left - tableRect.left + 5 - 40, // Adjust horizontal position
  //     });
  //     setClickedCell902(index); // Open for the clicked cell
  //   }
  // };
  
  // const handleIconClick902 = (index, type, event) => {
  //   if (clickedCell902 === index) {
  //     setClickedCell902(null); // Close if already open
  //     setClickedRowType(null); // Clear row type when closing
  //   } else {
  //     const rect = event.target.getBoundingClientRect();
  //     const tableRect = tableRef.current.getBoundingClientRect();
  
  //     setMenuPosition902({
  //       top: rect.bottom - tableRect.top + window.scrollY + 10, // Position below the icon
  //       left: rect.left - tableRect.left + 5 - 40, // Adjust horizontal position
  //     });
  
  //     setClickedCell902(index); // Open for the clicked cell
  //     setClickedRowType(type); // Set row type based on the clicked row (cause, sub-cause, or nested sub-cause)
  //   }
  // };

    // Define your handleIconClick902 function here
    // const handleIconClick902 = (identifier, type, event, name) => {
    //   let causeIndex, subCauseIndex, nestedSubCauseIndex;
    
    //   // If the type is not 'cause', split the identifier
    //   if (type !== "cause") {
    //     const identifiers = identifier.split('-'); // Splitting to handle cause, sub-cause, nested sub-cause
    //     causeIndex = parseInt(identifiers[0], 10); // Extracting cause index
    //     subCauseIndex = identifiers[1] ? parseInt(identifiers[1], 10) : undefined; // Extracting sub-cause index (if present)
    //     nestedSubCauseIndex = identifiers[2] ? parseInt(identifiers[2], 10) : undefined; // Extracting nested sub-cause index (if present)
    //   } else {
    //     // If it's 'cause', treat identifier directly as causeIndex
    //     causeIndex = parseInt(identifier, 10); // Extracting cause index
    //   }
    
    //   console.log(`Row Clicked: Type - ${type}, Cause Index - ${causeIndex}, Sub-Cause Index - ${subCauseIndex}, Nested Sub-Cause Index - ${nestedSubCauseIndex}`);
    //   console.log(`Name: ${name}`); // Log the name (sub-cause or nested sub-cause)
    
    //   switch (type) {
    //     case "cause":
    //       console.log('Clicked on Cause:', name);
    //       // Handle logic for cause row here
    //       break;
    
    //     case "subcause":
    //       console.log('Clicked on SubCause:', name); // Now you just have the sub-cause name
    //       // Handle logic for sub-cause row here
    //       break;
    
    //     case "nestedSubCause":
    //       console.log('Clicked on Nested SubCause:', name); // Now you just have the nested sub-cause name
    //       // Handle logic for nested sub-cause row here
    //       break;
    
    //     default:
    //       console.log('Unknown row type clicked.');
    //       break;
    //   }
    // };
    
    const handleIconClick902 = (identifier, type, event, rowName) => {
      let causeIndex, subCauseIndex, nestedSubCauseIndex;
    
      if (clickedCell902 === identifier) {
        setClickedCell902(null);
        setClickedRowType(null);
      } else {
        const rect = event.target.getBoundingClientRect();
        const tableRect = tableRef.current.getBoundingClientRect();
    
        setMenuPosition902({
          top: rect.bottom - tableRect.top + window.scrollY + 10,
          left: rect.left - tableRect.left + 5 - 40,
        });
    
        setClickedCell902(identifier);
        setClickedRowType(type);
    
        if (type !== "cause") {
          const identifiers = identifier.split('-');
          causeIndex = parseInt(identifiers[0], 10);
          subCauseIndex = identifiers[1] ? parseInt(identifiers[1], 10) : undefined;
          nestedSubCauseIndex = identifiers[2] ? parseInt(identifiers[2], 10) : undefined;
        } else {
          causeIndex = parseInt(identifier, 10);
        }
    
        console.log(`Row Clicked: Type - ${type}, Cause Index - ${causeIndex}, Sub-Cause Index - ${subCauseIndex}, Nested Sub-Cause Index - ${nestedSubCauseIndex}`);
        console.log(`Name: ${rowName}`);
      }
    };
    

    

    const deleteRow = (type, identifier) => {
  if (type === 'cause') {
    const causeIndex = parseInt(identifier, 10);
    const causeToDelete = causesData[causeIndex];

    // Ensure the cause exists
    if (causeToDelete) {
      const modalName = "yourModalName"; // This should be dynamically set based on your modal
      const causeName = causeToDelete.name; // Assuming each cause has a `name` property

      // Delete the cause from causesData
      const updatedCausesData = causesData.filter((_, index) => index !== causeIndex);
      setCausesData(updatedCausesData);

      // Send the data to API
      const payload = {
        modalName,
        causeName,
        deletionFlag: true,
      };

      console.log("Deleted Cause:", payload);

      fetch("http://localhost:226/api/deleted_cause", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => console.log("Cause deletion sent successfully:", data))
        .catch((err) => console.error("Error sending cause deletion:", err));
    }
  } else if (type === 'subcause') {
    const subCauseIndex = parseInt(identifier, 10);
    
    // Ensure expandedCauseData is valid
    if (Array.isArray(expandedCauseData) && expandedCauseData[subCauseIndex]) {
      const subCauseToDelete = expandedCauseData[subCauseIndex];
      const parentCauseName = causesData[subCauseToDelete.parentCauseIndex]?.name; // Assuming `parentCauseIndex` exists on sub-cause
      const subCauseName = subCauseToDelete.CauseName;

      // Delete the sub-cause
      const updatedExpandedCauseData = [...expandedCauseData];
      updatedExpandedCauseData.splice(subCauseIndex, 1);
      setExpandedCauseData(updatedExpandedCauseData);

      // Send the data to API
      const payload = {
        modalName: "yourModalName", // Adjust as needed
        parentCauseName,
        subCauseName,
        deletionFlag: true,
      };

      console.log("Deleted SubCause:", payload);

      fetch("http://localhost:226/api/deleted_subcause", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => console.log("SubCause deletion sent successfully:", data))
        .catch((err) => console.error("Error sending sub-cause deletion:", err));
    } else {
      console.error("Error: Invalid subCauseIndex or expandedCauseData structure.");
    }
  } else if (type === 'nestedSubCause') {
    const [causeIndex, subCauseIndex, nestedSubCauseIndex] = identifier.split('-').map(Number);

    // Construct the keys
    const selectedCauseName = causesData[causeIndex]?.name;
    const selectedSubCauseName = expandedCauseData[subCauseIndex]?.CauseName;

    if (selectedCauseName && selectedSubCauseName) {
      const key = `${selectedCauseName}-${selectedSubCauseName}`;
      const nestedSubCauseToDelete = nestedSubCauseData[key]?.[nestedSubCauseIndex];

      if (nestedSubCauseToDelete) {
        const modalName = "yourModalName"; // Adjust this
        const parentCauseName = selectedCauseName;
        const parentSubCauseName = selectedSubCauseName;
        const nestedSubCauseName = nestedSubCauseToDelete.eventName || "Unknown Nested Sub-Cause";

        // Delete the nested sub-cause from nestedSubCauseData
        setNestedSubCauseData((prevState) => {
          if (prevState[key]) {
            const updatedSubCauses = prevState[key].filter((_, index) => index !== nestedSubCauseIndex);
            return { ...prevState, [key]: updatedSubCauses };
          }
          return prevState;
        });

        // Send the data to API
        const payload = {
          modalName,
          parentCauseName,
          parentSubCauseName,
          nestedSubCauseName,
          deletionFlag: true,
        };

        console.log("Deleted Nested SubCause:", payload);

        fetch("http://localhost:226/api/deleted_nested_subcause", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
          .then((res) => res.json())
          .then((data) => console.log("Nested SubCause deletion sent successfully:", data))
          .catch((err) => console.error("Error sending nested sub-cause deletion:", err));
      }
    } else {
      console.error("Error: Cause or SubCause names are invalid or missing.");
    }
  }
};

    
    
    
    
    


  
   // Log expandedCauseData whenever it changes
   useEffect(() => {
    console.log('expandedCauseData updated ,,,,:', expandedCauseData);
  }, [expandedCauseData]); // This dependency array makes it log whenever expandedCauseData changes
  
  

  const handleEditExplanation = (actionName) => {
    const dataToSend = {
      actionName,
      modalName,
    };
  
    console.log("Data being sent:", dataToSend); // Log the data
    navigate("/edit-explanation", { state: dataToSend }); // Navigate with data
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        clickedCell901 !== null &&
        !event.target.closest(".options-menu901") &&
        !event.target.closest(".config-icon901")
      ) {
        setClickedCell901(null); // Close the menu
      }
    };
  
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [clickedCell901]);
  
    
    // Handle clicking outside the menu
    const handleClickOutside2 = (event) => {
      if (menuRef2.current && !menuRef2.current.contains(event.target) && !event.target.closest('.config-icon901')) {
        setClickedCell902(null); // Close menu when clicking outside
      }
    };
  
    // Listen for clicks outside
    useEffect(() => {
      if (clickedCell902 !== null) {
        document.addEventListener('click', handleClickOutside2);
      } else {
        document.removeEventListener('click', handleClickOutside2);
      }
  
      // Cleanup listener on unmount
      return () => {
        document.removeEventListener('click', handleClickOutside2);
      };
    }, [clickedCell902]);


  
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
    // const handleSaveSubField886 = (index, field, value) => {
    //   const updatedSubCauses = [...expandedCauseData];
    //   updatedSubCauses[index][field] = value; // Update the specific field
    //   setExpandedCauseData(updatedSubCauses); // Update the state
    //   setEditingField886(null); // Exit edit mode
    // };

    const handleSaveSubField886 = (subIndex, field, newValue) => {
      // Extract the parent cause name
      const parentCauseName = expandedCauseName;
    
      // Get the previous value of the subcause field
      const previousValue = expandedCauseData[subIndex][field];
    
      // Update the subcause data
      const updatedSubCauses = [...expandedCauseData];
      updatedSubCauses[subIndex][field] = newValue; // Update the specific field
      setExpandedCauseData(updatedSubCauses); // Update the state
    
      // Clear editing state
      setEditingField886(null);
    
      // Prepare the payload for the API
      const payload = {
        modalName,
        parentCauseName, // Name of the parent cause
        fieldName: field, // Name of the field being edited
        previousValue, // Previous value of the field
        currentValue: newValue, // New value of the field
      };
    
      // Log the payload for debugging
      console.log("Data being sent to the API:", JSON.stringify(payload, null, 2));
    
      // Send the data to the API
      fetch("http://localhost:226/api/sub_cause_edited_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Edited sub-cause data successfully sent:", data);
        })
        .catch((error) => {
          console.error("Error sending edited sub-cause data:", error);
        });
    };
    
    
    

    const fetchHoveringItemsForCause993 = async (causeName) => {
      try {
        console.log("Sending request for cause:", causeName);
        const encodedCauseName = encodeURIComponent(causeName).replace(/\+/g, '%2B');
        const response = await fetch(`http://localhost:226/api/fetch_hovering_items_for_topcause?cause=${encodedCauseName}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        
        const data = await response.json();
        console.log("Received data:", data); // Log the data fetched from the API
    
        setHoverItems894({
          actions: data.data.actions || [],
          questions: data.data.questions || [],
          questionAnswers: data.data.questionAnswers || [],
        });
    
        // Log the state after setting it
        console.log("State after setting hover items:", {
          actions: data.data.actions || [],
          questions: data.data.questions || [],
          questionAnswers: data.data.questionAnswers || [],
        });
      } catch (error) {
        console.error("Error fetching items for hovering cause:", error);
      }
    };

    const saveCauseData = () => {
      // Build the data structure with the causes, subcauses, and nestedsubcauses
      const causesPayload = causesData.map((cause, index) => {
        // Process each cause
        const subcauses = expandedCauseName === cause.name
          ? expandedCauseData.map((causeDetail, subIndex) => {
              // Process each subcause of the cause
              const nestedSubcauses = expandedSubCause[`${cause.name}-${causeDetail.CauseName}`]
                ? nestedSubCauseData[`${cause.name}-${causeDetail.CauseName}`]?.map((nestedSubCause, nestedIndex) => ({
                    eventName: nestedSubCause.eventName,
                    probability: nestedSubCause.probability,
                  }))
                : [];
    
              return {
                subCauseName: causeDetail.CauseName,
                probability: causeDetail.ProbabilityPercentage || 0,
                nestedSubcauses, // Nested subcauses inside this subcause
              };
            })
          : [];
    
        return {
          causeName: cause.name,
          probability: cause.probability || 0,
          subcauses, // Subcauses inside this cause
        };
      });
    
      // Define the payload to send to the backend API
      const payload = {
        mainEvent: modalName, // Replace modalName with topCauseName
        causes: causesPayload,
      };
    
      // Log the data being sent to the backend
      console.log("Data being sent to the backend:", JSON.stringify(payload, null, 2));
    
      // Send the payload to the backend API
      fetch('http://localhost:226/api/submit-causes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Data successfully sent to the backend:', data);

                // Call handleRowClick after successfully saving the data
      handleRowClick(modalName); // Pass modalName to handleRowClick
        })
        .catch((error) => {
          console.error('Error sending data to the backend:', error);
        });
    };

 
  
    
    
    

    const fetchHoveringItemsForCause = async (causeName) => {
      try {
        // Update API endpoint and parameter name
        const response = await fetch(
          `http://localhost:226/api/fetch_hovering_items_for_topcause?cause=${encodeURIComponent(causeName)}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data for cause:", data); // Log fetched data

        setHoverItems895({
          actions: data.data.actions || [],
          questions: data.data.questions || [],
          questionAnswers: data.data.questionAnswers || [],
        });

      } catch (error) {
        console.error("Error fetching hovering items for cause:", error);
      }
    };
    
    const handleMouseEnter = (causeName) => {
      setHoveredSubCause997(causeName); // Update hovered state
      fetchHoveringItemsForCause(causeName); // Use updated function
    };
    
    const handleMouseLeave = () => {
      setHoveredSubCause997(null); // Reset hovered state
    };
    
      // Log hoverItems895 whenever it updates
  useEffect(() => {
    console.log("Updated hoverItems895 state:", hoverItems895);
  }, [hoverItems895]);
    
  
    
            

  // const handleEditField = (index, field) => {
  //   setEditingField886({ index, field });
  //   setIsProbabilityVisible(true); // Make sliders permanently visible
  // };

  const handleEditField = (index, field) => {
    setEditingField886({
      index,
      field,
      value: causesData[index][field] || "", // Default to an empty string if the field is blank
    });
    setIsProbabilityVisible(true); // Make sliders permanently visible
  };
  
    const exitEditMode = () => {
      setIsEditMode(false); // Exit edit mode
      setEditingField886(null);
    };

    const handleEditNestedSubCauseField7773 = (nestedIndex, field) => {
      setEditingField7773({
        index: nestedIndex,
        field,
        value: nestedSubCauseData[nestedIndex][field] || "", // Default to empty string if the field is blank
      });
      setIsProbabilityVisible(true); // Optionally, make sliders permanently visible
    };
    
     // Function to send the edited data to the API
  const saveEditedCauseData = ({ modalName, fieldName, previousValue, currentValue }) => {
    const payload = {
      modalName, // Context of the modal
      fieldName, // The field that was edited
      previousValue, // The value before the edit
      currentValue, // The new value after the edit
    };
  
    // Log the payload for debugging
    console.log("Data being sent to the API for edited top cause:", JSON.stringify(payload, null, 2));
  
    fetch('http://localhost:226/api/edited_top_cause_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Edited cause data successfully sent:', data);
                        // Call handleRowClick after successfully saving the data
      // handleRowClick(modalName); // Pass modalName to handleRowClick
      })
      .catch((error) => {
        console.error('Error sending edited cause data:', error);
      });
  };
  

     // Function to save the edited field
     const handleSaveField = (index, field, value, event) => {
      if (event.key === "Enter") {
        // Capture the previous value before updating
        const previousValue = causesData[index][field];
    
        // Update the causesData state
        const updatedCauses = [...causesData];
        updatedCauses[index][field] = value;
        setCausesData(updatedCauses);
    
        // Clear editing field state
        setEditingField886(null);
    
        // Call the API directly with the correct values
        saveEditedCauseData({
          modalName,
          fieldName: field,
          previousValue,
          currentValue: value,
        });
      }
    };
    
    

    // const handleSaveField = (index, field, value) => {
    //   const updatedCauses = [...causesData];
    //   updatedCauses[index][field] = value;
    //   setCausesData(updatedCauses);
    //   setEditingField886(null);
    // };


    
  
    


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


   // useEffect to print expandedCauseData and nestedSubCauseData
   useEffect(() => {
    console.log('Expanded Cause Data:', expandedCauseData); // Log to console
    console.log('Nested SubCause Data:', nestedSubCauseData); // Log to console
  }, [expandedCauseData, nestedSubCauseData]); // Dependency array ensures it runs when these states change
    

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
      if (value === 1) value = 100; // Adjust value if it's 1
      
      // Update the causes data with the new value
      const total = 100;
      let updatedCauses = [...causesData];
      let delta = 0;
    
      const previousValue = updatedCauses[index]?.probability || 0;
      const causeName = updatedCauses[index]?.name || "Unknown Cause";
    
      if (index < updatedCauses.length) {
        delta = value - updatedCauses[index].probability;
        updatedCauses[index].probability = value;
      }
    
      let remaining = total - value;
      const otherCauses = updatedCauses.filter((_, i) => i !== index);
    
      otherCauses.forEach((cause) => {
        if (remaining <= 0) return;
        const adjustment = Math.min(
          Math.round((cause.probability / Math.max(1, total - value)) * delta),
          remaining
        );
        cause.probability = Math.max(0, cause.probability - adjustment);
        remaining -= adjustment;
      });
    
      const correctedTotal = updatedCauses.reduce((sum, c) => sum + c.probability, 0);
    
      updatedCauses = correctedTotal > 0
        ? updatedCauses.map((cause) => ({
            ...cause,
            probability: Math.round((cause.probability / correctedTotal) * total),
          }))
        : updatedCauses;
    
      setCausesData(updatedCauses);
    
      // Set the debounced value after a delay (debouncing logic)
      if (timer0001) {
        clearTimeout(timer0001);
      }
    
      const newTimer = setTimeout(() => {
        setDebouncedValue0001(value);
        sendDataToAPI0001(updatedCauses, causeName, previousValue, value);
      }, 500); // Adjust the delay (500ms) as needed
      
      setTimer0001(newTimer);
    };
    
    // This function will send the data to the API
    const sendDataToAPI0001 = (updatedCauses, causeName, previousValue, value) => {
      const payload = {
        modalName,
        updatedCauses: updatedCauses.map((cause) => ({
          name: cause.name,
          probability: cause.probability,
        })),
        changedCause: {
          causeName,
          previousValue,
          currentValue: value,
        },
      };
    
      console.log("Sending to API:", JSON.stringify(payload, null, 2));
    
      fetch("http://localhost:226/api/topcause_data_change", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => console.log("Cause data sent successfully:", data))
        .catch((err) => console.error("Error sending cause data:", err));
    };
    
  
    const handleSubCauseSliderChange = (subIndex, value) => {
      if (value === 1) value = 100; // Adjust value if it's 1
      
      const total = 100;
      let updatedSubCauses = [...expandedCauseData];
      let delta = 0;
    
      const causeName = expandedCauseName || "Unknown Cause"; // Parent Cause Name
    
      // Step 1: Update the specific sub-cause
      if (subIndex < updatedSubCauses.length) {
        delta = value - updatedSubCauses[subIndex].ProbabilityPercentage;
        updatedSubCauses[subIndex].ProbabilityPercentage = value;
      }
    
      // Step 2: Adjust other sub-causes to maintain total at 100%
      let remaining = total - value;
      const otherSubCauses = updatedSubCauses.filter((_, i) => i !== subIndex);
    
      otherSubCauses.forEach((subCause) => {
        if (remaining <= 0) return;
        const adjustment = Math.min(
          Math.round(
            (subCause.ProbabilityPercentage / Math.max(1, total - value)) * delta
          ),
          remaining
        );
        subCause.ProbabilityPercentage = Math.max(
          0,
          subCause.ProbabilityPercentage - adjustment
        );
        remaining -= adjustment;
      });
    
      // Step 3: Normalize probabilities to ensure they sum up to 100%
      const correctedTotal = updatedSubCauses.reduce(
        (sum, sub) => sum + sub.ProbabilityPercentage,
        0
      );
    
      updatedSubCauses = correctedTotal > 0
        ? updatedSubCauses.map((subCause) => ({
            ...subCause,
            ProbabilityPercentage: Math.round(
              (subCause.ProbabilityPercentage / correctedTotal) * total
            ),
          }))
        : updatedSubCauses;
    
      setExpandedCauseData(updatedSubCauses);
    
      // Set the debounced value after a delay (debouncing logic)
      if (timer0002) {
        clearTimeout(timer0002);
      }
    
      const newTimer = setTimeout(() => {
        setDebouncedValue0002(value);
        sendDataToAPI0002(updatedSubCauses, causeName, value);
      }, 500); // Adjust the delay (500ms) as needed
      
      setTimer0002(newTimer);
    };
    
    // This function will send the data to the API
    const sendDataToAPI0002 = (updatedSubCauses, causeName, value) => {
      const payload = {
        modalName,
        parentCauseName: causeName,
        updatedSubCauses: updatedSubCauses.map((subCause) => ({
          name: subCause.CauseName,
          previousValue: subCause.PreviousProbabilityPercentage || 0,
          currentValue: subCause.ProbabilityPercentage,
        })),
      };
    
      console.log("Sending to API:", JSON.stringify(payload, null, 2));
    
      fetch("http://localhost:226/api/cause_data_change", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => console.log("Sub-cause data sent successfully:", data))
        .catch((err) => console.error("Error sending sub-cause data:", err));
    };
    
    
  
// Handler for slider change in nested sub-causes
const handleNestedSubCauseSliderChange7773 = (key, nestedIndex, value) => {
  if (value === 1) value = 100; // Adjust value if it's 1

  const total = 100;
  const updatedNestedSubCauses = [...(nestedSubCauseData[key] || [])];
  let delta = 0;

  const [parentCauseName, parentSubCauseName] = key.split("-");
  const previousValue = updatedNestedSubCauses[nestedIndex]?.probability || 0;

  // Use the eventName from nestedSubCauseData, since that's how it's stored
  const nestedSubCauseName = updatedNestedSubCauses[nestedIndex]?.eventName || "Unknown Nested Sub-Cause";

  // Step 1: Update the specific nested sub-cause
  if (nestedIndex < updatedNestedSubCauses.length) {
    delta = value - updatedNestedSubCauses[nestedIndex].probability;
    updatedNestedSubCauses[nestedIndex].probability = value;
  }

  // Step 2: Adjust other nested sub-causes to maintain total at 100%
  let remaining = total - value;
  const otherNestedSubCauses = updatedNestedSubCauses.filter((_, i) => i !== nestedIndex);

  otherNestedSubCauses.forEach((nestedSubCause) => {
    if (remaining <= 0) return;
    const adjustment = Math.min(
      Math.round((nestedSubCause.probability / Math.max(1, total - value)) * delta),
      remaining
    );
    nestedSubCause.probability = Math.max(0, nestedSubCause.probability - adjustment);
    remaining -= adjustment;
  });

  // Step 3: Normalize probabilities to ensure they sum up to 100%
  const correctedTotal = updatedNestedSubCauses.reduce(
    (sum, nestedSub) => sum + nestedSub.probability,
    0
  );

  const balancedNestedSubCauses = correctedTotal > 0
    ? updatedNestedSubCauses.map((nestedSubCause) => ({
        ...nestedSubCause,
        probability: Math.round((nestedSubCause.probability / correctedTotal) * total),
      }))
    : updatedNestedSubCauses;

  setNestedSubCauseData((prevState) => ({
    ...prevState,
    [key]: balancedNestedSubCauses,
  }));

  // Set the debounced value after a delay (debouncing logic)
  if (timer0003) {
    clearTimeout(timer0003);
  }

  const newTimer = setTimeout(() => {
    setDebouncedValue0003(value);
    sendDataToAPI0003(balancedNestedSubCauses, parentCauseName, parentSubCauseName, value);
  }, 500); // Adjust the delay (500ms) as needed
  
  setTimer0003(newTimer);
};

// This function will send the data to the API
const sendDataToAPI0003 = (balancedNestedSubCauses, parentCauseName, parentSubCauseName, value) => {
  const payload = {
    modalName,
    parentCauseName,
    parentSubCauseName,
    updatedNestedSubCauses: balancedNestedSubCauses.map((nestedSubCause) => ({
      name: nestedSubCause.eventName,
      previousValue: nestedSubCause.previousProbability || 0,
      currentValue: nestedSubCause.probability,
    })),
  };

  console.log("Sending to API:", JSON.stringify(payload, null, 2));

  fetch("http://localhost:226/api/nested_subcause_data_change", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => console.log("Nested sub-cause data sent successfully:", data))
    .catch((err) => console.error("Error sending nested sub-cause data:", err));
};

    
  
  
  
  
   // Handles when the user clicks to create a new top cause
 // Handles when the user clicks to create a new top cause
const handleCreateTopCauseClick = () => {
  setIsCreateTopCauseInputVisible(true);

  // Generate a unique ID for the new cause (e.g., using Date.now or a UUID library)
  const uniqueId = `cause-${Date.now()}`;

  // Determine the base name for the new cause
  const baseName = 'Untitled Cause';

  // Generate a new name based on existing causes
  let untitledIndex = 1;
  let newCauseName = baseName;
  while (causesData.some(cause => cause.name === newCauseName)) {
    untitledIndex++;
    newCauseName = `${baseName} ${untitledIndex}`;
  }

  // Add a new cause with the generated name and unique ID
  const newCause = { id: uniqueId, name: newCauseName, probability: 0, internalCause: false };

  // Update the causesData with the new cause
  setCausesData([{ ...newCause }, ...causesData]); // Add the new cause to the beginning of the array

  setNewCause(newCause); // Update the new cause state
  setIsCreateTopCauseInputVisible(false); // Hide input after adding cause

  setShowOptionsBox1112(!showOptionsBox1112); // Toggle options box

  // Set the flag to indicate that a new cause has been created
  setIsNewCauseCreated(true);
};

// Call saveCauseData after causesData state has been updated and a new cause has been created
useEffect(() => {
  if (isNewCauseCreated && causesData.length > 0) {
    // Call saveCauseData only once after a new cause is created
    saveCauseData();

    // Reset the flag to avoid calling saveCauseData repeatedly
    setIsNewCauseCreated(false);
  }
}, [causesData, isNewCauseCreated]); // This will trigger when causesData or isNewCauseCreated changes


// Function to add a new "Untitled Cause"
// Function to add a new "Untitled Cause"
const addNewCause = () => {
  setCausesData((prevCauses) => [
    ...prevCauses,
    { name: "Untitled Cause", probability: 0, internalCause: true },
  ]);
};

// Handles when the user clicks to create a new top cause
// const addNewUntitledSubCause = () => {
//   setIsCreateTopCauseInputVisible(true);

//   if (expandedCauseData && expandedCauseData.length > 0) {
//     // Define the new cause using expandedCauseData
//     const firstCause = expandedCauseData[0]; // Example: Fetch the first entry
//     const newCause = {
//       CauseName: firstCause.CauseName, // Use CauseName from expandedCauseData
//       ProbabilityPercentage: firstCause.ProbabilityPercentage // Use ProbabilityPercentage from expandedCauseData
//     };

//     // Update the expandedCauseData state with the new cause at the next available position
//     setExpandedCauseData([...expandedCauseData, newCause]); // Add the new cause to the end of the expandedCauseData
//   } else {
//     console.warn("expandedCauseData is empty or undefined. No new cause added.");
//   }

//   setIsCreateTopCauseInputVisible(false); // Hide input after adding cause
//   setShowOptionsBox1112(!showOptionsBox1112);
// };

// // Handles when the user clicks to create a new top cause
// const addNewUntitledSubCause = () => {
//   setIsCreateTopCauseInputVisible(true);

//   // Define the new cause with default values
//   const newCause = {
//     EventID: null, // Default or placeholder value
//     ModelID: 1,    // Default value
//     ParentID: 3,   // Default value
//     IsParent: "1", // Default value (same as the structure)
//     CreatedOn: new Date().toISOString(), // Set current time
//     UpdatedOn: new Date().toISOString(), // Set current time
//     IsActive: "1", // Default value
//     ProbabilityPercentage: 0, // Default probability percentage
//     CauseName: "Untitled Cause", // Default cause name
//     CreatedBy: "41064", // Default value
//     UpdatedBy: "41064", // Default value
//     internalSubCause: true, // Set this as true since it's a sub-cause
//   };

//   // Initialize expandedCauseData if it's empty or undefined
//   if (!expandedCauseData || !Array.isArray(expandedCauseData) || expandedCauseData.length === 0) {
//     // Set the default structure if it's empty
//     setExpandedCauseData([
//       {
//            EventID: null, // Default or placeholder value
//     ModelID: 1,    // Default value
//     ParentID: 3,   // Default value
//     IsParent: "1", // Default value (same as the structure)
//     CreatedOn: new Date().toISOString(), // Set current time
//     UpdatedOn: new Date().toISOString(), // Set current time
//     IsActive: "1", // Default value
//     ProbabilityPercentage: 0, // Default probability percentage
//     CauseName: "Untitled Cause", // Default cause name
//     CreatedBy: "41064", // Default value
//     UpdatedBy: "41064", // Default value
//     internalSubCause: true, // Set this as true since it's a sub-cause
//       }
      
//     ]);
//       // Set the expandedCauseName to the newly added cause to trigger expansion
//   setExpandedCauseName("Untitled Cause");
//   } else {
//     // If the data exists, just add the new cause to the existing causes
//     setExpandedCauseData([...expandedCauseData, newCause]);
//   }

//   // Hide input after adding cause
//   setIsCreateTopCauseInputVisible(false);
// };

// Handles when the user clicks to create a new top cause
const addNewUntitledSubCause = (causeIndex, parentCauseName) => {
  setIsCreateTopCauseInputVisible(true);

  let newCauseName = "Untitled Cause"; // Default cause name
  let previousValue = null; // No previous value for a new cause

  // Use the passed parentCauseName directly
  console.log("Parent Cause Name passed to the function:", parentCauseName);

  // Initialize expandedCauseData if it's empty or undefined
  if (!expandedCauseData || !Array.isArray(expandedCauseData) || expandedCauseData.length === 0) {
    const initialCause = {
      EventID: null, // Default or placeholder value
      ModelID: 1,    // Default value
      ParentID: 3,   // Default value
      IsParent: "1", // Default value (same as the structure)
      CreatedOn: new Date().toISOString(), // Set current time
      UpdatedOn: new Date().toISOString(), // Set current time
      IsActive: "1", // Default value
      ProbabilityPercentage: 0, // Default probability percentage
      CauseName: newCauseName, // Default cause name
      CreatedBy: "41064", // Default value
      UpdatedBy: "41064", // Default value
      internalSubCause: true, // Set this as true since it's a sub-cause
    };
    setExpandedCauseData([initialCause]);

    // Set the expandedCauseName to the newly added cause to trigger expansion
    setExpandedCauseName(newCauseName);
  } else {
    // Check for existing names to ensure uniqueness
    const existingNames = expandedCauseData.map(cause => cause.CauseName);

    // Generate a unique name
    let counter = 2;
    while (existingNames.includes(newCauseName)) {
      newCauseName = `Untitled Cause ${counter}`;
      counter++;
    }

    // Define the new cause with default values and the unique name
    const newCause = {
      EventID: null, // Default or placeholder value
      ModelID: 1,    // Default value
      ParentID: 3,   // Default value
      IsParent: "1", // Default value (same as the structure)
      CreatedOn: new Date().toISOString(), // Set current time
      UpdatedOn: new Date().toISOString(), // Set current time
      IsActive: "1", // Default value
      ProbabilityPercentage: 0, // Default probability percentage
      CauseName: newCauseName, // Unique cause name
      CreatedBy: "41064", // Default value
      UpdatedBy: "41064", // Default value
      internalSubCause: true, // Set this as true since it's a sub-cause
    };

    // Add the new cause to the existing causes
    setExpandedCauseData([...expandedCauseData, newCause]);

    // Set the expandedCauseName to the newly added cause to trigger expansion
    setExpandedCauseName(newCauseName);
  }

  // Prepare the payload for the API
  const payload = {
    modalName, // The modal name where the data is being managed
    parentCauseName, // Parent cause name passed to the function
    fieldName: "CauseName", // Field being added (the cause name)
    previousValue, // No previous value for a new cause
    currentValue: newCauseName, // The name of the newly added cause
  };

  // Log the payload for debugging
  console.log("Data being sent to the API for new sub-cause while creating:", JSON.stringify(payload, null, 2));

  // Send the payload to the API
  fetch("http://localhost:226/api/sub_cause_creation_data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("New sub-cause data successfully sent:", data);
    })
    .catch((error) => {
      console.error("Error sending new sub-cause data:", error);
    });

  // Hide input after adding cause
  setIsCreateTopCauseInputVisible(false);
};





const addNewUntitledNestedSubCause = (causeIndex, subCauseIndex) => {
  setIsCreateTopCauseInputVisible(true);

  // Get the parent cause and sub-cause names
  const selectedCause = causesData[causeIndex];
  const selectedSubCause = expandedCauseData[subCauseIndex];

  // Generate a unique name using a random number
  const randomNumber = Math.floor(Math.random() * 10000000000); // Random number between 0 and 999
  const newEventName = `Untitled Nested SubCause ${randomNumber}`;

  // Prepare the payload for the API
  const payload = {
    modalName: modalName || "Unknown Modal", // Provide modal name
    parentCauseName: selectedCause?.name || "Unknown Parent", // Parent cause name
    fieldName: "CauseName", // Field being added (cause name)
    previousValue: null, // No previous value for a new nested cause
    currentValue: newEventName, // Name of the newly added nested sub-cause
    subCauseName: selectedSubCause?.CauseName || "Unknown SubCause", // Sub-cause name
    nestedSubCauseName: newEventName, // New nested sub-cause name
  };

  // Log the payload for debugging
  console.log("Payload being sent to the API for nestedsubcause insertion:", JSON.stringify(payload, null, 2));

  // Send the data to the API
  fetch("http://localhost:226/api/nested_sub_cause_creation_data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Nested sub-cause data successfully sent:", data);
    })
    .catch((error) => {
      console.error("Error sending nested sub-cause data:", error);
    });

  // Define the new nested sub-cause with the unique name
  const newNestedSubCause = {
    eventName: newEventName, // Unique event name
    probability: 0, // Default probability
  };

  // Update the nestedSubCauseData with the new sub-cause
  setNestedSubCauseData((prevState) => {
    const key = `${selectedCause?.name}-${selectedSubCause?.CauseName}`;
    const currentSubCauses = prevState[key] || [];
    return {
      ...prevState,
      [key]: [...currentSubCauses, newNestedSubCause],
    };
  });

  setIsCreateTopCauseInputVisible(false); // Hide input after adding cause
};




   // Log expandedCauseData whenever it changes
   useEffect(() => {
    console.log('expandedCauseData updated:', expandedCauseData);
  }, [expandedCauseData]); // This dependency array makes it log whenever expandedCauseData changes


// Handles when the user clicks to create a new top cause
// const addNewUntitledNestedSubCause = () => {
//   setIsCreateTopCauseInputVisible(true);

//   // Define the new cause with default values
//   const newCause = {
//     eventName: "Untitled Cause", // Default event name
//     probability: 0, // Default probability
//   };

//   // Check if nestedSubCauseData is initialized and if a specific key exists
//   const key = "Issues related to pitch motor-Elctrical issues of pitch motor"; // Replace with your desired key
//   if (nestedSubCauseData[key]) {
//     // Append the new cause to the existing array for the key
//     const updatedData = {
//       ...nestedSubCauseData,
//       [key]: [...nestedSubCauseData[key], newCause],
//     };
//     setNestedSubCauseData(updatedData);
//   } else {
//     // If the key doesn't exist, create a new entry for the key
//     const updatedData = {
//       ...nestedSubCauseData,
//       [key]: [newCause],
//     };
//     setNestedSubCauseData(updatedData);
//   }

//   setIsCreateTopCauseInputVisible(false); // Hide input after adding cause
//  // setShowOptionsBox1112(!showOptionsBox1112);
// };




// Function to add a new "Untitled Nested SubCause" under a specific sub-cause
// const addNewUntitledNestedSubCause = (causeIndex, subCauseIndex) => {
//   setExpandedCauseData((prevState) => {
//     const updatedCause = { 
//       ...prevState[causeIndex],
//       causeObject: prevState[causeIndex].causeObject.map((subCause, index) => {
//         if (index === subCauseIndex) {
//           // Add a new nested sub-cause to the "data" array of the specific sub-cause
//           return {
//             ...subCause,
//             data: [
//               ...(subCause.data || []), // Ensure that data is an array
//               {
//                 EventID: Date.now(), // Unique identifier for the nested sub-cause
//                 ModelID: 1, // Assuming this is static, adjust if needed
//                 ParentID: subCause.EventID, // The parent of the nested sub-cause is the sub-cause itself
//                 IsParent: "0", // Not a parent sub-cause
//                 IsActive: "1", // Active by default
//                 ProbabilityPercentage: 0, // Default probability
//                 EventName: "Untitled Nested Cause", // Default name for the nested sub-cause
//                 CreatedBy: "41064", // Static creator ID, adjust if necessary
//                 UpdatedBy: "41064", // Static updater ID, adjust if necessary
//               },
//             ],
//           };
//         }
//         return subCause;
//       }),
//     };

//     const updatedCauses = [...prevState];
//     updatedCauses[causeIndex] = updatedCause;

//     return updatedCauses;
//   });
// };

// Function to add a new "Untitled SubCause" under a specific cause
const addNewSubCause = (causeName) => {
  setExpandedCauseData((prevState) => {
    const expandedCauseIndex = prevState.findIndex(
      (cause) => cause.CauseName === causeName
    );

    if (expandedCauseIndex !== -1) {
      const updatedCause = { 
        ...prevState[expandedCauseIndex],
        subCauses: [
          ...prevState[expandedCauseIndex].subCauses,
          {
            CauseName: "Untitled SubCause", // Default name for the sub-cause
            ProbabilityPercentage: 0, // Default probability
          },
        ],
      };

      const updatedCauses = [...prevState];
      updatedCauses[expandedCauseIndex] = updatedCause;

      return updatedCauses;
    }
    return prevState;
  });

  const newSubCauseKey = `${causeName}-Untitled SubCause`;
  setExpandedSubCause((prev) => ({
    ...prev,
    [newSubCauseKey]: true, // Automatically expand the new sub-cause
  }));
};

// Function to add a new "Untitled Nested Cause" under a specific sub-cause
const addNewNestedSubCause = (causeName, subCauseName) => {
  const key = `${causeName}-${subCauseName}`;

  setNestedSubCauseData((prevState) => {
    return {
      ...prevState,
      [key]: [
        ...(prevState[key] || []), // Use existing nested causes or start with an empty array
        {
          eventName: "Untitled Nested Cause", // Default name for the nested cause
          probability: 0, // Default probability
        },
      ],
    };
  });

  // Set the expanded state for the nested sub-cause (auto-expand the newly added nested sub-cause)
  setExpandedSubCause((prev) => ({
    ...prev,
    [key]: true,
  }));
};


// Function to add a new "Untitled SubCause" under a specific cause
// const addNewUntitledSubCause = (causeIndex) => {
//   setExpandedCauseData((prevState) => {
//     const cause = prevState[causeIndex];

//     // Ensure causeObject is an array before attempting to add sub-causes
//     const updatedCauseObject = Array.isArray(cause.causeObject) ? cause.causeObject : [];

//     const updatedCause = { 
//       ...cause,
//       causeObject: [
//         ...updatedCauseObject, // Existing sub-causes (if any)
//         {
//           EventID: Date.now(), // Unique identifier (can use Date.now() or any other logic)
//           ModelID: 1, // Assuming this is static, adjust if needed
//           ParentID: cause.EventID, // Assuming the parent is the cause itself
//           IsParent: "0", // Since it's not a parent cause
//           IsActive: "1", // Active by default
//           ProbabilityPercentage: 0, // Default probability
//           CauseName: "Untitled SubCause", // Default name for the sub-cause
//           CreatedBy: "41064", // Static creator ID, adjust if necessary
//           UpdatedBy: "41064", // Static updater ID, adjust if necessary
//           internalSubCause: true, // Default flag for internal sub-causes
//         },
//       ],
//     };

//     const updatedCauses = [...prevState];
//     updatedCauses[causeIndex] = updatedCause;

//     return updatedCauses;
//   });
// };
















const handleCreateSubCauseClick = (causeName) => {
  // Create a new untitled sub-cause with default values
  const newSubCause = { CauseName: "Untitled Sub-Cause", ProbabilityPercentage: 0 }; // Default sub-cause data
  
  // Update the causesData state to include the new sub-cause at the top
  setCausesData((prevState) => {
    const updatedCausesData = prevState.map((cause) =>
      cause.name === causeName
        ? {
            ...cause,
            subCauses: [{ CauseName: "Untitled Sub-Cause", ProbabilityPercentage: 0 }, ...(cause.subCauses || [])], // Add to the top
          }
        : cause
    );

    // Log the updated state
    updatedCausesData.forEach((cause) => {
      cause.subCauses?.forEach((subCause) => {
        console.log(`Cause: ${cause.name}, Sub-Cause: ${subCause.CauseName}, Probability: ${subCause.ProbabilityPercentage}%`);
      });
    });

    return updatedCausesData;
  });
};




const handleCreateNestedSubCauseClick = (causeName, subCauseName) => {
  // Create a new untitled nested sub-cause with default values
  const newNestedSubCause = { eventName: "Untitled Event", probability: 0 }; // Default nested sub-cause data

  // Update the nestedSubCauseData state to include the new nested sub-cause at the top
  setNestedSubCauseData((prevState) => {
    const key = `${causeName}-${subCauseName}`; // Create a key for the nested sub-cause data

    const updatedNestedSubCauseData = {
      ...prevState,
      [key]: [{ eventName: "Untitled Event", probability: 0 }, ...(prevState[key] || [])], // Add to the top
    };

    // Log the updated state with the probability of the nested sub-causes
    updatedNestedSubCauseData[key]?.forEach((nestedSubCause) => {
      console.log(`Cause: ${causeName}, Sub-Cause: ${subCauseName}, Nested Event: ${nestedSubCause.eventName}, Probability: ${nestedSubCause.probability}%`);
    });

    return updatedNestedSubCauseData;
  });
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
const handlePreviewClick = () => {
  // Navigate to the preview page with modalName passed in state
  navigate('/preview', { state: { modalName } });
};

const handleConstraintClick = () => {
  // Navigate to the preview page with modalName passed in state
  navigate('/constraints', { state: { modalName } });
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
  // const tableData = [
  //   // Sample Data for the table
  //   {
  //     select: false,
  //     name: "FM283 Pitch_EmergencyRun",
  //     taxonomy: ["S9x Emerson V1", "S9x Woodward V2", "India"],
  //     language: "🇺🇸",
  //     lastChange: "Nov 18, 2024 12:07",
  //     lastChangeBy: "Ruchika K",
  //     published: "Aug 12, 2021 15:02",
  //     createdBy: "Jignesh Limbani",
  //     version: 637,
  //   },
  //   {
  //     select: false,
  //     name: "FM103 Elec_SafetyChainStop",
  //     taxonomy: ["S9x Emerson V1", "S9x Woodward V2", "India"],
  //     language: "🇺🇸",
  //     lastChange: "Nov 18, 2024 11:41",
  //     lastChangeBy: "Ruchika K",
  //     published: "Oct 09, 2018 16:48",
  //     createdBy: "Makarand Nandrekar",
  //     version: 488,
  //   },
  //   {
  //     select: false,
  //     name: "FM297 Rep_Pitch_EmergencyRun",
  //     taxonomy: ["S88 (SFS)", "India"],
  //     language: "🇺🇸",
  //     lastChange: "Nov 05, 2024 10:12",
  //     lastChangeBy: "Ruchika K",
  //     published: "Nov 26, 2018 12:46",
  //     createdBy: "Kalpesh Sutariya",
  //     version: 14,
  //   },
  //   {
  //     select: false,
  //     name: "Dynamic Create Test",
  //     taxonomy: ["S88 (SFS)", "India"],
  //     language: "🇺🇸",
  //     lastChange: "Oct 27, 2024 20:31",
  //     lastChangeBy: "Uttam Uttam",
  //     published: "Aug 27, 2018 15:56",
  //     createdBy: "Uttam Uttam",
  //     version: 48,
  //   },
  //   {
  //     select: false,
  //     name: "FM135 Pitch_FreqConvPitch1_ErrStop",
  //     taxonomy: ["S88 (SFS)", "India"],
  //     language: "🇺🇸",
  //     lastChange: "Apr 04, 2024 15:42",
  //     lastChangeBy: "Ashish Ambodiya",
  //     published: "May 26, 2021 09:29",
  //     createdBy: "Aniruddha Bokil",
  //     version: 279,
  //   },
  //   {
  //     select: false,
  //     name: "FM135 Pitch_FreqConvPitch1_ErrStop",
  //     taxonomy: ["S88 (SFS)", "India"],
  //     language: "🇺🇸",
  //     lastChange: "Apr 04, 2024 15:42",
  //     lastChangeBy: "Ashish Ambodiya",
  //     published: "May 26, 2021 09:29",
  //     createdBy: "Aniruddha Bokil",
  //     version: 279,
  //   },
  //   {
  //     select: false,
  //     name: "FM135 Pitch_FreqConvPitch1_ErrStop",
  //     taxonomy: ["S88 (SFS)", "India"],
  //     language: "🇺🇸",
  //     lastChange: "Apr 04, 2024 15:42",
  //     lastChangeBy: "Ashish Ambodiya",
  //     published: "May 26, 2021 09:29",
  //     createdBy: "Aniruddha Bokil",
  //     version: 279,
  //   },
  //   // Add more rows as needed for scrolling effect
  // ];

  // const handleSubCauseToggle = (key) => {
  //   setExpandedSubCause((prevState) => ({
  //     ...prevState,
  //     [key]: !prevState[key], // Toggle the state
  //   }));
  // };

  const handleSubCauseToggleAndFetch = async (key, subCauseName) => {
    console.log(`Toggling sub-cause: ${subCauseName}`); // Log the name being sent

      // Store the last clicked sub-cause name (CauseName)
      setLastClickedCauseName(subCauseName);
    
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
          setNestedSubCauseData((prevState) => {
            const updatedState = {
              ...prevState,
              [key]: data.data.map((item) => ({
                eventName: item.EventName, // Store EventName
                probability: item.ProbabilityPercentage || 0, // Store ProbabilityPercentage with default fallback
              })),
            };
            console.log("Updated Nested Sub-Cause State:", updatedState);
            return updatedState;
          });
          ;
        }
      } catch (error) {
        console.error('Error fetching sub-cause data:', error);
      }
    }
  };
  
  // useEffect to print EventName and ProbabilityPercentage whenever data is updated
  useEffect(() => {
    console.log('Current nestedSubCauseData state:', nestedSubCauseData);
    // Print both EventName and ProbabilityPercentage for each key in nestedSubCauseData
    Object.keys(nestedSubCauseData).forEach((key) => {
      nestedSubCauseData[key].forEach((item) => {
        console.log(`Event: ${item.eventName}, Probability: ${item.probability}%`);
      });
    });
  }, [nestedSubCauseData]); // This effect runs whenever nestedSubCauseData changes
  
  

    // Example of how to use the state and trigger the effect when needed
    // useEffect(() => {
    //   if (expandedSubCause) {
    //     console.log('Fetched data for sub-cause inside expandedSubcause:', expandedSubCause);
    //   }
    // }, [expandedSubCause]);  // Re-run when the subCauseData state changes
  
  
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
    
    useEffect(() => {
      // Log the causesData whenever it changes
      console.log("Updated causesData:", causesData);
    }, [causesData]);
  
    

    // Function to handle fetching cause data and toggling expansion
    const handleFetchCause = async (causeName) => {
        // Reset data before processing further
  setExpandedCauseData(null);
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
  <button className="modal-button"onClick={handleConstraintClick}>
    <i className="fa fa-exclamation-triangle"></i> Constraints
  </button>
  <select className="tools-dropdown">
    <option value="Tool1">Tool 1</option>
    <option value="Tool2">Tool 2</option>
  </select>
  {/* <button className="modal-button preview-btn"> */}
  <button className="modal-button preview-btn" onClick={handlePreviewClick}>
    <i className="fa fa-eye"></i> Preview
  </button>
</div>

        </div>

        {/* Content */}
        <div className="modal-content">
          {/* Left Panel */}
          <div className="modal-left-panel">
            <div className="table-container">
            {/* <h3>
  Causes
  <span className="create-top-cause" onClick={handleCreateTopCauseClick}>
    *
  </span>
</h3> */}

<h3>
        Causes
        <span className="gear-icon-1112" onClick={handleGearClick1112}>
          <FaCog />
        </span>
      </h3>
      {showOptionsBox1112 && (
        <div className="options-box-1112">
          <div className="option-1112" onClick={handleCreateTopCauseClick}>
          {/* <div className="option-1112" onClick={addNewSubCause}> */}
            <FaPlus className="icon-1112" /> Create Top Cause
          </div>
          <div className="option-1112" onClick={handleRearrangeClick1112}>
            <FaRandom className="icon-1112" /> Rearrange
          </div>
        </div>
      )}
      

      <table className="modal-table" id="cause-table">
  <thead>
    <tr>
      <th>✓</th>
      <th></th> {/* For the plus/minus icon */}
      <th>Cause</th>
      <th>Probability</th>
      {isAnyProgressChecked && <th>Solve</th>}
      <th>Action</th> {/* Action column header */}
    </tr>
  </thead>
  <tbody>
    {causesData.map((cause, index) => (
      <React.Fragment key={index}>
        {/* Main Cause Row */}
        <tr
          onMouseEnter={() => setHoveredCell1114(`cause-${index}`)}
          onMouseLeave={() => setHoveredCell1114(null)}
        >
          <td>
            {!solveCheckboxes900[index] && <span>✓</span>} {/* Show tick mark */}
          </td>
          <td>
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
                value={editingField886.value}
                onChange={(e) => setEditingField886({ ...editingField886, value: e.target.value })}
                onBlur={(e) => handleSaveField(index, "name", e.target.value, e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSaveField(index, "name", e.target.value, e);
                  }
                }}
                autoFocus
              />
            ) : (
              <span onClick={() => handleEditField(index, "name")}>{cause.name}</span>
            )}
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
          <td>
            {isAnyProgressChecked && (
              <input
                type="checkbox"
                checked={solveCheckboxes900[index] || false}
                onChange={() => setSolveCheckboxes900((prev) => ({ ...prev, [index]: !prev[index] }))}
              />
            )}
          </td>
          <td>
          {hoveredCell1114 === `cause-${index}` && (
  <FaCog
    id="icon-hover-1114"
    className="config-icon901"
    onClick={(e) => handleIconClick902(index, "cause", e, causesData[index].name)} // Pass actual cause name
  />

            )}
          </td>
        </tr>

        {/* Expanded Sub-Cause Rows */}
        {expandedCauseName === cause.name && expandedCauseData &&
          expandedCauseData.map((causeDetail, subIndex) => (
            <React.Fragment key={subIndex}>
              <tr
                className="sub-cause-row"
                onMouseEnter={() => setHoveredCell1114(`subcause-${index}-${subIndex}`)}
                onMouseLeave={() => setHoveredCell1114(null)}
              >
                <td>
                  {!solveCheckboxes900[index] && <span>✓</span>} {/* Show tick mark */}
                </td>
                <td>
                  {causeDetail.internalSubCause && (
                    <button
  className="toggle-button2"
  onClick={() =>
    handleSubCauseToggleAndFetch(`${cause.name}-${causeDetail.CauseName}`, causeDetail.CauseName)
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
                      value={editingField886.value || ""}
                      onChange={(e) => setEditingField886({ ...editingField886, value: e.target.value })}
                      onBlur={() => handleSaveSubField886(subIndex, "CauseName", editingField886.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSaveSubField886(subIndex, "CauseName", editingField886.value);
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    <span onClick={() => setEditingField886({ index: subIndex, field: "CauseName", value: causeDetail.CauseName || "" })}>
                      {causeDetail.CauseName || "Click to edit"}
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
                      onChange={(e) => handleSubCauseSliderChange(subIndex, Number(e.target.value))}
                    />
                    <span className="probability">{causeDetail.ProbabilityPercentage || 0}%</span>
                  </div>
                </td>

                <td>
                  {isAnyProgressChecked && (
                    <input
                      type="checkbox"
                      checked={solveCheckboxes900[`${index}-${subIndex}`] || false}
                      onChange={() =>
                        setSolveCheckboxes900((prev) => ({
                          ...prev,
                          [`${index}-${subIndex}`]: !prev[`${index}-${subIndex}`],
                        }))
                      }
                    />
                  )}
                </td>
                <td>
  {hoveredCell1114 === `subcause-${index}-${subIndex}` && (
    <FaCog
      id="icon-hover-1114"
      className="config-icon901"
      onClick={(e) => handleIconClick902(`${index}-${subIndex}`, "subcause", e, causeDetail.CauseName)} // Pass only the sub-cause name
    />
  )}
</td>

              </tr>

              {/* Nested Sub-Cause Rows with Slider and Editing */}
              {expandedSubCause[`${cause.name}-${causeDetail.CauseName}`] && (
                <tr
                  className="nested-sub-cause-row"
                  onMouseEnter={() => setHoveredCell1114(`nested-subcause-${index}-${subIndex}`)} // Unique ID for nested sub-cause
                  onMouseLeave={() => setHoveredCell1114(null)}
                >
                  <td colSpan={5}> {/* Adjust the column span to remove the first column */}
                    <table className="nested-sub-cause-table">
                      <tbody>
                      {nestedSubCauseData[`${cause.name}-${causeDetail.CauseName}`]?.map((nestedSubCause, nestedIndex) => (
  <tr
    key={nestedIndex}
    className="nested-sub-cause-row"
    onMouseEnter={() => setHoveredCell1114(`nested-subcause-${index}-${subIndex}-${nestedIndex}`)}
    onMouseLeave={() => setHoveredCell1114(null)}
  >
                            <td>
                              {!solveCheckboxes900[index] && <span>✓</span>} {/* Show tick mark */}
                            </td>
                            <td></td>
                            <td>
  {editingField7773?.index === nestedIndex && editingField7773?.field === "eventName" ? (
    <input
      type="text"
      value={editingField7773.value || ""}
      onChange={(e) => setEditingField7773({ ...editingField7773, value: e.target.value })}
      onBlur={() => handleSaveNestedSubCauseField7773(`${cause.name}-${causeDetail.CauseName}`, nestedIndex, "eventName", editingField7773.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSaveNestedSubCauseField7773(`${cause.name}-${causeDetail.CauseName}`, nestedIndex, "eventName", editingField7773.value);
        }
      }}
      autoFocus
    />
  ) : (
    <span onClick={() => startEditingNestedSubCause(`${cause.name}-${causeDetail.CauseName}`, nestedIndex, "eventName", nestedSubCause.eventName || "")}>
      {nestedSubCause.eventName || "Click to edit"}
    </span>
  )}
</td>



                            <td>
                              <div className="slider-container">
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={nestedSubCause.probability || 0}
                                  className="slider"
                                  onChange={(e) =>
                                    handleNestedSubCauseSliderChange7773(
                                      `${cause.name}-${causeDetail.CauseName}`,
                                      nestedIndex,
                                      Number(e.target.value)
                                    )
                                  }
                                />
                                <span className="probability">{nestedSubCause.probability || 0}%</span>
                              </div>
                            </td>

                            <td>
                              {isAnyProgressChecked && (
                                <input
                                  type="checkbox"
                                  checked={solveCheckboxes900[`${index}-${subIndex}-${nestedIndex}`] || false}
                                  onChange={() =>
                                    setSolveCheckboxes900((prev) => ({
                                      ...prev,
                                      [`${index}-${subIndex}-${nestedIndex}`]: !prev[`${index}-${subIndex}-${nestedIndex}`],
                                    }))
                                  }
                                />
                              )}
                            </td>

                            <td>
  {hoveredCell1114 === `nested-subcause-${index}-${subIndex}-${nestedIndex}` && (
    <FaCog
      id="icon-hover-1114"
      className="config-icon901"
      onClick={(e) => handleIconClick902(`${index}-${subIndex}-${nestedIndex}`, "nestedSubCause", e, nestedSubCause.eventName)} // Pass only the event name of the nested sub-cause
    />
  )}
</td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
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
    onClick={saveCauseData}
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
          <h3>Actions
          <span className="gear-icon-1112" onClick={handleGearClick1113}>
          <FaCog />
        </span>
          </h3>
          {showOptionsBox1113 && (
        <div className="options-box-1113">
      {/* Create Action Button */}
      <div className="option-1113" onClick={addNewAction1115}>
        <FaPlus className="icon-1112" /> Create Action
      </div>
        </div>
      )}
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
      {/* Action Table */}
      <div style={{ position: "relative" }}>
      <table className="modal-table" id="action-table" ref={tableRef}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Time</th>
          <th>Money</th>
          <th>Level</th>
          <th>Progress</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {paginatedData990.length > 0 ? (
          paginatedData990.map((action, rowIndex) => (
            <tr
              key={rowIndex}
              onMouseEnter={() => handleMouseEnter901(rowIndex)}
              onMouseLeave={handleMouseLeave901}
              style={{
                backgroundColor:
                  hoveredCell901 === rowIndex ? "rgba(200, 200, 255, 0.5)" : "transparent",
              }}
            >
              {/* Editable Name */}
              <td onClick={() => handleCellClick1115(rowIndex, "name", action.name)}>
                {editableCell1115?.rowIndex === rowIndex && editableCell1115?.field === "name" ? (
                  <input
                    type="text"
                    value={tempValue1115}
                    autoFocus
                    onChange={handleInputChange1115}
                    onBlur={(e) => handleBlurOrEnter1115(e, rowIndex, "name")}
                    onKeyDown={(e) => handleBlurOrEnter1115(e, rowIndex, "name")}
                  />
                ) : (
                  action.name
                )}
              </td>

              {/* Editable Time */}
              <td onClick={() => handleCellClick1115(rowIndex, "time", action.time)}>
                {editableCell1115?.rowIndex === rowIndex && editableCell1115?.field === "time" ? (
                  <input
                    type="text"
                    value={tempValue1115}
                    autoFocus
                    onChange={handleInputChange1115}
                    onBlur={(e) => handleBlurOrEnter1115(e, rowIndex, "time")}
                    onKeyDown={(e) => handleBlurOrEnter1115(e, rowIndex, "time")}
                  />
                ) : (
                  action.time || "0"
                )}
              </td>

              {/* Editable Money */}
              <td onClick={() => handleCellClick1115(rowIndex, "money", action.money)}>
                {editableCell1115?.rowIndex === rowIndex && editableCell1115?.field === "money" ? (
                  <input
                    type="text"
                    value={tempValue1115}
                    autoFocus
                    onChange={handleInputChange1115}
                    onBlur={(e) => handleBlurOrEnter1115(e, rowIndex, "money")}
                    onKeyDown={(e) => handleBlurOrEnter1115(e, rowIndex, "money")}
                  />
                ) : (
                  action.money || "0"
                )}
              </td>

              {/* Editable Level */}
              <td onClick={() => handleCellClick1115(rowIndex, "level", action.level)}>
                {editableCell1115?.rowIndex === rowIndex && editableCell1115?.field === "level" ? (
                  <input
                    type="text"
                    value={tempValue1115}
                    autoFocus
                    onChange={handleInputChange1115}
                    onBlur={(e) => handleBlurOrEnter1115(e, rowIndex, "level")}
                    onKeyDown={(e) => handleBlurOrEnter1115(e, rowIndex, "level")}
                  />
                ) : (
                  action.level || "0"
                )}
              </td>

           {/* Progress Checkbox */}
           <td>
                  <input
                    type="checkbox"
                    checked={action.progress || false}
                    onChange={(e) => handleProgressCheckboxChange(rowIndex, e.target.checked)}
                  />
                </td>

              {/* Hover Configuration Icon */}
              <td>
                {hoveredCell901 === rowIndex && (
                  <FaCog
                    className="config-icon901"
                    onClick={(e) => handleIconClick901(rowIndex, e)}
                  />
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">No actions available</td>
          </tr>
        )}
      </tbody>
    </table>

  {clickedCell901 !== null && (
    <div
      className="options-menu901"
      style={{
        position: "absolute",
        top: `${menuPosition901.top}px`,
        left: `${menuPosition901.left}px`,
      }}
    >
   <div
  onClick={() => handleEditExplanation(paginatedData990[clickedCell901].name)}
>
  Edit Explanation
</div>

      <div>Properties</div>
      <div>Delete</div>
    </div>
  )}


    {clickedCell901 !== null && (
    <div
      className="options-menu901"
      style={{
        position: "absolute",
        top: `${menuPosition901.top}px`,
        left: `${menuPosition901.left}px`,
      }}
    >
   <div
  onClick={() => handleEditExplanation(paginatedData990[clickedCell901].name)}
>
  Edit Explanation
</div>

      <div>Properties</div>
      <div>Delete</div>
    </div>
  )}

{/* {clickedCell902 !== null && (
  <div
    className="options-menu901"
    ref={menuRef2}
    style={{
      position: "absolute",
      top: `${menuPosition902.top}px`,
      left: `${menuPosition902.left}px`,
    }}
  >
  
    {clickedRowType === 'cause' && (
      <div
        onClick={() => {
          const selectedCause = causesData[clickedCell902]; 
          console.log('Clicked on Cause:', selectedCause);
          
          if (selectedCause && selectedCause.name) {
            addNewCause(selectedCause.name);
          } else {
            console.error('Cause data is missing or invalid:', selectedCause);
          }
        }}
      >
        Create Cause
      </div>
    )}


    {clickedRowType === 'subcause' && (
      <div
        onClick={() => {
        
          const identifiers = clickedCell902.split('-');
          const causeIndex = parseInt(identifiers[0], 10);
          const subCauseIndex = identifiers[1] ? parseInt(identifiers[1], 10) : undefined;

          const selectedCause = expandedCauseData[causeIndex]; 
          console.log('Clicked on SubCause:', selectedCause);

          const selectedSubCause = selectedCause && selectedCause.causeObject[subCauseIndex];
          if (selectedSubCause && selectedSubCause.CauseName) {
            addNewSubCause(selectedSubCause.CauseName); 
          } else {
            console.error('SubCause data is missing or invalid:', selectedSubCause);
          }
        }}
      >
        Add SubCause
      </div>
    )}


    {clickedRowType === 'nestedSubCause' && (
      <div
        onClick={() => {
          const identifiers = clickedCell902.split('-');
          const causeIndex = parseInt(identifiers[0], 10);
          const subCauseIndex = identifiers[1] ? parseInt(identifiers[1], 10) : undefined;
          const nestedSubCauseIndex = identifiers[2] ? parseInt(identifiers[2], 10) : undefined;

          const selectedSubCause = expandedCauseData[causeIndex];
          console.log('Clicked on Nested SubCause:', selectedSubCause);

          const selectedNestedSubCause = selectedSubCause && selectedSubCause.data[nestedSubCauseIndex];
          if (selectedNestedSubCause && selectedNestedSubCause.EventName) {
            addNewNestedSubCause(
              selectedNestedSubCause.EventName, 
              "Untitled Nested Cause" 
            );
          } else {
            console.error('NestedSubCause data is missing or invalid:', selectedNestedSubCause);
          }
        }}
      >
        Add Nested SubCause
      </div>
    )}
  </div>
)} */}


{clickedCell902 !== null && (
  <div
    className="options-menu901"
    ref={menuRef2}
    style={{
      position: "absolute",
      top: `${menuPosition902.top}px`,
      left: `${menuPosition902.left}px`,
    }}
  >
    {/* Handle Cause Row */}
    {clickedRowType === 'cause' && (
      <>
        <div
          onClick={() => {
            const selectedCause = causesData[clickedCell902];
            const causeIndex = clickedCell902;

            console.log('Clicked on Cause:', selectedCause.name);

            // Pass the selectedCause.name directly as parentCauseName
            addNewUntitledSubCause(causeIndex, selectedCause.name);

            setExpandedCauseName(selectedCause.name); // Set the expandedCauseName to the clicked cause

            const updatedCausesData = [...causesData];
            updatedCausesData[causeIndex] = {
              ...selectedCause,
              internalCause: true, // Set internalCause to true
            };

            setCausesData(updatedCausesData);
            console.log('Updated Cause:', updatedCausesData[causeIndex]);
          }}
        >
          Create Cause
        </div>
        <div
          onClick={() => {
            deleteRow('cause', clickedCell902);
          }}
        >
          Delete Top Cause
        </div>
      </>
    )}
    
      {/* Handle SubCause Row */}
      {clickedRowType === 'subcause' && (
        <>
          <div
            onClick={() => {
                      // Log the click to track if it's being triggered twice
        console.log('SubCause Add button clicked');
              const identifiers = clickedCell902.split('-');
              const causeIndex = parseInt(identifiers[0], 10);
              const subCauseIndex = identifiers[1] ? parseInt(identifiers[1], 10) : undefined;

              const selectedSubCause = expandedCauseData[subCauseIndex];
              const subCauseName = selectedSubCause?.CauseName || "Unknown SubCause";

              console.log('Clicked on SubCause:', subCauseName);

              addNewUntitledNestedSubCause(causeIndex, subCauseIndex);

              // Update the subcause with internalSubCause: true
              const updatedCauseData = [...expandedCauseData];
              if (selectedSubCause) {
                updatedCauseData[subCauseIndex] = {
                  ...selectedSubCause,
                  internalSubCause: true, // Set internalSubCause to true
                };
                setExpandedCauseData(updatedCauseData);
              }
            }}
          >
            Add SubCause
          </div>
          <div
            onClick={() => {
              deleteRow('subcause', clickedCell902);
            }}
          >
            Delete Cause
          </div>
        </>
      )}

    {/* Handle NestedSubCause Row */}
    {clickedRowType === 'nestedSubCause' && (
      <>
        {/* <div
          onClick={() => {
            const identifiers = clickedCell902.split('-');
            const causeIndex = parseInt(identifiers[0], 10);
            const subCauseIndex = identifiers[1] ? parseInt(identifiers[1], 10) : undefined;
            const nestedSubCauseIndex = identifiers[2] ? parseInt(identifiers[2], 10) : undefined;

            const nestedSubCauseName =
              expandedCauseData[nestedSubCauseIndex]?.CauseName || "Unknown Nested SubCause";

            console.log('Clicked on Nested SubCause:', nestedSubCauseName);

            addNewUntitledNestedSubCause(causeIndex, subCauseIndex);

            // Update the nestedSubCause with internalSubCause: true
            const updatedCauseData = [...expandedCauseData];
            if (expandedCauseData[nestedSubCauseIndex]) {
              updatedCauseData[nestedSubCauseIndex] = {
                ...expandedCauseData[nestedSubCauseIndex],
                internalSubCause: true, // Set internalSubCause to true
              };
              setExpandedCauseData(updatedCauseData);
            }
          }}
        >
          Add SubCause
        </div> */}
        <div
          onClick={() => {
            deleteRow('nestedSubCause', clickedCell902);
          }}
        >
          Delete SubCause
        </div>
      </>
    )}
  </div>
)}



















</div>

  


    
      {/* Questions Section */}
      <h3>Questions
        <span className="gear-icon-1112" onClick={handleGearClick1114}>
                  <FaCog />
                </span>
      </h3>
      <table className="modal-table" id="question-table">
  <thead>
    <tr>
      <th>Name</th>
      <th><FiClock /></th>
      <th><FiTrendingUp /></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {data884 && data884.questions.map((question, index) => {
      // Check if the question name is in either hoverItems894 or hoverItems895
      const isHoveredQuestion =
        hoverItems894.questions.includes(question.questionName) ||
        hoverItems895.questions.includes(question.questionName);

      // Check if any of the question answers are in either hoverItems894 or hoverItems895
      const isHoveredAnswer = questionAnswers885.some(answer =>
        hoverItems894.questionAnswers.includes(answer) ||
        hoverItems895.questionAnswers.includes(answer)
      );

      return (
        <tr
          key={index}
          style={{
            // Apply brown background color if the question or any answer is found in hoverItems894 or hoverItems895
            backgroundColor: isHoveredQuestion || isHoveredAnswer ? 'brown' : 'transparent',
          }}
        >
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
                  questionAnswers885.map((answer, idx) => {
                    // Check if the answer is in either hoverItems894 or hoverItems895
                    const isHoveredAnswer =
                      hoverItems894.questionAnswers.includes(answer) ||
                      hoverItems895.questionAnswers.includes(answer);
                    return (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: isHoveredAnswer ? 'brown' : 'transparent',
                        }}
                      >
                        {answer}
                      </div>
                    );
                  })
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
      );
    })}
  </tbody>
</table>

          </div>
        </div>

        {/* Close Button */}
        {/* <button className="close-modal-button" onClick={closeModal}>
          <i className="fa fa-times"></i> Close
        </button> */}
      </div>
    </div>
  )};

    </div>
  );
};

export default DynamicGuides882;
