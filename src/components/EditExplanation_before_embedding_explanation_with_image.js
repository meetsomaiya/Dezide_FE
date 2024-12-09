import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./EditExplanation.css";

const EditExplanation = () => {
  const location = useLocation();
  const { modalName = "N/A", actionName = "N/A" } = location.state || {}; // Safely retrieve data with defaults

  const [editorContent, setEditorContent] = useState(""); // For the main content
  const [changeDescription, setChangeDescription] = useState(""); // For tracking changes

  // Fetch Action Explanation from API
  useEffect(() => {
    const fetchActionExplanation = async () => {
      try {
        const response = await fetch(
          `http://localhost:226/api/fetch_action_explanation?actionName=${encodeURIComponent(actionName)}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("API Response:", data); // Log the API response
        } else {
          console.error("Error fetching data:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error in fetch request:", error);
      }
    };

    fetchActionExplanation();
  }, [actionName]); // Dependency ensures this runs when actionName changes

  return (
    <div className="blog-editor-container">
      {/* Modal Name */}
      <p className="modal-name">{modalName}</p>

      {/* Action Name */}
      <div className="action-name-container">
        <p>Action Name:</p>
        <input
          type="text"
          value={actionName}
          readOnly
          className="action-input"
        />
      </div>

      {/* Toolbar */}
      <div className="toolbar-container">
        <button className="toolbar-button">B</button>
        <button className="toolbar-button">I</button>
        <button className="toolbar-button">U</button>
        <button className="toolbar-button">Image</button>
        <button className="toolbar-button">Table</button>
      </div>

      {/* Editor Box */}
      <div className="editor-box">
        <ReactQuill
          value={editorContent}
          onChange={setEditorContent}
          placeholder="Write your content here..."
        />
      </div>

      {/* Footer */}
      <div className="footer-container">
        <div className="language-indicator">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
            alt="US Flag"
            className="flag-icon"
          />
          <p>You are writing content in English</p>
        </div>
        <input
          type="text"
          placeholder="What did you change?"
          value={changeDescription}
          onChange={(e) => setChangeDescription(e.target.value)}
          className="change-input"
        />
        <div className="button-group">
          <button className="save-close-button">Save and Close</button>
          <button className="save-button">Save</button>
          <button className="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditExplanation;
