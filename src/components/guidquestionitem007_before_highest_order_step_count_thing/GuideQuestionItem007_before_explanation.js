import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaExclamationCircle } from "react-icons/fa"; // For the exclamation icons

const getFMRange = (modelName) => {
  if (!modelName) return '';
  const match = modelName.match(/FM(\d+)/i);
  if (!match) return '';
  const fmNumber = parseInt(match[1], 10);
  if (fmNumber >= 1 && fmNumber <= 50) return 'FM1-50';
  if (fmNumber >= 51 && fmNumber <= 100) return 'FM51-100';
  if (fmNumber >= 101 && fmNumber <= 150) return 'FM101-150';
  if (fmNumber >= 151 && fmNumber <= 200) return 'FM151-200';
  if (fmNumber >= 201 && fmNumber <= 250) return 'FM201-250';
  if (fmNumber >= 251 && fmNumber <= 300) return 'FM251-300';
  if (fmNumber >= 301 && fmNumber <= 350) return 'FM301-350';
  if (fmNumber >= 351 && fmNumber <= 400) return 'FM351-400';
  if (fmNumber >= 401 && fmNumber <= 450) return 'FM401-450';
  return '';
};

const GuideQuestionItem007 = () => {
  const location = useLocation();
  const { resumeData } = location.state || {};

  // Extract unique steps by order
  let uniqueSteps = [];
  let eventData = '';
  if (Array.isArray(resumeData) && resumeData.length > 0) {
    const stepMap = new Map();
    resumeData
      .sort((a, b) => Number(a.order) - Number(b.order))
      .forEach(item => {
        if (!stepMap.has(item.order)) {
          stepMap.set(item.order, item);
        }
      });
    uniqueSteps = Array.from(stepMap.values());
    eventData = resumeData[0].model_name || '';
  }

  // Get FM range and event name
  const fmRange = getFMRange(eventData);
  const eventName = eventData;

  // Get the step with the highest order, with special logic
  let highestOrderStep = null;
  if (uniqueSteps.length > 0) {
    // Sort steps by order descending
    const sortedSteps = [...uniqueSteps].sort((a, b) => Number(b.order) - Number(a.order));
    const topStep = sortedSteps[0];
    const secondStep = sortedSteps[1];
    if (
      topStep &&
      topStep.sequence_step_answer === "No" &&
      secondStep &&
      secondStep.sequence_step_answer === "I don't know"
    ) {
      highestOrderStep = secondStep;
    } else {
      highestOrderStep = topStep;
    }
  }

  return (
    <div className="container006">
      <div className="left-section006">
        {eventData && (
          <>
            <span className="event-name">
              <span className="event-part-black">{fmRange}</span>
              {" | "}
              <span className="event-part-orange">{eventName}</span>
            </span>
            {/* Question Box */}
            <div className="question-box006">
              {highestOrderStep && (
                <>
                  <h2>
                    <FaExclamationCircle size={20} color="blue" style={{ marginRight: '10px' }} />
                    {highestOrderStep.step_name}
                  </h2>
                  <p>Does this solve the problem?</p>
                  <div className="options-text006">
                    <button>1) Yes</button>
                    <button>2) No</button>
                    <button>3) I don't know</button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div className="right-section006">
        <div className="performed-steps-box006">
          <h3>Performed Steps</h3>
          {uniqueSteps.length > 0 ? (
            <ul style={{ background: "#f5f5f5", padding: "1em", borderRadius: "4px" }}>
              {uniqueSteps.map((step) => (
                <li key={step.order}>
                  <div className="performed-question-link">{step.step_name}</div>
                  <span className="performed-answer"> &nbsp; >> {step.sequence_step_answer}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No resume data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuideQuestionItem007;