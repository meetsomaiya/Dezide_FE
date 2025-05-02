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

  const [hoveredCell1113, setHoveredCell1113] = useState(null);

  const [hoveredCell1114, setHoveredCell1114] = useState(null);

   // New state variables for nested sub-cause (7773) functionalities
   const [editingField7773, setEditingField7773] = useState(null); // State for editing nested sub-cause fields

 // New state to track the currently editable cell
 const [editableCell1115, setEditableCell1115] = useState(null); // Tracks { rowIndex, field }
 const [tempValue1115, setTempValue1115] = useState(""); // Temporary value for editing

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

  const handleCreateTopCauseClick1112 = () => {
    console.log("Create Top Cause function called");
    setShowOptionsBox1112(false);
  };

  const handleRearrangeClick1112 = () => {
    console.log("Rearrange function called");
    setShowOptionsBox1112(false);
  };

    // Handler for saving nested sub-cause field
    const handleSaveNestedSubCauseField7773 = (nestedIndex, field, value) => {
      const updatedData = { ...nestedSubCauseData };
      updatedData[field] = value;
      setNestedSubCauseData(updatedData);
    };
  
     // Handler for slider change in nested sub-causes
     const handleNestedSubCauseSliderChange7773 = (key, nestedIndex, value) => {
      console.log("Slider Change Triggered: ", { key, nestedIndex, value });
    
      const total = 100;
      const updatedNestedSubCauses = [...(nestedSubCauseData[key] || [])];
      let delta = 0;
    
      if (nestedIndex < updatedNestedSubCauses.length) {
        delta = value - updatedNestedSubCauses[nestedIndex].probability;
        updatedNestedSubCauses[nestedIndex].probability = value;
      }
    
      let remaining = total - value;
      const otherNestedSubCauses = updatedNestedSubCauses.filter((_, i) => i !== nestedIndex);
    
      otherNestedSubCauses.forEach((nestedSubCause) => {
        if (remaining <= 0) return;
    
        const adjustment = Math.min(
          Math.round((nestedSubCause.probability / (total - value)) * delta),
          remaining
        );
        nestedSubCause.probability = Math.max(0, nestedSubCause.probability - adjustment);
        remaining -= adjustment;
      });
    
      const correctedTotal = updatedNestedSubCauses.reduce(
        (sum, nestedSub) => sum + nestedSub.probability,
        0
      );
    
      const balancedNestedSubCauses = updatedNestedSubCauses.map((nestedSubCause) => ({
        ...nestedSubCause,
        probability: Math.round((nestedSubCause.probability / correctedTotal) * total),
      }));
    
      console.log("Updated Nested Sub-Causes: ", balancedNestedSubCauses);
    
      setNestedSubCauseData((prevState) => ({
        ...prevState,
        [key]: balancedNestedSubCauses,
      }));
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
  const handleProgressCheckboxChange = (index, isChecked) => {
    setIsAnyProgressChecked(isChecked || isAnyProgressChecked);
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
    
    const handleIconClick902 = (identifier, type, event, rowName) => {  // Changed 'name' to 'rowName'
      let causeIndex, subCauseIndex, nestedSubCauseIndex;
    
      // Check if clicked row is the same as the currently selected one
      if (clickedCell902 === identifier) {
        setClickedCell902(null); // Close if already open
        setClickedRowType(null); // Clear row type when closing
      } else {
        // Get position of the clicked icon to position the menu
        const rect = event.target.getBoundingClientRect();
        const tableRect = tableRef.current.getBoundingClientRect();
    
        // Set the menu position
        setMenuPosition902({
          top: rect.bottom - tableRect.top + window.scrollY + 10, // Position below the icon
          left: rect.left - tableRect.left + 5 - 40, // Adjust horizontal position
        });
    
        // Set the clicked cell and row type
        setClickedCell902(identifier); // Open for the clicked cell
        setClickedRowType(type); // Set row type based on the clicked row (cause, sub-cause, or nested sub-cause)
    
        // Split the identifier if it's not the cause
        if (type !== "cause") {
          const identifiers = identifier.split('-'); // Splitting to handle cause, sub-cause, nested sub-cause
          causeIndex = parseInt(identifiers[0], 10); // Extracting cause index
          subCauseIndex = identifiers[1] ? parseInt(identifiers[1], 10) : undefined; // Extracting sub-cause index
          nestedSubCauseIndex = identifiers[2] ? parseInt(identifiers[2], 10) : undefined; // Extracting nested sub-cause index
        } else {
          // If it's 'cause', directly use the identifier as causeIndex
          causeIndex = parseInt(identifier, 10); // Extracting cause index
        }
    
        // Logging to debug
        console.log(`Row Clicked: Type - ${type}, Cause Index - ${causeIndex}, Sub-Cause Index - ${subCauseIndex}, Nested Sub-Cause Index - ${nestedSubCauseIndex}`);
        
        // Log the name (now using rowName instead of name)
        console.log(`Name: ${rowName}`); // Log the name (sub-cause or nested sub-cause)
    
        // Handle different types (cause, sub-cause, nested sub-cause)
        switch (type) {
          case "cause":
            console.log('Clicked on Cause:', rowName);
            // Handle logic for cause row here
            break;
    
          case "subcause":
            console.log('Clicked on SubCause:', rowName); // Now you just have the sub-cause name
            // Handle logic for sub-cause row here
            break;
    
          case "nestedSubCause":
            console.log('Clicked on Nested SubCause:', rowName); // Now you just have the nested sub-cause name
            // Handle logic for nested sub-cause row here
            break;
    
          default:
            console.log('Unknown row type clicked.');
            break;
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

    const handleSaveSubField886 = (index, field, value) => {
      const updatedSubCauses = [...expandedCauseData];
      updatedSubCauses[index][field] = value; // Update the specific field
      setExpandedCauseData(updatedSubCauses); // Update the state
    
      setEditingField886(null); // Exit edit mode
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
    

    // const handleSaveField = (index, field, value) => {
    //   const updatedCauses = [...causesData];
    //   updatedCauses[index][field] = value;
    //   setCausesData(updatedCauses);
    //   setEditingField886(null);
    // };

    const handleSaveField = (index, field, value, event) => {
      if (event.key === "Enter") {
        const updatedCauses = [...causesData];
        updatedCauses[index][field] = value;
        setCausesData(updatedCauses);
        setEditingField886(null);
      }
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

  setShowOptionsBox1112(!showOptionsBox1112);


};

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

// Handles when the user clicks to create a new top cause
const addNewUntitledSubCause = () => {
  setIsCreateTopCauseInputVisible(true);

  // Define the new cause with default values
  const newCause = {
    CauseName: "Untitled Cause", // Default cause name
    ProbabilityPercentage: 0, // Default probability percentage
  };

  if (expandedCauseData && Array.isArray(expandedCauseData)) {
    // Update the expandedCauseData state by adding the new cause to the end
    setExpandedCauseData([...expandedCauseData, newCause]);
  } else if (!expandedCauseData) {
    // If expandedCauseData is null, initialize it with the new cause
    setExpandedCauseData([newCause]);
  } else {
    console.error("expandedCauseData is not in the expected format.");
  }

  setIsCreateTopCauseInputVisible(false); // Hide input after adding cause
  // setShowOptionsBox1112(!showOptionsBox1112);
};

// Handles when the user clicks to create a new top cause
const addNewUntitledNestedSubCause = () => {
  setIsCreateTopCauseInputVisible(true);

  // Define the new cause with default values
  const newCause = {
    eventName: "Untitled Cause", // Default event name
    probability: 0, // Default probability
  };

  // Check if nestedSubCauseData is initialized and if a specific key exists
  const key = "Issues related to pitch motor-Elctrical issues of pitch motor"; // Replace with your desired key
  if (nestedSubCauseData[key]) {
    // Append the new cause to the existing array for the key
    const updatedData = {
      ...nestedSubCauseData,
      [key]: [...nestedSubCauseData[key], newCause],
    };
    setNestedSubCauseData(updatedData);
  } else {
    // If the key doesn't exist, create a new entry for the key
    const updatedData = {
      ...nestedSubCauseData,
      [key]: [newCause],
    };
    setNestedSubCauseData(updatedData);
  }

  setIsCreateTopCauseInputVisible(false); // Hide input after adding cause
 // setShowOptionsBox1112(!showOptionsBox1112);
};


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
  // useEffect(() => {
  //   console.log('Current nestedSubCauseData state:', nestedSubCauseData);
  //   // Print both EventName and ProbabilityPercentage for each key in nestedSubCauseData
  //   Object.keys(nestedSubCauseData).forEach((key) => {
  //     nestedSubCauseData[key].forEach((item) => {
  //       console.log(`Event: ${item.eventName}, Probability: ${item.probability}%`);
  //     });
  //   });
  // }, [nestedSubCauseData]); // This effect runs whenever nestedSubCauseData changes
  
  

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
        {expandedCauseName === cause.name &&
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
  className="toggle-button"
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
                                  onBlur={() => handleSaveNestedSubCauseField7773(nestedIndex, "eventName", editingField7773.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      handleSaveNestedSubCauseField7773(nestedIndex, "eventName", editingField7773.value);
                                    }
                                  }}
                                  autoFocus
                                />
                              ) : (
                                <span onClick={() => setEditingField7773({ index: nestedIndex, field: "eventName", value: nestedSubCause.eventName || "" })}>
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
                  onChange={(e) => {
                    paginatedData990[rowIndex].progress = e.target.checked;
                  }}
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
      <div
        onClick={() => {
          const selectedCause = causesData[clickedCell902];
          console.log('Clicked on Cause:', selectedCause);

          // No need to use the name; just call the function with index
          addNewCause(); 
        }}
      >
        Create Cause
      </div>
    )}

    {/* Handle SubCause Row */}
    {clickedRowType === 'subcause' && (
      <div
        onClick={() => {
          // Split the identifier into causeIndex and subCauseIndex
          const identifiers = clickedCell902.split('-');
          const causeIndex = parseInt(identifiers[0], 10);
          const subCauseIndex = identifiers[1] ? parseInt(identifiers[1], 10) : undefined;

          // Call the function to add a new untitled sub-cause
          addNewUntitledSubCause(causeIndex);
        }}
      >
        Add SubCause
      </div>
    )}

    {/* Handle NestedSubCause Row */}
    {clickedRowType === 'nestedSubCause' && (
      <div
        onClick={() => {
          // Split the identifier into causeIndex, subCauseIndex, and nestedSubCauseIndex
          const identifiers = clickedCell902.split('-');
          const causeIndex = parseInt(identifiers[0], 10);
          const subCauseIndex = identifiers[1] ? parseInt(identifiers[1], 10) : undefined;
          const nestedSubCauseIndex = identifiers[2] ? parseInt(identifiers[2], 10) : undefined;

          // Call the function to add a new untitled nested sub-cause
          addNewUntitledNestedSubCause(causeIndex, subCauseIndex);
        }}
      >
        Add Nested SubCause
      </div>
    )}
  </div>
)}












</div>

  


    
      {/* Questions Section */}
      <h3>Questions</h3>
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
