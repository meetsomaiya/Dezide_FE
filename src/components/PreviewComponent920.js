import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaRedo, FaEdit, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './PreviewComponent920.css';
import Sidebar991 from '../components/Sidebar991'; // Sidebar Component

const PreviewComponent920 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const modalName = location.state?.modalName || 'Default Modal';
  const previewData = location.state?.previewData || {}; // Fetched data from the parent component

  const [showDetails920, setShowDetails920] = useState(false);

  const toggleDetails920 = () => {
    setShowDetails920(!showDetails920);
  };

  const handleEditRedirect = () => {
    navigate('/dynamic-guides');
  };

  // Check if a question exists in the previewData
  const firstQuestion = previewData.questions && previewData.questions.length > 0 ? previewData.questions[0] : null;
  
  // If no question is available, get the first action to use as a fallback
  const firstAction = previewData.actions && previewData.actions.length > 0 ? previewData.actions[0] : null;

  return (
    <div className="layout-container">
      <div className="sidebar-container">
        <Sidebar991 />
      </div>
      <div className="content-container">
        <div className="preview-container-920">
          <header className="preview-header-920">
            <nav className="breadcrumb-920">Dynamic Guides &gt; {modalName}</nav>
            <h2>Current guide: {modalName}</h2>
            <div className="header-buttons-920">
              <button className="restart-button-920">
                <FaRedo /> Restart
              </button>
              <button className="edit-button-920" onClick={handleEditRedirect}>
                <FaEdit /> Edit
              </button>
            </div>
          </header>

          <div className="main-content-920">
            <div className="question-section-920">
              <h3>{firstQuestion ? firstQuestion.QuestionName : (firstAction ? firstAction.ActionName : 'Is any of the following circuit breaker tripped?')}</h3>

              <div className="options-container-920">
  {firstQuestion ? (
    // Display the action buttons based on the first question's actions if it exists
    firstQuestion.Actions?.map((action, index) => (
      <button
        key={index}
        className="option-button-920"
        onClick={() => alert(`Clicked: ${action.ActionName}`)}
      >
        {action.ActionName}
      </button>
    ))
  ) : (
    // Default buttons if no question is found or actions are not available
    <>
      <button
        className="option-button-920"
        onClick={() => alert('Clicked: Yes')}
      >
        Yes
      </button>
      <button
        className="option-button-920"
        onClick={() => alert('Clicked: No')}
      >
        No
      </button>
      <button
        className="option-button-920"
        onClick={() => alert('Clicked: I don’t know')}
      >
        I don’t know
      </button>
    </>
  )}
</div>


              {/* Dummy Data Section */}
              <div className="dummy-data-container">
                <p><strong>Dummy Data 1:</strong> Circuit breaker panel has no visible damage.</p>
                <p><strong>Dummy Data 2:</strong> All breakers are in the ON position.</p>
                <p><strong>Dummy Data 3:</strong> The breaker system was last inspected 6 months ago.</p>
              </div>
            </div>

            <div className="right-side-container-920">
              <div className="history-box-920">
                <h4>History</h4>
                <p>No steps performed.</p>
              </div>
              <div className="expert-level-box-920">
                <h4>Expert level 0</h4>
                <div className="slider-container-920">
                  <input type="range" min="0" max="10" defaultValue="0" className="slider-920" />
                </div>
              </div>
            </div>
          </div>

          <footer className={`footer-section-920 ${showDetails920 ? 'show-details' : ''}`}>
            {!showDetails920 && (
              <button className="details-button-920 show-details-btn" onClick={toggleDetails920}>
                <FaChevronUp /> Show details
              </button>
            )}
            {showDetails920 && (
              <div className="details-button-wrapper">
                <button className="details-button-920 hide-details-btn" onClick={toggleDetails920}>
                  <FaChevronDown /> Hide details
                </button>
              </div>
            )}
          </footer>

          {showDetails920 && (
            <div className="details-section-920">
              <div className="details-tables-920">
                {/* Causes Table */}
                <table className="details-table-920">
                  <thead>
                    <tr>
                      <th>Causes</th>
                      <th>P</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.causes?.map((cause, index) => (
                      <tr key={index}>
                        <td>
                          <a href="#" onClick={() => alert(`Clicked: ${cause.EventName}`)}>
                            {cause.EventName}
                          </a>
                        </td>
                        <td>{cause.MaxProbability !== undefined ? cause.MaxProbability : '--'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Actions Table */}
                <table className="details-table-920">
                  <thead>
                    <tr>
                      <th>Actions</th>
                      <th>P</th>
                      <th>C</th>
                      <th>P/C</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.actions?.map((action, index) => (
                      <tr key={index}>
                        <td>
                          <a href="#" onClick={() => alert(`Clicked: ${action.ActionName}`)}>
                            {action.ActionName}
                          </a>
                        </td>
                        <td>{action.MaxProbability}</td>
                        <td>{action.ActionCost}</td>
                        <td>
                          {action.MaxProbability && action.ActionCost
                            ? (action.MaxProbability / action.ActionCost).toFixed(2)
                            : '--'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Questions Table */}
                <table className="details-table-920">
                  <thead>
                    <tr>
                      <th>Questions</th>
                      <th>Level</th>
                      <th>C</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.questions?.map((question) => (
                      <tr key={question.QuestionID}>
                        <td>
                          <a href="#" onClick={() => alert(`Clicked: ${question.QuestionName}`)}>
                            {question.QuestionName}
                          </a>
                        </td>
                        <td>0</td>
                        <td>{question.QuestionCost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewComponent920;
