import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./FeedBack222.css";

const FeedbackModal222 = ({
  agentName,
  currentActionName,
  eventNameOrange,
  onCloseModal222,
}) => {
  const [feedbackContent, setFeedbackContent] = useState(""); // For ReactQuill editor
  const [attachment, setAttachment] = useState(null);

  const [adminEmail, setAdminEmail] = useState(""); // State to hold email from cookie

    // Function to extract cookie value by name
    const getCookieValue = (name) => {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
          const [key, value] = cookie.split("=");
          if (key === name) return decodeURIComponent(value);
        }
        return "";
      };
    
      // Retrieve the adminEmail from cookies when the component mounts
      useEffect(() => {
        const email = getCookieValue("adminEmail"); // Fetch email from the cookie
        setAdminEmail(email); // Set it to state
      }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Agent Name:", agentName);
//     console.log("Case Title:", eventNameOrange);
//     console.log("Action:", currentActionName);
//     console.log("Feedback:", feedbackContent);
//     console.log("Attachment:", attachment);

//     alert("Feedback Submitted Successfully!");
//     setFeedbackContent(""); // Clear the editor
//     setAttachment(null); // Clear attachment
//     onCloseModal222(); // Close modal after submission
//   };

const handleSubmit = (e) => {
    e.preventDefault();
  
    // Create a FormData object to send data as multipart/form-data
    const formData = new FormData();
    formData.append("agentName", adminEmail); // This will include the adminEmail
    formData.append("caseTitle", eventNameOrange);
    formData.append("action", currentActionName);
    formData.append("feedback", feedbackContent);
  
    // Append the attachment if it exists
    if (attachment) {
      formData.append("attachment", attachment);
    }
  
    // Console log the FormData entries being sent
    console.log("Data being sent to the backend:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    // Send POST request to backend
    fetch("http://localhost:226/api/feedback_sent", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert("Feedback Submitted Successfully!");
          setFeedbackContent(""); // Clear the editor
          setAttachment(null); // Clear attachment
          onCloseModal222(); // Close modal
        } else {
          throw new Error("Failed to submit feedback.");
        }
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
        alert("Failed to submit feedback. Please try again.");
      });
  };
  

  return (
    <div className="modal-overlay222">
      <div className="modal-content222">
        {/* Modal Title */}
        <h3 className="modal-title222">Create feedback</h3>

        {/* Agent Name */}
        <div className="modal-input-container222">
          <label className="modal-label222">Agent name</label>
          <input
            type="email"
            className="modal-input222 modal-input-readonly222"
            value={adminEmail}
            readOnly // Makes the input non-editable
          />
        </div>

        {/* Case Title */}
        <div className="modal-input-container222">
          <label className="modal-label222">Case title</label>
          <input
            type="text"
            className="modal-input222 modal-input-readonly222"
            value={eventNameOrange}
            readOnly
          />
        </div>

        {/* Action */}
        <div className="modal-input-container222">
          <label className="modal-label222">Action</label>
          <input
            type="text"
            className="modal-input222 modal-input-readonly222"
            value={currentActionName}
            readOnly
          />
        </div>

        {/* Feedback (Separate Container) */}
        <div className="modal-feedback-container222">
          <label className="modal-label222">Feedback</label>
          <ReactQuill
            theme="snow"
            className="modal-quill-editor222"
            value={feedbackContent}
            onChange={setFeedbackContent}
            placeholder="Write your feedback here..."
          />
        </div>

        {/* Attachments (Separate Container) */}
        <div className="modal-attachment-container222">
          <div className="modal-input-container222">
            <label className="modal-label222">Attachments</label>
            <input
              type="file"
              className="modal-fileinput222"
              onChange={(e) => setAttachment(e.target.files[0])}
            />
          </div>

          {/* Maximum Attachment Size Instruction */}
          <div className="modal-note-container222">
            <small className="modal-note222">
              The maximum attachment size is 10 MB.
            </small>
          </div>
        </div>

        {/* Buttons */}
        <div className="modal-button-container222">
          <button
            type="button"
            className="modal-close-button222"
            onClick={onCloseModal222}
          >
            Close
          </button>
          <button type="submit" className="modal-submit222" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal222;
