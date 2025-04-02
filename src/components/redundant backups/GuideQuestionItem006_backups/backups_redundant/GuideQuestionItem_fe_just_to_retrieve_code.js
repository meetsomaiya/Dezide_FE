import React from 'react';
import { useLocation } from 'react-router-dom';

const GuideQuestionItem = () => {
  const location = useLocation();
  const { actionId, actionName } = location.state || {};  // Access the passed data

  return (
    <div className="guide-question-item">
      <h2>Guide Question Item</h2>
      <div>
        <h3>Action ID: {actionId}</h3>
        <p>Action Name: {actionName}</p>
      </div>
      {/* Your UI for this page */}
    </div>
  );
};

export default GuideQuestionItem;
