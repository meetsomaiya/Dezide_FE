import React, { useState } from 'react';
import './FeedBack222.css'; // Import the external CSS file

const FeedBack222 = ({ currentActionName, eventNameOrange, onClose }) => {
  const [feedbackInput333, setFeedbackInput333] = useState(''); // State to hold feedback input

  const handleSubmit333 = () => {
    console.log('Submitted Feedback:', feedbackInput333);
    console.log('Current Action Name:', currentActionName);
    console.log('Event Name (Orange):', eventNameOrange);

    alert(
      `Feedback Submitted: ${feedbackInput333}\n` +
      `Action Name: ${currentActionName}\n` +
      `Event Name (Orange): ${eventNameOrange}`
    );

    setFeedbackInput333(''); // Clear feedback input after submission
    onClose(); // Collapse the modal
  };

  return (
    <div className="modal-overlay222">
      <div className="modal-content222">
        <h2>Feedback Modal</h2>
        <p>Current Action: <strong>{currentActionName}</strong></p>
        <p>Event Name (Orange): <strong>{eventNameOrange}</strong></p>
        
        {/* Feedback Form Input */}
        <textarea
          placeholder="Write your feedback here..."
          rows="4"
          className="feedback-textarea222"
          value={feedbackInput333}
          onChange={(e) => setFeedbackInput333(e.target.value)}
        ></textarea>

        <div className="button-container222">
          <button onClick={onClose} className="close-button222">Close</button>
          <button onClick={handleSubmit333} className="submit-button222">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default FeedBack222;
