import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./EditExplanation.css";

const EditExplanation = () => {
  const location = useLocation();
  const { modalName = "N/A", actionName = "N/A" } = location.state || {}; // Safely retrieve data with defaults

  const [editorContent, setEditorContent] = useState(""); // For the main content
  const [changeDescription, setChangeDescription] = useState(""); // For tracking changes

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
