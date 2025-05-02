import React, { useState } from 'react';
import Sidebar991 from '../components/Sidebar991';
import { FaEdit, FaPlay } from 'react-icons/fa';
import './Constraints921.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const ConstraintsPage921 = () => {
  const [firstStep921, setFirstStep921] = useState('No first step');
  const [useAllQuestions921, setUseAllQuestions921] = useState(false);
  const [postponedDropdown921, setPostponedDropdown921] = useState(25);

    const navigate = useNavigate();

  const handleFirstStepChange921 = (event) => {
    setFirstStep921(event.target.value);
  };

  const handleUseAllQuestionsChange921 = () => {
    setUseAllQuestions921((prev) => !prev);
  };

  const handlePostponedDropdownChange921 = (event) => {
    setPostponedDropdown921(event.target.value);
  };

  const handleEditGuideClick = () => {
    navigate('/dynamic-guides'); // Redirect to the dynamic-guides route
  };

const handlePreviewGuideClick = () => {
    navigate('/preview'); // Redirect to the dynamic-guides route
  };

  return (
    <div className="constraints-container921">
      <Sidebar991 />
      <div className="content-container921">
        <header className="header921">
          <div className="header-left921">
            <h1>Dynamic Guides &gt; FM283 Pitch_EmergencyRun</h1>
          </div>
          <div className="header-right921">
            <button className="edit-guide-btn921"onClick={handleEditGuideClick}>
              <FaEdit /> Edit Guide
            </button>
            <button className="preview-btn921"onClick={handlePreviewGuideClick}>
              <FaPlay /> Preview
            </button>
          </div>
        </header>
        <section className="section921">
          {/* First Step in Guide */}
          <div className="field921">
            <div className="field-header921 dark-header921">
              First step in guide
            </div>
            <div className="field-content921">
              <p>
                This step will always be presented as the first step in the
                troubleshooting sequence
              </p>
              <select
                value={firstStep921}
                onChange={handleFirstStepChange921}
              >
                <option value="No first step">No first step</option>
              </select>
            </div>
          </div>

          {/* Use All Questions First */}
          <div className="field921">
            <div className="field-header921 dark-header921">
              Use all questions first
            </div>
            <div className="field-content921">
              <p>
                This option will force the use of all questions in the guide
                before suggesting any actions
              </p>
              <input
                type="checkbox"
                checked={useAllQuestions921}
                onChange={handleUseAllQuestionsChange921}
              />
            </div>
          </div>

          {/* Postponed Steps */}
          <div className="postponed921">
            <div className="postponed-header921 dark-header921">
              Postponed steps
            </div>
            <div className="postponed-content921">
              <p>
                These steps will always be postponed until the steps configured
                to delay them have been performed
              </p>
              <div className="postponed-dropdown921">
  <select
    value={postponedDropdown921}
    onChange={handlePostponedDropdownChange921}
  >
    <option value={25}>25</option>
    <option value={50}>50</option>
    <option value={75}>75</option>
  </select>
  <span>0-0 of 0</span>
</div>

            </div>

 {/* Actions Table */}
<div className="postponed-table921">
  <table>
    <thead>
      <tr>
        <th>Actions</th>
        <th>Postponed until after</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colSpan="1">There is no data to display</td>
        <td>
          <div className="dropdown-actions921">
            <select
              value={postponedDropdown921}
              onChange={handlePostponedDropdownChange921}
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={75}>75</option>
            </select>
            <span>0-0 of 0</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

{/* Questions Table */}
<div className="postponed-table921">
  <table>
    <thead>
      <tr>
        <th>Questions</th>
        <th>Postponed until after</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colSpan="1">There is no data to display</td>
        <td>
          <div className="dropdown-questions921">
            <select
              value={postponedDropdown921}
              onChange={handlePostponedDropdownChange921}
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={75}>75</option>
            </select>
            <span>0-0 of 0</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

{/* Sub-guide Links Table */}
<div className="postponed-table921">
  <table>
    <thead>
      <tr>
        <th>Sub-guide links</th>
        <th>Postponed until after</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colSpan="1">There is no data to display</td>
      </tr>
    </tbody>
  </table>
</div>

<div className="postponed-table921">
  <table>
    <thead>
      <tr>
        <th colSpan={2}>Forced Steps</th>
        {/* <th>Postponed until after</th> */}
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colSpan="1">These steps will force a particular next step</td>
        <td>
          <div className="dropdown-questions921">
            <select
              value={postponedDropdown921}
              onChange={handlePostponedDropdownChange921}
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={75}>75</option>
            </select>
            <span>0-0 of 0</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div className="postponed-table921">
  <table>
    <thead>
      <tr>
        <th colSpan={1}>Actions</th>
        <th>Forces the following step</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colSpan="1">Check the condition of brushes and tracks of hub slip ring.</td>
        <td> Check the continuity of slip ring cable between slip ring terminals at nacelle side and in hub cabinet.</td>
        {/* <td> */}
        <div className='actions_921_below'>
          <div className="dropdown-questions921">
            <select
              value={postponedDropdown921}
              onChange={handlePostponedDropdownChange921}
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={75}>75</option>
            </select>
            <span>0-0 of 0</span>
          </div>
          </div>
        {/* </td> */}
      </tr>
    </tbody>
  </table>
</div>

<div className="postponed-table921">
  <table>
    <thead>
      <tr>
        <th colSpan={1}>Questions</th>
        <th>Forces the following step</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        {/* <td colSpan="1">Check the condition of brushes and tracks of hub slip ring.</td>
        <td> Check the continuity of slip ring cable between slip ring terminals at nacelle side and in hub cabinet.</td> */}
        {/* <td> */}
        <div className='actions_921_below'>
          <div className="dropdown-questions921">
            <select
              value={postponedDropdown921}
              onChange={handlePostponedDropdownChange921}
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={75}>75</option>
            </select>
            <span>0-0 of 0</span>
          </div>
          </div>
        {/* </td> */}
      </tr>
    </tbody>
  </table>
</div>

{/* Sub-guide Links Table */}
<div className="postponed-table921">
  <table>
    <thead>
      <tr>
        <th>Sub-guide links</th>
        <th>Postponed until after</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colSpan="1">There is no data to display</td>
      </tr>
    </tbody>
  </table>
</div>

<div className="postponed-table921">
  <table>
    <thead>
      <tr>
        <th colSpan={2}>Stop the guide</th>
        {/* <th>Postponed until after</th> */}
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colSpan="2">These steps will always stop the guide. For actions the guide stops regardless of the answer provided by the user. For questions the guide stops when the user selects the answer configured here.</td>
        <td>
          <div className="dropdown-questions921">
            <select
              value={postponedDropdown921}
              onChange={handlePostponedDropdownChange921}
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={75}>75</option>
            </select>
            <span>0-0 of 0</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>


 {/* Actions Table */}
 <div className="postponed-table921">
  <table>
    <thead>
      <tr>
        <th>Actions</th>
        <th>Postponed until after</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colSpan="1">There is no data to display</td>
        <td>
          <div className="dropdown-actions921">
            <select
              value={postponedDropdown921}
              onChange={handlePostponedDropdownChange921}
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={75}>75</option>
            </select>
            <span>0-0 of 0</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>


{/* Questions Table */}
<div className="postponed-table921">
  <table>
    <thead>
      <tr>
        <th>Questions</th>
        <th>Answer</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colSpan="1">There is no data to display</td>
      </tr>
    </tbody>
  </table>
</div>




          </div>
        </section>
      </div>
    </div>
  );
};

export default ConstraintsPage921;
